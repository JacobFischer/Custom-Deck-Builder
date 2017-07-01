"use strict";

import { initialize } from './initialize';
import { Card } from './card';
import * as Handlebars from 'handlebars';
import { onFontsLoaded } from './fonts';
import * as csvParse from 'csv-parse';
import { replaceAll } from './utils';
import { data as csvTest } from './data';

const vertDog = 'https://i.redd.it/1c0nxwtpgu4z.png';
const mercyHor = 'https://s-media-cache-ak0.pinimg.com/originals/5a/d2/3c/5ad23c7af1d008c68d875c41c294e5ca.jpg';
const oldLogo = 'https://i.imgur.com/UM1GVo9.png';

var onlyIndex = -1;//114;
var something = true;
const testingCard: any = something && {
    //name: '[REDACTED]',
    //textsize: 32,
};

function parse(csv: string): void {
    let parsed = csvParse(csv, {
        columns: true,
        ltrim: true,
        rtrim: true,
        skip_empty_lines: true,
        auto_parse: true,
    }, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        let baseCard = {};
        let baseOversizedCard = {};
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

            if (sanitized.name === '__defaults__' || sanitized.name === '__oversized_defaults__') {
                continue;
            }

            if (onlyIndex === -1 || i === onlyIndex) {
                if(testingCard) {
                    Object.assign(sanitized, testingCard);
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
                    sanitized.textsize,
                    sanitized.copyright,
                    sanitized.legal,
                    sanitized.subtype,
                    sanitized.set,
                    sanitized.settextcolor,
                    sanitized.setbackgroundcolor,
                    sanitized.alsobold,
                );

                document.getElementById('main').appendChild(card.toSVG());
            }
        }
    });
}

onFontsLoaded(() => {
    document.getElementById('submit').addEventListener('click', () => {
        const text = csvTest || document.getElementById('csv').innerText;

        parse(text);
    });

    parse(csvTest);
});
