"use strict";

import * as csvParse from 'csv-parse';
import { replaceAll, loadTextures, outline, toCamelCase, tryToCast } from 'src/utils';
import { initialTextures, initialTexturesToKey } from 'src/initialize';
import { Card } from './card';
import { EventEmitter } from 'events';
import * as readmeText from './deck-builder-readme.txt';
import * as PIXI from 'pixi.js';
import * as JSZip from 'jszip';
import * as filesaver  from 'file-saver';

const MAX_TEXTURE_LENGTH = 4096; // in px

interface CardImages {
    [key: string]: Blob
}

export class DeckBuilder extends EventEmitter {
    private generatedZip: Blob;
    private csvText: string;

    static EventSymbols = {
        error: Symbol('error'),
        parsed: Symbol('parsed'),
        doneRendering: Symbol('doneRendering'),
        batchStart: Symbol('batchStart'),
        batchTexturesLoaded: Symbol('batchTexturesLoaded'),
        batchComplete: Symbol('batchComplete'),
        zipped: Symbol('zipped'),
    };

    constructor(
        readonly maxWidth: number = 10, // these numbers are defined by table top simulator.
        readonly maxHeight: number = 7, // a deck can be at most 4096px X 4096 consisting of 10 cards X 7 cards
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
            this.parse(csvText).then(cards => {
                const oversizedCards = cards.filter(card => card.oversized);
                const normalCards = cards.filter(card => !card.oversized);

                this.emit(DeckBuilder.EventSymbols.parsed, normalCards.length, oversizedCards.length);

                this.renderAllCards(normalCards, oversizedCards, {}, 1, (cardImages: CardImages) => {
                    this.emit(DeckBuilder.EventSymbols.doneRendering);
                    this.zipCards(cardImages).then(resolve);
                });
            }).catch(reject);
        });
    };

    private parse(csv: string): Promise<Card[]> {
        return new Promise<Card[]>((resolve, reject) => {
            let parsed = csvParse(csv, {
                columns: true,
                ltrim: true,
                rtrim: true,
                skip_empty_lines: true,
                auto_parse: true,
            }, (err: Error, data: any[]) => {
                if (err) {
                    reject(new Error(`Could not parse CSV File: ${err.message}`));
                }

                let cards = this.parseCards(data);
                resolve(cards);
            });
        });
    }

    private parseCards(data: any[]): Card[] {
        const baseCard: Object = {};
        const baseOversizedCard: Object = {};
        const cards: Card[] = [];

        if (!data) {
            return;
        }

        for (let i = 0; i < data.length; i++) {
            const cardData = data[i];
            let sanitized: any = {
                roundCorners: false,
            };

            for (let key in cardData) {
                let value = cardData[key];
                key = toCamelCase(key);

                if (key.startsWith('#')) {
                    // skip this column
                    continue;
                }

                if (key === 'vp' || key === 'vps') {
                    key = 'victorypoints';
                }

                if (key === 'variant' && typeof(value) !== 'boolean') {
                    value = Boolean(value);
                }

                if (key === 'alsoBold' && value !== '') {
                    value = value.split(',');
                }

                if (value !== '') {
                    if (typeof(value) === 'string') {
                        // try to cast it to a boolean or number
                        value = tryToCast(value);
                    }

                    sanitized[key] = value;
                }
            }

            if (sanitized.name === '__defaults__') {
                Object.assign(baseCard, sanitized);
            }
            else if (sanitized.name === '__oversized_defaults__') {
                Object.assign(baseOversizedCard, baseCard);
                Object.assign(baseOversizedCard, sanitized);
            }
            else {
                sanitized = Object.assign({}, sanitized.oversized ? baseOversizedCard :  baseCard, sanitized);
            }

            if (sanitized.name !== '__defaults__' && sanitized.name !== '__oversized_defaults__') {
                const card = new Card(sanitized);
                cards.push(card);
            }
        }

        return cards;
    }

    private renderAllCards(normalCards: Card[], oversizedCards: Card[], cardImages: CardImages, batch: number, callback: (cardImages: CardImages) => void) {
        return new Promise((resolve, reject) => {
            this.emit(DeckBuilder.EventSymbols.batchStart, batch);
            this.renderCards(normalCards, oversizedCards).then((app: PIXI.Application) => {
                if (!app) {
                    callback(cardImages);
                }

                app.render();
                app.view.toBlob((blob: Blob) => {
                    this.emit(DeckBuilder.EventSymbols.batchComplete, batch);
                    cardImages[`card-${batch}.png`] = blob;

                    // we are done with these images, destroy their textures from memory
                    // there is a slight chance cards will reuse images, but it is way more memory efficient to dump it now than keep it all in memory
                    this.destroyPIXITextures(app.stage);

                    for (let textureKey in PIXI.loader.resources) {
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
                        this.renderAllCards(normalCards, oversizedCards, cardImages, batch, callback);
                    }
                    else {
                        callback(cardImages);
                    }
                })
            });
        });
    }

    /**
     * Recursively destroys all the PIXI display objects, and their children
     * If their texture is not an initial texture, we tell pixi to remove it
     * from memory
     *
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

    private renderCards(normalCards: Card[], oversizedCards: Card[]): Promise<PIXI.Application> {
        return new Promise((resolve, reject) => {
            let cards = normalCards.length ? normalCards : oversizedCards;
            if (cards.length === 0) {
                resolve(null);
            }

            let maxWidth = this.maxWidth;
            let maxHeight = this.maxHeight;

            // find how many cards we can render in this batch
            let i = 0;
            const textures: Set<string> = new Set();
            let currentCards: Card[] = [];
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
                let unloadedTextures: string[] = [];
                for (const texture of textures) {
                    const resource = PIXI.loader.resources[texture];

                    if (!resource || resource.error) {
                        unloadedTextures.push(texture);
                    }
                }

                if (unloadedTextures.length) {
                    // some cards will not render correctly. We will keep trying put let's notify anyone who cares
                    this.emit(DeckBuilder.EventSymbols.error, `Could not load textures: ${unloadedTextures.join(', ')}`);
                }

                this.emit(DeckBuilder.EventSymbols.batchTexturesLoaded);

                const cardWidth = currentCards[0].pxWidth;
                const cardHeight = currentCards[0].pxHeight;

                const renders: PIXI.Container[] = currentCards.map(card => card.renderSync());

                // Note: packing cards into a optimal rectangle is a variant of the bin packing problem
                // optimal solutions exist, but I'll just still with a greedy algorithm
                let width = 2;
                let height = 1;

                while((width * height) < renders.length) {
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
                let ourAspectRatio = cardHeight/cardWidth;

                if ((resizedWidth*maxWidth) > (resizedHeight*maxHeight)) {
                    // width first, some of the height will be wasted
                    resizedWidth = Math.floor(MAX_TEXTURE_LENGTH / maxWidth);
                    resizedHeight = Math.round(resizedWidth * ourAspectRatio);
                }
                else {
                    // height first, some of the width will be wasted
                    resizedHeight = Math.floor(MAX_TEXTURE_LENGTH / maxHeight);
                    resizedWidth = Math.round(resizedHeight * (1/ourAspectRatio));
                }

                if (resizedWidth > cardWidth) {
                    resizedWidth = cardWidth;
                    resizedHeight = cardHeight;
                }

                const app = new PIXI.Application(resizedWidth * maxWidth, resizedHeight * maxHeight, {antialias: true});
                const scale = resizedWidth/cardWidth;

                for (let i = 0; i < renders.length; i++) {
                    const x = i % maxWidth;
                    const y = Math.floor(i / maxWidth);
                    let render = renders[i];
                    render.cacheAsBitmap = true;

                    app.stage.addChild(render);

                    if (scale !== 1) {
                        render.scale.set(scale);
                    }

                    render.pivot.set(0, 0);
                    render.position.set(x * resizedWidth,  y * resizedHeight);
                    app.stage.addChild(render);
                }

                resolve(app);
            });
        });
    }

    /**
     * Zips up a collection of blobs (textures of multiple cards) into a zip file
     *
     * @param cardImages - dictionary of names to texture Blobs
     */
    private zipCards(cardImages: CardImages): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const zip = new JSZip();
            for (const key of Object.keys(cardImages)) {
                zip.file(key, cardImages[key]);
            }

            zip.file('source-spreadsheet.csv', this.csvText);

            // add a readme explaining what all this is
            zip.file('readme.txt', readmeText
                .replace('{width}', this.maxWidth)
                .replace('{height}', this.maxHeight)
            );

            zip.generateAsync({type: 'blob'}).then((content: Blob) => {
                this.generatedZip = content;
                this.emit(DeckBuilder.EventSymbols.zipped);
                resolve(this.generatedZip);
            });
        });
    }
}
