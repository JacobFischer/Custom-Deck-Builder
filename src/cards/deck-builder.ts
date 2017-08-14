import * as csvParse from "csv-parse";
import { EventEmitter } from "events";
import * as JSZip from "jszip";
import * as PIXI from "pixi.js";
import { initialTextures, initialTexturesToKey } from "src/initialize";
import { loadTextures, toCamelCase, tryToCast } from "src/utils/";
import { Card } from "./card";
import * as readmeText from "./deck-builder-readme.txt";

const MAX_TEXTURE_LENGTH = 4096; // in px

interface ICardImages {
    [key: string]: Blob;
}

/**
 * A class that, when given a csv file, will asynchronously transform it to a
 * deck of cards in a zip file. This is the meat of this application
 */
export class DeckBuilder extends EventEmitter {
        /** Symbols that will be emitted when certain events occur */
    public static EventSymbols = {
        /** Emitted when an error is encountered. This it not necessarily fatal */
        error: Symbol("error"),

        /** Emitted when the csv file has been fully parsed */
        parsed: Symbol("parsed"),

        /** Emitted when all the cards have finished rendering */
        doneRendering: Symbol("doneRendering"),

        /** Emitted when a new batch of cards starts being rendered */
        batchStart: Symbol("batchStart"),

        /** Emitted when the current batch of cards textures have been loaded */
        batchTexturesLoaded: Symbol("batchTexturesLoaded"),

        /** Emitted when the current batch has been rendered */
        batchComplete: Symbol("batchComplete"),

        /** Emitted when all the rendered cards have been zipped up */
        zipped: Symbol("zipped"),
    };

    /** The zip file generated once this is ran */
    private generatedZip: Blob;

    /** The csv source file used to generate the zip */
    private csvText: string;

    /**
     * Creates a new Deck Builder. Each instance can only be used once.
     * @param maxWidth: max width to set to
     * @param maxHeight max height to set to
     */
    constructor(
        /** The maximum width of cards to pack horizontally */
        readonly maxWidth: number = 10,

        /** The maximum height of cards to pack vertically */
        readonly maxHeight: number = 7,

        // NOTE: these numbers are defined by table top simulator.
        // a deck can be at most 4096px X 4096 consisting of 10 cards X 7 cards
    ) {
        super();
    }

    /**
     * Asynchronously parses, renders, and then zips cards into a deck of cards
     * @param csvText - comma separated value spreadsheet of cards
     * @returns {Promise<Blob>} a promise to return the Blog of that zip
     */
    public buildCards(csvText: string): Promise<Blob> {
        this.csvText = csvText;

        return new Promise<Blob>((resolve, reject) => {
            this.parse(csvText).then((cards) => {
                const oversizedCards = cards.filter((card) => card.oversized);
                const normalCards = cards.filter((card) => !card.oversized);

                this.emit(DeckBuilder.EventSymbols.parsed,
                    normalCards.length, oversizedCards.length);

                this.renderAllCards(
                    normalCards,
                    oversizedCards,
                    {},
                    1,
                    (cardImages: ICardImages) => {
                        this.emit(DeckBuilder.EventSymbols.doneRendering);
                        this.zipCards(cardImages).then(resolve);
                    },
                );
            }).catch(reject);
        });
    }

    /**
     * Parses the CSV file needed to build cards from
     * @param csv the csv file to parse
     * @returns a promise to return the parsed cards array
     */
    private parse(csv: string): Promise<Card[]> {
        return new Promise<Card[]>((resolve, reject) => {
            const csvOptions: csvParse.Options = {
                columns: true,
                ltrim: true,
                rtrim: true,
                skip_empty_lines: true,
                auto_parse: true,
            };

            csvParse(csv, csvOptions, (err: Error, data: any[]) => {
                if (err) {
                    return reject(new Error(`Could not parse CSV File: ${err.message}`));
                }

                const cards = this.parseCards(data);
                resolve(cards);
            });
        });
    }

    /**
     * Parses all the cards generated from the csv file
     * @param data results from the parsed csv file which makes up the cards
     * @returns the list of un-rendered cards created from the csv data
     */
    private parseCards(data: any[]): Card[] {
        const baseCard: object = {};
        const baseOversizedCard: object = {};
        const cards: Card[] = [];

        if (!data) {
            return;
        }

        for (const cardData of data) {
            let sanitized: any = {
                roundCorners: false,
            };

            for (let key of Object.keys(cardData)) {
                let value = cardData[key];
                key = toCamelCase(key);

                if (key.startsWith("#")) {
                    // skip this column
                    continue;
                }

                if (key === "vp" || key === "vps") {
                    // spell-checker:ignore victorypoints
                    key = "victorypoints";
                }

                if (key === "variant" && typeof(value) !== "boolean") {
                    value = Boolean(value);
                }

                if (key === "alsoBold" && value !== "") {
                    value = value.split(",");
                }

                if (value !== "") {
                    if (typeof(value) === "string") {
                        // try to cast it to a boolean or number
                        value = tryToCast(value);
                    }

                    sanitized[key] = value;
                }
            }

            if (sanitized.name === "__defaults__") {
                Object.assign(baseCard, sanitized);
            }
            else if (sanitized.name === "__oversized_defaults__") {
                Object.assign(baseOversizedCard, baseCard);
                Object.assign(baseOversizedCard, sanitized);
            }
            else {
                const base = sanitized.oversized
                    ? baseOversizedCard
                    : baseCard;

                sanitized = Object.assign({}, base, sanitized);
            }

            if (sanitized.name !== "__defaults__" && sanitized.name !== "__oversized_defaults__") {
                const card = new Card(sanitized);
                cards.push(card);
            }
        }

        return cards;
    }

    /**
     * Recursively renders all cards created from the csv
     * @param normalCards the array of normal cards needed to render
     * @param oversizedCards the array of oversized cards needed to render
     * @param cardImages the card images generated thus far
     * @param batch the current batch number we are working on
     * @param callback the callback to invoke once there are no cards to render
     */
    private renderAllCards(
        normalCards: Card[],
        oversizedCards: Card[],
        cardImages: ICardImages,
        batch: number,
        callback: (cardImages: ICardImages) => void,
    ): void {
        this.emit(DeckBuilder.EventSymbols.batchStart, batch);
        this.renderCards(normalCards, oversizedCards).then((app: PIXI.Application) => {
            if (!app) {
                callback(cardImages);
            }

            app.render();
            app.view.toBlob((blob: Blob) => {
                this.emit(DeckBuilder.EventSymbols.batchComplete, batch);
                cardImages[`card-${batch}.png`] = blob;

                // we are done with these images, destroy their textures from
                // memory. there is a slight chance cards will reuse images,
                // but it is way more memory efficient to dump it now than keep
                // it all in memory
                this.destroyPIXITextures(app.stage);

                for (const textureKey in PIXI.loader.resources) {
                    if (!initialTextures.hasOwnProperty(textureKey)) {
                        PIXI.loader.resources[textureKey].texture.destroy(true);
                        delete PIXI.loader.resources[textureKey];
                        delete PIXI.utils.TextureCache[textureKey];
                        delete PIXI.utils.BaseTextureCache[textureKey];
                    }
                }

                app.destroy(true);

                // now let's do the next batch
                if (normalCards.length || oversizedCards.length) {
                    batch++;
                    // async recursive implementation
                    this.renderAllCards(
                        normalCards,
                        oversizedCards,
                        cardImages,
                        batch,
                        callback,
                    );
                }
                else {
                    // all cards are rendered!
                    callback(cardImages);
                }
            });
        });
    }

    /**
     * Recursively destroys all the PIXI display objects, and their children
     * If their texture is not an initial texture, we tell pixi to remove it
     * from memory
     * @param obj - the object to destroy textures in
     */
    private destroyPIXITextures(obj: PIXI.DisplayObject): void {
        if (obj instanceof PIXI.Sprite) {
            if (!initialTexturesToKey.has(obj.texture)) {
                obj.destroy(true);
            }
        }

        if (obj instanceof PIXI.Container) {
            for (const child of obj.children) {
                this.destroyPIXITextures(child);
            }
        }
    }

    /**
     * Renders a set of cards. Chooses normal cards first
     * @param normalCards the array of normal cards that need to be rendered
     * @param oversizedCards the array of oversized cards that need to be
     *                       rendered
     * @returns a promise that returns the PIXI application used to render cards
     */
    private renderCards(normalCards: Card[], oversizedCards: Card[]): Promise<PIXI.Application> {
        return new Promise((resolve, reject) => {
            const cards = normalCards.length ? normalCards : oversizedCards;
            if (cards.length === 0) {
                resolve(null);
            }

            let maxWidth = this.maxWidth;
            let maxHeight = this.maxHeight;

            // find how many cards we can render in this batch
            let i = 0;
            const textures: Set<string> = new Set();
            const currentCards: Card[] = [];
            while (cards.length) {
                i++;
                const card = cards.shift();
                currentCards.push(card);

                textures.add(card.imageURL);
                textures.add(card.logoURL);

                if (i === (maxWidth * maxHeight)) {
                    break; // impossible to fit more cards
                }
            }

            loadTextures(Array.from(textures), () => {
                const unloadedTextures: string[] = [];
                for (const texture of textures) {
                    const resource = PIXI.loader.resources[texture];

                    if (!resource || resource.error) {
                        unloadedTextures.push(texture);
                    }
                }

                if (unloadedTextures.length) {
                    // some cards will not render correctly.
                    // We will keep trying, but let's notify anyone who cares
                    const errorTextures = unloadedTextures.join(", ");
                    this.emit(DeckBuilder.EventSymbols.error, `Could not load textures: ${errorTextures}`);
                }

                this.emit(DeckBuilder.EventSymbols.batchTexturesLoaded);

                const cardWidth = currentCards[0].pxWidth;
                const cardHeight = currentCards[0].pxHeight;

                const renders = currentCards.map((card) => card.renderSync());

                // Note: packing cards into a optimal rectangle is a variant of
                // the bin packing problem. optimal solutions exist, but I'll
                // just still with a greedy algorithm
                let width = 2;
                let height = 1;

                while ((width * height) < renders.length) {
                    if (width < maxWidth) {
                        width++;
                    }

                    if (height < maxHeight && (width * height) < renders.length) {
                        height++;
                    }
                }

                // once we get here, we know a decent width and height to use
                maxWidth = width;
                maxHeight = height;

                let resizedWidth = cardWidth;
                let resizedHeight = cardHeight;
                const ourAspectRatio = cardHeight / cardWidth;

                if ((resizedWidth * maxWidth) > (resizedHeight * maxHeight)) {
                    // width first, some of the height will be wasted
                    resizedWidth = Math.floor(MAX_TEXTURE_LENGTH / maxWidth);
                    resizedHeight = Math.round(resizedWidth * ourAspectRatio);
                }
                else {
                    // height first, some of the width will be wasted
                    resizedHeight = Math.floor(MAX_TEXTURE_LENGTH / maxHeight);
                    resizedWidth = Math.round(resizedHeight * (1 / ourAspectRatio));
                }

                if (resizedWidth > cardWidth) {
                    resizedWidth = cardWidth;
                    resizedHeight = cardHeight;
                }

                const app = new PIXI.Application(resizedWidth * maxWidth, resizedHeight * maxHeight, {antialias: true});
                const scale = resizedWidth / cardWidth;

                for (let r = 0; r < renders.length; r++) {
                    const x = r % maxWidth;
                    const y = Math.floor(r / maxWidth);
                    const render = renders[r];
                    render.cacheAsBitmap = true;

                    app.stage.addChild(render);

                    if (scale !== 1) {
                        render.scale.set(scale);
                    }

                    render.pivot.set(0, 0);
                    render.position.set(x * resizedWidth, y * resizedHeight);
                    app.stage.addChild(render);
                }

                resolve(app);
            });
        });
    }

    /**
     * Zips up a collection of blobs (textures of multiple cards) into a zip
     * file
     * @param cardImages dictionary of names to texture Blobs
     * @returns a promise that will resolve to a blog that is the cards zipped
     *          up with the csv file and a readme
     */
    private zipCards(cardImages: ICardImages): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const zip = new JSZip();
            for (const key of Object.keys(cardImages)) {
                zip.file(key, cardImages[key]);
            }

            zip.file("source-spreadsheet.csv", this.csvText);

            // add a readme explaining what all this is
            zip.file("readme.txt", (readmeText as any)
                                   .replace("{width}", this.maxWidth)
                                   .replace("{height}", this.maxHeight),
            );

            zip.generateAsync({type: "blob"}).then((content: Blob) => {
                this.generatedZip = content;
                this.emit(DeckBuilder.EventSymbols.zipped);
                resolve(this.generatedZip);
            });
        });
    }
}
