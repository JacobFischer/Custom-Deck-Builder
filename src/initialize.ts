"use strict";

import { onFontsLoaded } from 'src/styles/fonts';
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

const textures: {[key: string]: string} = {};

function requireAll(r: __WebpackModuleApi.RequireContext) {
    for (let key of r.keys()) {
        let textureName: string = basename(key, '.png');
        let texturePath: string = <string>r(key); // requiring an image here, which will return a string

        textures[textureName] = texturePath;
    }
}
// require all the images in the templates folder
requireAll(require.context('../resources/card-templates/', true, /\.png$/));

/** The key/value mapping of initial textures loaded for all cards */
export const initialTextures = textures;

/** A reverse key/value mapping of texture to key for initialTextures */
export const initialTexturesToKey = new Map<PIXI.Texture, string>();

/**
 * Initializes textures and fonts required for this application to function
 *
 * @param callback the callback to invoke once all resources are initialized
 */
export function initialize(callback: () => void): void {
    wrapper.callback = callback;

    PIXI.utils.skipHello();
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

    for (let key in initialTextures) {
        PIXI.loader.add(key, initialTextures[key]);
    }

    PIXI.loader.load(() => {
        wrapper.pixiLoaded = true;
        for (let key in initialTextures) {
            initialTexturesToKey.set(PIXI.loader.resources[key].texture, key);
        }
        checkIfInitialized();
    });

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
