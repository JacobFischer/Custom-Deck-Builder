"use strict";

import * as Handlebars from 'handlebars';
import * as csvParse from 'csv-parse';
import { replaceAll, loadTextures } from './utils';
import { Card } from './card';
import * as PIXI from 'pixi.js';

const MAX_TEXTURE_LENGTH = 4096; // in px

function parseCards(data: any[]): Card[] {
    const baseCard: Object = {};
    const baseOversizedCard: Object = {};
    const cards: Card[] = [];

    if (!data) {
        return;
    }

    for (let i = 0; i < data.length; i++) {
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

            //document.getElementById('main').appendChild(card.toSVG());

            cards.push(card);

            let wanted = -2 + 2;
            if (wanted && i < wanted) {
                i = wanted - 1;
            }
            if (cards.length > 100 || i == wanted) {
                return cards;
            }
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
        const textures: Set<string> = new Set();
        for (const card of cards) {
            textures.add(card.imageURL);
            textures.add(card.logoURL);
        }

        const oversizedCards = cards.filter(card => card.oversized);
        const normalCards = cards.filter(card => !card.oversized);

        loadTextures(Array.from(textures), () => {
            renderCards(normalCards, oversizedCards);
        })
    }).catch(console.error);
};

function renderCards(normalCards: Card[], oversizedCards: Card[]): void {
    const maxWidth = 10;
    const maxHeight = 7;

    let cards = normalCards;
    if (normalCards.length === 0) {
        if (oversizedCards.length === 0) {
            return; // we are done
        }

        cards = oversizedCards;
    }

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

    let optimalAspectRatio = maxHeight/maxWidth;
    let ourAspectRatio = cardHeight/cardWidth;

    let resizedWidth = 1;
    let resizedHeight = 1;

    if (ourAspectRatio >= optimalAspectRatio) {
        // width first, some of the height will be wasted
        resizedWidth = Math.floor(MAX_TEXTURE_LENGTH / maxWidth);
        resizedHeight = Math.round(resizedWidth * ourAspectRatio);
    }
    else {
        // height first, some of the width will be wasted
        resizedHeight = Math.floor(MAX_TEXTURE_LENGTH / maxHeight);
        resizedWidth = Math.round(resizedHeight * (1/ourAspectRatio));
    }

    let app = new PIXI.Application(resizedWidth * maxWidth, resizedHeight * maxHeight, {antialias: true});
    document.body.appendChild(app.view);

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

        render.scale.set(scale);

        render.position.set(x * resizedWidth, y * resizedHeight);
        app.stage.addChild(render);
        console.log(`rendered ${x}, ${y} ${render.width} ${render.height}`);
    }
}
