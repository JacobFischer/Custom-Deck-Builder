"use strict";

import * as Handlebars from 'handlebars';
import * as csvParse from 'csv-parse';
import { replaceAll, loadTextures, outline, camelize, tryToCast } from './utils';
import { initialTextures, initialTexturesToKey } from './initialize';
import { Card } from './card';
import * as PIXI from 'pixi.js';
import * as JSZip from 'jszip';
const filesaver = require('file-saver');

const MAX_TEXTURE_LENGTH = 1024*4; // in px

interface CardImages {
    [key: string]: Blob
}

function parseCards(data: any[]): Card[] {
    const baseCard: Object = {};
    const baseOversizedCard: Object = {};
    const cards: Card[] = [];

    if (!data) {
        return;
    }

    for (let i = 0; i < data.length; i++) {
        if (i === 2) {
            //i = 187;
        }
        const cardData = data[i];
        let sanitized: any = {};

        for (let key in cardData) {
            let value = cardData[key];
            key = camelize(key);

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
};

function parse(csv: string): Promise<Card[]> {
    return new Promise<Card[]>((resolve, reject) => {
        let parsed = csvParse(csv, {
            columns: true,
            ltrim: true,
            rtrim: true,
            skip_empty_lines: true,
            auto_parse: true,
        }, (err: any, data: any[]) => {
            if (err) {
                console.error(err);
                return;
            }

            if (err) {
                reject(err);
            }

            let cards = parseCards(data);
            resolve(cards);
        });
    });
}

export function buildCards(csvText: string): void {
    let normalCards: Card[] = [];
    let oversizedCards: Card[] = [];

    parse(csvText).then(cards => {
        const oversizedCards = cards.filter(card => card.oversized);
        const normalCards = cards.filter(card => !card.oversized);
        //const app = new PIXI.Application(MAX_TEXTURE_LENGTH, MAX_TEXTURE_LENGTH, {antialias: true});
        //document.body.appendChild(app.view);
        //app.view.style.display = 'none';

        renderAllCards(normalCards, oversizedCards, {}, 1, (cardImages) => {
            console.log('gonna zip iy up');
            zipCards(cardImages);
        });
    }).catch(console.error);
};

function renderAllCards(normalCards: Card[], oversizedCards: Card[], cardImages: CardImages, batch: number, callback: (cardImages: CardImages) => void) {
    return new Promise((resolve, reject) => {
        console.log(`Rendering card batch ${batch}`);

        renderCards(normalCards, oversizedCards).then((app: PIXI.Application) => {
            if (!app) {
                console.log('waht');
                callback(cardImages);
            }

            app.render();
            app.view.toBlob((blob: Blob) => {
                cardImages[`card-${batch}.png`] = blob;

                // we are done with these images, destroy their textures from memory
                // there is a slight chance cards will reuse images, but it is way more memory efficient to dump it now than keep it all in memory
                destroyPIXITextures(app.stage);

                for (let textureKey in PIXI.loader.resources) {
                    if (!initialTextures.hasOwnProperty(textureKey)) {
                        console.log('destroying texture', textureKey);
                        PIXI.loader.resources[textureKey].texture.destroy(true);
                        delete PIXI.loader.resources[textureKey];
                        delete PIXI.utils.TextureCache[textureKey];
                        delete PIXI.utils.BaseTextureCache[textureKey];
                    }
                }

                app.destroy(true);

                console.log('rendered cards', normalCards.length, oversizedCards.length);

                if (normalCards.length || oversizedCards.length) {
                    setTimeout(() => {
                        renderAllCards(normalCards, oversizedCards, cardImages, batch + 1, callback);
                    }, 1000);
                }
                else {
                    console.log('hio');
                    callback(cardImages);
                }
            })
        });
    });
}

function destroyPIXITextures(obj: PIXI.DisplayObject): void {
    if (obj instanceof PIXI.Sprite) {
        if (!initialTexturesToKey.has(obj.texture)) {
            obj.destroy(true);
        }
    }

    if (obj instanceof PIXI.Container) {
        for (const child of obj.children) {
            destroyPIXITextures(child);
        }
    }
}

function renderCards(normalCards: Card[], oversizedCards: Card[]): Promise<PIXI.Application> {
    return new Promise((resolve, reject) => {
        let cards = normalCards.length ? normalCards : oversizedCards;
        if (cards.length === 0) {
            resolve(null);
        }

        let maxWidth = 7; // these numbers are defined by table top simulator.
        let maxHeight = 5; // a deck can be at most 4096px X 4096 consisting of 10 cards X 7 cards

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
                break;
            }
        }

        loadTextures(Array.from(textures), () => {
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
            //app.renderer.resize(resizedWidth * maxWidth, resizedHeight * maxHeight);

            const scale = resizedWidth/cardWidth;

            for (let i = 0; i < renders.length; i++) {
                const x = i % maxWidth;
                const y = Math.floor(i / maxWidth);
                let render = renders[i];
                render.cacheAsBitmap = true;

                app.stage.addChild(render);

                /*
                let brt = new PIXI.BaseRenderTexture(cardWidth, cardHeight, PIXI.SCALE_MODES.LINEAR, 1);
                let rt = new PIXI.RenderTexture(brt);

                let sprite = new PIXI.Sprite(rt);
                app.renderer.render(render, rt);
                app.stage.addChild(sprite);
                sprite.position.set(cardWidth, cardHeight);
                app.renderer.render(render, rt);
                */

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

function zipCards(cardImages: CardImages) {
    console.log('zipping cards');
    const zip = new JSZip();
    for (const key in cardImages) {
        if (Object.hasOwnProperty.call(cardImages, key)) {
            const blob = cardImages[key];

            zip.file(key, blob);
        }
    }

    zip.generateAsync({type: 'blob'}).then((content) => {
        filesaver.saveAs(content, 'cards.zip');
    });
}
