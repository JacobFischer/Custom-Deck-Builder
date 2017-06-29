import './fonts.scss';
import * as FontFaceObserver from 'fontfaceobserver';

const fonts: {[key: string]: Array<string>} = {
    CompactaBT: ['regular', 'bold', 'italics'],
    CompactaBdBT: ['regular', 'bold'],
    TradeGothic: ['regular', 'bold', 'italics'],
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
        _onReady.callback(true);
    }
}

for (const fontFamily of Object.keys(fonts)) {
    const font = fonts[fontFamily];
    for (const fontType of font) {
        _ready[fontFamily + fontType] = false;

        let properties: Object = undefined;
        if (fontType !== 'regular') {
            properties = fontType === 'bold' ?
                {weight: 'bold'} :
                {style: 'italic'};
        }

        let fontFaceObserver = new FontFaceObserver(fontFamily, properties).load().then((...args: Array<any>) => {
            _ready[fontFamily + fontType] = true;
            checkIfReady();
        }, (...args: Array<any>) => {
            console.error(`${fontFamily} ${fontType} could not be loaded`, args);
            _onReady.callback(false);
        });
    }
}

export function onFontsLoaded(callback: (error: boolean) => void): void {
    _onReady.callback = callback;
    checkIfReady();
}
