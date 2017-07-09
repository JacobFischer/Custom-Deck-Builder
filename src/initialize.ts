"use strict";

import { onFontsLoaded } from './fonts';
import { basename } from 'path';
import * as PIXI from 'pixi.js';

const wrapper: any = {
    fontsLoaded: false,
    pixiLoaded: false,
    callback: false,
};

function checkIfInitialized(): void {
    if (wrapper.fontsLoaded && wrapper.pixiLoaded && wrapper.callback) {
        wrapper.callback();
    }
};

export function initialize(callback: () => void): void {
    wrapper.callback = callback;

    PIXI.utils.skipHello();
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

    function requireAll(r: __WebpackModuleApi.RequireContext) {
        for (let key of r.keys()) {
            let textureName: string = basename(key, '.png');
            let texturePath: string = <string>r(key); // requiring an image here, which will return a string

            PIXI.loader.add(textureName, texturePath);
        }

        PIXI.loader.load(() => {
            wrapper.pixiLoaded = true;
            checkIfInitialized();
        });
    }

    // require all the images in the templates folder
    requireAll(require.context('../resources/card-templates/', true, /\.png$/));
};

onFontsLoaded((error) => {
    if (error) {
        console.error(error);
    }
    else {
        wrapper.fontsLoaded = true;
        checkIfInitialized();
    }
});
