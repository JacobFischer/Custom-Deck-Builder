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

export interface InitialTexture {
    key: string,
    url: string,
};

export function getInitialTextures() {
    function requireAll(r: __WebpackModuleApi.RequireContext): InitialTexture[] {
        let textures: InitialTexture[] = [];

        for (let key of r.keys()) {
            textures.push({
                key: basename(key, '.png'),
                url: <string>r(key), // requiring an image here, which will return a string
            });
        }

        return textures;
    }

    // require all the images in the templates folder
    return requireAll(require.context('../resources/card-templates/', true, /\.png$/));
}

export function initialize(callback: () => void): void {
    wrapper.callback = callback;

    PIXI.utils.skipHello();
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

    wrapper.pixiLoaded = true;
    checkIfInitialized();
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
