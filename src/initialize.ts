import { basename } from "path";
import * as PIXI from "pixi.js";
import { onFontsLoaded } from "src/styles/fonts";

const wrapper: any = {
    fontsLoaded: false,
    pixiLoaded: false,
    callback: false,
};

function checkIfInitialized(): void {
    if (wrapper.fontsLoaded && wrapper.pixiLoaded && wrapper.callback) {
        wrapper.callback();
    }
}

const textures: {[key: string]: string} = {};

function requireAll(r: __WebpackModuleApi.RequireContext): void {
    for (const key of r.keys()) {
        const textureName: string = basename(key, ".png");
        // requiring an image here, which will return a string
        const texturePath: string = r(key) as string;

        textures[textureName] = texturePath;
    }
}

// require all the images in the templates folder
requireAll(require.context("../resources/card-templates/", true, /\.png$/));

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

    for (const key of Object.keys(initialTextures)) {
        PIXI.loader.add(key, initialTextures[key]);
    }

    PIXI.loader.load(() => {
        wrapper.pixiLoaded = true;
        for (const key of Object.keys(initialTextures)) {
            initialTexturesToKey.set(PIXI.loader.resources[key].texture, key);
        }
        checkIfInitialized();
    });

    // require all the images in the templates folder
    requireAll(require.context("../resources/card-templates/", true, /\.png$/));
}

onFontsLoaded((error) => {
    if (error) {
        /* tslint:disable:no-console */
        console.error(error);
        /* tslint:enable:no-console */
    }
    else {
        wrapper.fontsLoaded = true;
        checkIfInitialized();
    }
});
