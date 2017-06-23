"use strict";

import { initialize } from './initialize';
import { Card } from './card';
import * as Handlebars from 'handlebars';

const vertDog = 'https://i.redd.it/1c0nxwtpgu4z.png';
const mercyHor = 'https://s-media-cache-ak0.pinimg.com/originals/5a/d2/3c/5ad23c7af1d008c68d875c41c294e5ca.jpg';
const oldLogo = 'https://i.imgur.com/UM1GVo9.png';
const card = new Card(
    'Angela Ziegler',
    'Hero',
    false,
    '',
    2,
    7,
    '<b>+2 Power</b>\n\n<b>Defense:</b> You may discard this card to avoid an <b>Attack</b>. If you do, draw two cards and you may put an <b>Ongoing</b> card from your discard pile into play.',
    mercyHor,
    'https://i.imgur.com/ovWF3PC.png',
    38,
    '2017 CZE',
    'All Overwatch characters and\nelements © and ™ Blizzard.\n(s01)',
    'Mercy',
);

document.getElementById('main').appendChild(card.toSVG());

//initialize((app) => {
    /*
    // create a new Sprite from an image path
    const bunny = new PIXI.Sprite(PIXI.loader.resources['starter'].texture);
    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    app.stage.addChild(bunny);

    // Listen for animate update
    app.ticker.add((delta) => {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent transformation
        bunny.rotation += 0.1 * delta;
    });
    */
//});
