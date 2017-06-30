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

/**
 * 
 * @param wrapper the
 */
export function wrapText(textElement: SVGTextElement, text: string, height: number, xStart: number=0, newParagraphHeight?: number): void {
    const width = Number(textElement.getAttribute('width'));
    newParagraphHeight = Number(newParagraphHeight) || height*2;

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
            tspan.setAttribute('x', String(xStart));
            tspan.setAttribute('dy', String(dy));
            textElement.appendChild(tspan);
        }

        // check to start/end the bolding/italics
        let  word = words[i];
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
            dy = height;
        }
        else if (word === NEW_PARAGRAPH) {
            dy = newParagraphHeight;
        }
        else { // it's a normal word
            line.push(word);
            tspan.innerHTML = line.join(' ');

            currentWidth = tspan.getBBox().width;

            newline = currentWidth >= width;
            if (newline) { // it can't fit
                dy = height;

                // redo this word in the loop
                line.pop();
                i--;
            }
        }

        if (newline) {
            if (bolding || italics) {
                // stop bolding or italics
                line[line.length - 1] = line[line.length - 1] + END_TAG;
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

    for (const tspan of tspans) {
        textElement.appendChild(tspan);
    }
};

export function roundedRectangle(path: SVGPathElement, text: SVGTextElement, rounding: number = 5): void {
    const b = text.getBBox();
    const r = rounding;
    path.setAttribute('d', `M${b.x},${b.y*0.75 - 2} h${b.width} a${r},${r} 0 0 1 ${r},${r} v${b.height-18} a${r},${r} 0 0 1 -${r},${r} h-${b.width} a${r},${r} 0 0 1 -${r},-${r} v-${b.height-18} a${r},${r} 0 0 1 ${r},-${r} z`);
}
