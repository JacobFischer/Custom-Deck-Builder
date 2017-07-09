"use strict";

import * as Handlebars from 'handlebars';
import * as csvParse from 'csv-parse';
import { replaceAll, loadTextures, outline } from './utils';
import { getInitialTextures, InitialTexture } from './initialize';
import { Card } from './card';
import * as PIXI from 'pixi.js';

const MAX_TEXTURE_LENGTH = 1024*4; // in px

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
            key = replaceAll(key.toLowerCase(), ' ', '');

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

            if (key === 'alsobold' && value !== '') {
                value = value.split(',');
            }

            if (value !== '') {
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
            if (!sanitized.oversized) {
                //continue;
            }
            const card = new Card(
                sanitized.name,
                sanitized.type,
                sanitized.variant,
                sanitized.oversized,
                sanitized.typeprefix,
                sanitized.victorypoints,
                sanitized.cost,
                sanitized.text,
                sanitized.imageurl,
                sanitized.logourl,
                Number(sanitized.logoscale),
                sanitized.textsize,
                sanitized.copyright,
                sanitized.legal,
                sanitized.subtype,
                sanitized.set,
                sanitized.settextcolor,
                sanitized.setbackgroundcolor,
                sanitized.alsobold,
            );

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

        let initalTextures = getInitialTextures();

        renderAllCards(normalCards, oversizedCards, initalTextures);
    }).catch(console.error);
};

function renderAllCards(normalCards: Card[], oversizedCards: Card[], textures: InitialTexture[]): void {
    PIXI.loader.reset();

    // now create a new app, we'll need to reload a few textures, but otherwise all memory should be cleared
    for (const texture of textures) {
        PIXI.loader.add(texture);
    }

    renderCards(normalCards, oversizedCards).then((app: PIXI.Application) => {
        if (!app) {
            return; // done
        }

        app.render();

        let img = document.createElement('img');
        img.src = app.view.toDataURL();
        document.body.appendChild(img);

        app.destroy(true);

        console.log('rendered cards', normalCards.length, oversizedCards.length);

        if (normalCards.length || oversizedCards.length) {
            setTimeout(() => {
                renderAllCards(normalCards, oversizedCards, textures);
            }, 1000);
        }
    });
}

function renderCards(normalCards: Card[], oversizedCards: Card[]): Promise<PIXI.Application> {
    return new Promise((resolve, reject) => {
        let cards = normalCards.length ? normalCards : oversizedCards;
        if (cards.length === 0) {
            resolve(null);
        }

        const textures: Set<string> = new Set();
        for (const card of cards) {
            textures.add(card.imageURL);
            textures.add(card.logoURL);
        }

        loadTextures(Array.from(textures), () => {
            let maxWidth = 10; // these numbers are defined by table top simulator.
            let maxHeight = 7; // a deck can be at most 4096px X 4096 consisting of 10 cards X 7 cards

            const cardWidth = cards[0].pxWidth;
            const cardHeight = cards[0].pxHeight;

            const renders: PIXI.Container[] = [];
            let i = 0;
            while (cards.length) {
                i++;
                const card = cards.shift();
                renders.push(card.renderSync());

                if (i === (maxWidth * maxHeight)) {
                    break;
                }
            }

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

            console.log('w x h', maxWidth, maxHeight, renders.length);

            console.log('we want', resizedWidth * maxWidth, resizedHeight * maxHeight);
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
