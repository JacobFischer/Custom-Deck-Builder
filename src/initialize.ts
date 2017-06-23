"use strict";

import { basename } from 'path';
import * as PIXI from 'pixi.js';
import * as FontFaceObserver from 'fontfaceobserver';

const app = new PIXI.Application(800, 1100, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

export function initialize(callback: (app: PIXI.Application) => void): void {
    function requireAll(r: __WebpackModuleApi.RequireContext) {
        for(let key of r.keys()) {
            let textureName: string = basename(key, '.png');
            let texturePath: string = <string>r(key); // requiring an image here, which will return a string

            PIXI.loader.add(textureName, texturePath);
        }
        
        PIXI.loader.load(() => {
            // now load the fonts we will need
            const font = new FontFaceObserver('CompactaBT', {
                style: 'italic',
            })

            font.load().then(() => {
                // all images and fonts should be ready
                callback(app);
            }, () => {
                console.error('could not load font');
            });
        });
    }

    // require all the images in the templates folder
    requireAll(require.context('../resources/card-templates/', true, /\.png$/));
}