/** Acts as an interface between css fonts and code that requires it */

import * as FontFaceObserver from "fontfaceobserver";
import "./fonts.scss";

const fonts: {[key: string]: string[]} = {
    CompactaBT: ["regular", "bold", "italics"],
    CompactaBdBT: ["regular", "bold"],
    TradeGothic: ["regular", "bold", "italics"],
};

const _ready: {[key: string]: boolean} = {};
const _onReady: any = {
    callback: null,
};

function checkIfReady(): void {
    let ready = true;
    for (const key of Object.keys(_ready)) {
        if (!_ready[key]) {
            ready = false;
            break;
        }
    }

    if (ready && _onReady.callback) {
        _onReady.callback();
    }
}

// for every font, load it then check if we are ready
// once the last font is loaded, we are ready
for (const fontFamily of Object.keys(fonts)) {
    const font = fonts[fontFamily];
    for (const fontType of font) {
        _ready[fontFamily + fontType] = false;

        let properties: Object;
        if (fontType !== "regular") {
            properties = fontType === "bold" ?
                {weight: "bold"} :
                {style: "italic"};
        }

        const fontFaceObserver = new FontFaceObserver(fontFamily, properties).load().then((...args: any[]) => {
            _ready[fontFamily + fontType] = true;
            checkIfReady();
        }, (...args: any[]) => {
            const message = `${fontFamily} ${fontType} could not be loaded`;
            console.error(message, args);
            _onReady.callback(new Error(message));
        });
    }
}

/**
 * Attaches a callback to be invoked once all fonts are loaded
 * @param callback the callback to invoke once all fonts are loaded
 */
export function onFontsLoaded(callback: (error: boolean) => void): void {
    _onReady.callback = callback;
    checkIfReady();
}
