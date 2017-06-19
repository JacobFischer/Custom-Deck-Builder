"use strict";

import { initialize } from './initialize';
import { Card } from './card';

initialize((app) => {
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

    const card = new Card('Batman', 'Hero', '', 3, 9, '+2 Power for each Equipment you Control.');

    card.draw(app);
});
