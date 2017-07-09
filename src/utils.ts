export function escapeRegExp(str: string) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function replaceAll(target: string, search: string, replacement: string): string {
    return target.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
    //return target.split(search).join(replacement);
};

export function clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(max, val))
}

export function doRectanglesOverlap(r1: PIXI.Rectangle, r2: PIXI.Rectangle): boolean {
    return !(
        r2.x > (r1.x + r1.width) ||
        (r2.x + r2.width) < r1.x ||
        r2.y > (r1.y + r1.height) ||
        (r2.y + r2.height) < r1.y
    );
}

export function doesCircleOverlapRectangle(rect: PIXI.Rectangle, circle: PIXI.Circle) {
    const distX = Math.abs(circle.x - rect.x - rect.width/2);
    const distY = Math.abs(circle.y - rect.y - rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; }
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    const does = ((dx*dx + dy*dy) <= (circle.radius * circle.radius));

    return does;
}

export function xdoesCircleOverlapRectangle(rectangle: PIXI.Rectangle, circle: PIXI.Circle) {
    // Find the closest point to the circle within the rectangle
    // Assumes axis alignment! ie rect must not be rotated
    const closestX = clamp(circle.x, rectangle.x, rectangle.x + rectangle.width);
    const closestY = clamp(circle.y, rectangle.y, rectangle.y + rectangle.height);

    // Calculate the distance between the circle's center and this closest point
    const distanceX = circle.x - closestX;
    const distanceY = circle.x - closestY;

    // If the distance is less than the circle's radius, an intersection occurs
    const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    const does = distanceSquared < (circle.radius * circle.radius);
    return does;
}


interface match {
    start: number,
    end: number,
    str: string,
}

export function surroundText(search: string, regex: RegExp, front: string, end: string): string {
    let matches: match[] = [];
    while (true) {
        let result = regex.exec(search);

        if (result) {
            matches.push({
                start: result.index,
                end: result.index + result[0].length,
                str: result[0]
            }); // we care about the first returned result
        }
        else {
            break; // no more matches
        }
    }

    const addLength = front.length + end.length;
    let addedLength = 0;
    for (const match of matches) {
        // bold each plus power part of the text
        search = search.substring(0, match.start + addedLength) + front + match.str + end +  search.substring(match.end + addedLength)
        addedLength += addLength;
    }

    return search;
}

export function newSprite(textureKey: string, container?: PIXI.Container): PIXI.DisplayObject {
    const sprite = new PIXI.Sprite(PIXI.loader.resources[textureKey].texture);

    if (container) {
        container.addChild(sprite);
    }

    return sprite;
}

export function loadTextures(textures: string[], callback: () => void) {
    const texturesToAyncLoad = textures.filter((t) => !PIXI.loader.resources[t]);

    if (texturesToAyncLoad.length === 0) {
        // nothing to load, just invoke the callback function now
        if (callback) {
            callback();
        }
    }
    else {
        for (const texture of texturesToAyncLoad) {
            PIXI.loader.add({
                url: texture,
                key: texture,
                crossOrigin: true,
            });
        }

        PIXI.loader.load(() => {
            for (const texture of texturesToAyncLoad) {
                const baseTexture = PIXI.loader.resources[texture].texture.baseTexture;
                baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
                baseTexture.mipmap = true;
                PIXI.utils.BaseTextureCache[texture].scaleMode = PIXI.SCALE_MODES.LINEAR;

                baseTexture.update();
            }

            callback();
        });
    }
}

export function outline(obj: PIXI.DisplayObject): void {
    var graphics = new PIXI.Graphics();

    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0xFF700B, 1);
    let bounds = obj.getBounds();
    graphics.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);

    obj.parent.addChild(graphics);
    obj.parent.removeChild(obj);
    graphics.parent.addChild(obj);
}

export function outlineCircle(cir: PIXI.Circle): PIXI.Graphics {
    var graphics = new PIXI.Graphics();

    //graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x3F700B, 1);
    graphics.drawCircle(cir.x, cir.y, cir.radius);

    return graphics;
}

export const wrapStyledTextCharacters = {
    boldStart: String.fromCharCode(17),
    boldEnd: String.fromCharCode(18),
    italicStart: String.fromCharCode(19),
    italicEnd: String.fromCharCode(20),
};

export function wrapStyledText(text: string, width: number, normalStyle: PIXI.TextStyle): PIXI.Container {
    /*text = replaceAll(text, wrapStyledTextCharacters.boldEnd + wrapStyledTextCharacters.boldEnd, '');
    text = replaceAll(text, wrapStyledTextCharacters.boldStart + wrapStyledTextCharacters.boldEnd, '');
    text = replaceAll(text, wrapStyledTextCharacters.boldEnd + wrapStyledTextCharacters.boldStart, '');
    text = replaceAll(text, wrapStyledTextCharacters.italicEnd + wrapStyledTextCharacters.italicEnd, '');
    text = replaceAll(text, wrapStyledTextCharacters.italicStart + wrapStyledTextCharacters.italicEnd, '');
    text = replaceAll(text, wrapStyledTextCharacters.italicEnd + wrapStyledTextCharacters.italicStart, '');*/

    const container = new PIXI.Container();
    const boldStyle = normalStyle.clone();
    boldStyle.fontWeight = 'bold';
    const italicStyle = normalStyle.clone();
    italicStyle.fontStyle = 'italic';

    let pixiLine = new PIXI.Container();
    pixiLine.setParent(container);
    let currentLine = '';
    let bolding = false;
    let italics = false;
    let x = 0;
    let y = 0;
    let iter = 5000;
    for (let i = 0; i < text.length; i++) {
        if (!iter--) {
            throw new Error('Infinite loop detected trying to wrap text, aborting');
        }
        const char = text[i];
        let currentStyle = normalStyle;
        if (bolding) {
            currentStyle = boldStyle;
        }
        if (italics) {
            currentStyle = italicStyle;
        }

        let newline = false;
        let paddedNewline = false;
        let cutoff = false;
        switch (char) {
            case '\n':
                // newline, so end the current line
                newline = true;
                if (text[i + 1] === '\n') {
                    i++;
                    paddedNewline = true;
                }
                break;
            case wrapStyledTextCharacters.boldStart:
                if (!italics) {
                    if (!bolding) {
                        cutoff = true;
                    }
                    bolding = true;
                }
                break;
            case wrapStyledTextCharacters.boldEnd:
                if (!italics) {
                    if (bolding) {
                        cutoff = true;
                    }
                    bolding = false;
                }
                break;
            case wrapStyledTextCharacters.italicStart:
                if (!italics || bolding) {
                    cutoff = true;
                }
                bolding = false;
                italics = true;
                break;
            case wrapStyledTextCharacters.italicEnd:
                if (italics || bolding) {
                    cutoff = true;
                }
                bolding = false;
                italics = false;
                break;
            default:
                currentLine += char;
                break;
        }

        if (i === (text.length-1)) {
            // end of text, force a newline to spit out what we've built
            newline = true;
        }

        if (!newline) {
            // we need to check if the added character is making this line too long,
            // forcing it to wrap
            const bounds = PIXI.TextMetrics.measureText(currentLine, currentStyle);
            const lastLineObject = <PIXI.Text>pixiLine.children[pixiLine.children.length - 1];
            //lineObjects.reduce((sum, obj) => sum + obj.width, 0);
            const totalLineWidth = bounds.width + Number(lastLineObject ? (lastLineObject.x + lastLineObject.width) : 0);
            if (totalLineWidth >= width) {
                // the line has gotten too long, wrap it
                // we need to move i backwards until we find a space to newline on
                for (let r = i; r >= 0; r--) {
                    let rChar = text[r];
                    if (rChar === ' ') {
                        //text = text.substr(0, r) + '\n' + text.substr(r + 1);
                        const delta = i - r;
                        currentLine = currentLine.substring(0, currentLine.length - delta);
                        i = r;
                        newline = true;
                        break;
                    }
                }
            }
        }

        if (cutoff || newline) {
            let pixiText: PIXI.Text;
            if (currentLine) {
                pixiText = new PIXI.Text(currentLine, currentStyle);

                pixiLine.addChild(pixiText);
                pixiText.x = Math.round(x);
            }

            if (newline) {
                y += Number(currentStyle.fontSize) * (paddedNewline ? 1.5 : 1);
                x = 0;

                pixiLine = new PIXI.Container();
                pixiLine.position.set(Math.round(x), Math.round(y));
                container.addChild(pixiLine);
            }
            else if(pixiText) { // cutoff
                x += pixiText.width - PIXI.TextMetrics.measureText(' ', currentStyle).width/5;
            }

            //if (pixiText) outline(pixiText);

            currentLine = '';
        }
    }

    const childs = container.children.slice();
    for (const c of childs) {
        //outline(c);
    }

    return container;
}

export type PIXICircleOrRectangle = PIXI.Circle | PIXI.Rectangle;
export function autoSizeAndWrapStyledText(text: string, width: number, height: number, normalStyle: PIXI.TextStyle,
    autosizeStep: number = 1,
    collisions: PIXICircleOrRectangle[] = [],
    centerHorizontally: boolean = false,
    centerVertically: boolean = false,
): PIXI.Container {
    let resizing = true;
    while (resizing) {
        if (normalStyle.fontSize <= 0) {
            // we'll never fit it, abort!
            return null;
        }

        resizing = false;
        const container = wrapStyledText(text, width, normalStyle);

        if (centerHorizontally) {
            container.pivot.y = -(height - container.height)/2;
        }

        if (centerVertically) {
            for (const child of container.children) {
                const childContainer = <PIXI.Container>child;
                child.x = (width - childContainer.width)/2;
            }
        }

        if (container.height > height) {
            // text is too tall
            resizing = true;
        }
        else {
            for (const collision of collisions) {
                for (const child of container.children) {
                    const textbox = child.getBounds();
                    console.log('checking collision on', textbox);

                    if (collision instanceof PIXI.Rectangle) {
                        if (doRectanglesOverlap(collision, textbox)) {
                            resizing = true;
                            break;
                        }
                    }
                    else if (collision instanceof PIXI.Circle) {
                        if (doesCircleOverlapRectangle(textbox, collision)) {
                            resizing = true;
                            break;
                        }
                    }
                }

                if (resizing) {
                    break;
                }
            }
        }

        if (resizing) {
            console.log('going down', normalStyle.fontSize);
            // step down the font size to see if that one fits
            normalStyle.fontSize = Number(normalStyle.fontSize) - autosizeStep;
        }
        else {
            // it fits!
            return container;
        }
    }

    return null; // nothing fits :(
}
