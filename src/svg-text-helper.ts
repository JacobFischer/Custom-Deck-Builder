import { replaceAll } from './utils';

const LINE_BREAK = '[br/]}';
const NEW_PARAGRAPH = '[p/]';

const BOLD_START = `[b]`;
const BOLD_END = `[/b]`;

const ITALIC_START = `[i]`;
const ITALIC_END = `[/i]`;

const BOLD_TAG = '<tspan style="font-weight: bold;">';
const ITALIC_TAG = '<tspan style="font-style: italic;">';
const END_TAG = '</tspan>';

function doBoundingBoxesOverlap(r1: SVGRect, r2: SVGRect): boolean {
    return !(
        r2.x > (r1.x + r1.width) || 
        (r2.x + r2.width) < r1.x || 
        r2.y > (r1.y + r1.height) ||
        (r2.y + r2.height) < r1.y
    );
}

export interface WrapTextOptions {
    textSize?: number,
    lineHeight?: number,
    newParagraphHeight?: number,
    center?: boolean,
    middle?: boolean,
    resize?: boolean,
    onResize?: (options: WrapTextOptions) => void,
    resizeStep?: number,
    collisions?: SVGRect[],
};

export function wrapSVGText(textElement: SVGTextElement, text: string, options?: WrapTextOptions): boolean {
    options = options || {};

    options = Object.assign(<WrapTextOptions>{
        textSize: 16,
        lineHeight: 20,
        newParagraphHeight: (options.lineHeight * 2) || 32,
        center: false,
        middle: false,
        onResize: null,
        resizeStep: 1,
        collisions: [],
    }, options);

    let resizing = true;
    while (resizing) {
        if (options.onResize) {
            options.onResize(options);
        }

        // now wrap the text
        const tspans = wrapText(textElement, text, options);
        tspans.forEach((tspan) => textElement.appendChild(tspan));
        const textElementBox = textElement.getBBox()

        resizing = false; // assume it fits

        const oldY = middleAlign(textElement, options);

        if (options.resize) {
            // we need to check to see if we need to resize the text
            if (options.collisions.length) {
                // we need to check for collisions
                textElement.innerHTML = '';

                let rollingDY = 0;
                for (const tspan of tspans) {
                    textElement.appendChild(tspan);
                    const oldDY = Number(tspan.getAttribute('dy'));
                    tspan.setAttribute('dy', String(oldDY + rollingDY));
                    rollingDY += oldDY;

                    const tspanBox = tspan.getBBox();

                    for (const collide of options.collisions) {
                        if (doBoundingBoxesOverlap(tspanBox, collide)) {
                            resizing = true;
                            break;
                        }
                    }

                    tspan.setAttribute('dy', String(oldDY));
                    textElement.innerHTML = '';
                }
            }

            if (textElementBox.height > Number(textElement.getAttribute('height'))) {
                resizing = true;
            }

            if (resizing) {
                options.textSize = options.textSize - options.resizeStep;
                if (options.textSize <= 0) {
                    return false; // couldn't fit the text
                }
            }
        }

        if (resizing && oldY !== undefined) {
            textElement.innerHTML = '';
            textElement.setAttribute('y', String(oldY));
        }
        else {
            // not resizing, yay!
            tspans.forEach((tspan, i) => {
                textElement.appendChild(tspan);
            });
        }
    }

    return true;
};

function middleAlign(textElement: SVGTextElement, options: WrapTextOptions): undefined | Number {
    if (options.middle) {
        // then horizontally center it
        const MAX_HEIGHT = Number(textElement.getAttribute('height'));
        const height = textElement.getBBox().height;

        const oldY = Number(textElement.getAttribute('y'));
        const newY = options.textSize + oldY + (MAX_HEIGHT - height)/2;

        textElement.setAttribute('y', String(newY));

        return oldY;
    }
};

/**
 * 
 * @param wrapper the
 */
function wrapText(textElement: SVGTextElement, text: string, options: WrapTextOptions): SVGTSpanElement[] {
    textElement.innerHTML = ''; // empty the text element, we will be filling it in with wrapped text
    textElement.setAttribute('style', `font-size: ${options.textSize}px;`)

    const MAX_WIDTH = Number(textElement.getAttribute('width'));
    const X_START = Number(textElement.getAttribute('x'));

    text = text.trim(); // remove whitespace on the ends to be nice
    text = replaceAll(text, '\n\n', ` ${NEW_PARAGRAPH} `);
    text = replaceAll(text, '\n', ` ${LINE_BREAK} `);
    text = replaceAll(text, '\r', ''); // remove all carrier returns

    const words = text.split(' ');
    let tspan: SVGTSpanElement;
    let tspans: SVGTSpanElement[] = [];
    let line: string[] = [];
    let dy = 0;
    let bolding = false;
    let italics = false;
    for (let i = 0; i < words.length; i++) {
        if (!tspan) {
            tspan = document.createElementNS("http://www.w3.org/2000/svg", 'tspan');
            tspan.setAttribute('x', String(X_START));
            tspan.setAttribute('dy', String(dy));
            tspan.setAttribute('class', `wrapped-text-${tspans.length}`);
            textElement.appendChild(tspan);
        }

        // check to start/end the bolding/italics
        let word = words[i];

        let wasBolding = bolding;
        let wasItalics = italics;
        if (word.indexOf(BOLD_START) !== -1) {
            word = replaceAll(word, BOLD_START, BOLD_TAG);
            bolding = true;
        }

        if (word.indexOf(ITALIC_START) !== -1) {
            word = replaceAll(word, ITALIC_START, ITALIC_TAG);
            italics = true;
        }
        
        if (word.indexOf(BOLD_END) !== -1) {
            word = replaceAll(word, BOLD_END, END_TAG);
            bolding = false;
        }

        if (word.indexOf(ITALIC_END) !== -1) {
            word = replaceAll(word, ITALIC_END, END_TAG);
            italics = false;
        }

        // assume we now want a new line
        let currentWidth = Infinity;
        let newline = true;

        if (word === LINE_BREAK) {
            dy = options.lineHeight;
        }
        else if (word === NEW_PARAGRAPH) {
            dy = options.newParagraphHeight;
        }
        else { // it's a normal word
            line.push(word);
            tspan.innerHTML = line.join(' ');

            currentWidth = tspan.getBBox().width;

            newline = currentWidth >= MAX_WIDTH;
            if (newline) { // it can't fit
                dy = options.lineHeight;

                // redo this word in the loop
                line.pop();
                i--;
            }
        }

        if (newline) {
            if (bolding || italics || wasBolding || wasItalics) {
                // stop bolding or italics on this line
                line[line.length - 1] = line[line.length - 1] + END_TAG;

                if ((word.indexOf(BOLD_TAG) === -1 && word.indexOf(ITALIC_TAG) === -1) || wasBolding || wasItalics)  {
                    words[i + 1] = ((bolding || wasBolding) ? BOLD_START : ITALIC_START) + words[i + 1];
                }

                // and resume on the next
                bolding = false;
                italics = false;
            }

            tspan.innerHTML = line.join(' ');
            line.length = 0;

            tspans.push(tspan);
            tspan.remove();
            tspan = null;
        }
    }

    if (tspan) {
        tspan.remove();
        tspans.push(tspan);
    }

    if (options.center) {
        for (const tspan of tspans) {
            // append it so bounding box dimensions are correct and not 0
            textElement.appendChild(tspan);

            let oldX = X_START;
            let width = tspan.getBBox().width;

            const newX = oldX + (MAX_WIDTH - width)/2;

            tspan.setAttribute('x', String(newX));

            // now remove it so other dimensions don't scale it neighbors
            textElement.removeChild(tspan);
        }
    }

    return tspans;
};

export function roundedRectangle(path: SVGPathElement, text: SVGTextElement, rounding: number = 5): void {
    const b = text.getBBox();
    const r = rounding;
    path.setAttribute('d', `M${b.x},${b.y*0.75 - 2} h${b.width} a${r},${r} 0 0 1 ${r},${r} v${b.height-18} a${r},${r} 0 0 1 -${r},${r} h-${b.width} a${r},${r} 0 0 1 -${r},-${r} v-${b.height-18} a${r},${r} 0 0 1 ${r},-${r} z`);
};
