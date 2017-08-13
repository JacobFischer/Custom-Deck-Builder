/* Contains useful functions relating to the PIXI.js framework */

import { doesCircleOverlapRectangle, doRectanglesOverlap } from "./math";

/**
 * Creates a new sprite from a given resources key and placed into a parent
 * @param textureKey the key of the texture to use for the sprite in the PIXI
 *                   loader's resources. If not present an error will be thrown
 * @param container optional container to add this sprite to as a child
 * @returns the PIXI.Sprite that has newly been created
 */
export function newSprite(textureKey: string, container?: PIXI.Container): PIXI.DisplayObject {
    const resource = PIXI.loader.resources[textureKey];
    if (!resource) {
        throw new Error(`No resource found for key ${textureKey}`);
    }

    const sprite = new PIXI.Sprite(resource.texture);

    if (container) {
        container.addChild(sprite);
    }

    return sprite;
}

// these variables are static scope level variables used to backlog textures
// to load in case of multiple async loadTextures calls
const backlogTextures = new Set<string>();
const backlogCallbacks: Array<() => void> = [];

/**
 * Loads a list of given urls to texture files then fires a callback if given.
 * If another loadTextures is in progress this call will be backlogged to
 * execute after the previous loadTextures finishes
 * @param textures the list of textures to load
 * @param callback optional callback to invoke once textures have been loaded
 */
export function loadTextures(textures: string[], callback?: () => void): void {
    const filtered = new Set<string>(textures.filter((t) => t && !PIXI.loader.resources[t]));
    for (const texture of filtered) {
        backlogTextures.add(texture);
    }

    if (callback) {
        backlogCallbacks.push(callback);
    }

    if (backlogTextures.size) {
        // we have textures to load
        if (PIXI.loader.loading) {
            return; // we'll get to them later
        }
        // else nothing is loading, so let's load the backlog now

        const nowLoading = new Set(backlogTextures);
        const nowCallbacks = backlogCallbacks.slice();
        backlogTextures.clear();
        backlogCallbacks.length = 0;

        for (const texture of nowLoading) {
            PIXI.loader.add({
                url: texture,
                key: texture,
                crossOrigin: true,
            });
        }

        PIXI.loader.load(() => {
            for (const name of nowLoading) {
                const texture = PIXI.loader.resources[name].texture;
                if (texture) {
                    const baseTexture = texture.baseTexture;
                    baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
                    baseTexture.mipmap = true;
                    PIXI.utils.BaseTextureCache[name].scaleMode = PIXI.SCALE_MODES.LINEAR;

                    baseTexture.update();
                }
            }

            for (const nowCallback of nowCallbacks) {
                nowCallback();
            }

            loadTextures([]);
        });
    }
    else {
        if (!PIXI.loader.loading) {
            // nothing to load and nothing is loading, means all textures are
            // already loaded, just invoke the callbacks
            const nowCallbacks = backlogCallbacks.slice();
            backlogCallbacks.length = 0;
            for (const nowCallback of nowCallbacks) {
                nowCallback();
            }
        }
    }
}

/**
 * Special characters used when wrapping styled text to indicate bold and
 * italics text blocks
 */
export const wrapStyledTextCharacters = {
    boldStart: String.fromCharCode(17),
    boldEnd: String.fromCharCode(18),
    italicStart: String.fromCharCode(19),
    italicEnd: String.fromCharCode(20),
};

/**
 * Builds a PIXI.Container which has child PIXI.Text objects that wrap a styled
 * string
 * @param text the text to build and wrap
 * @param width the maximum width of the container to wrap at
 * @param normalStyle the style to apply to the next for normal text. Bold and
 *                    italics text will be set automatically when encountered
 * @returns a pixi container with text wrapped in it accordingly
 */
export function wrapStyledText(text: string, width: number, normalStyle: PIXI.TextStyle): PIXI.Container {
    const container = new PIXI.Container();
    const boldStyle = normalStyle.clone();
    boldStyle.fontWeight = "bold";
    const italicStyle = normalStyle.clone();
    italicStyle.fontStyle = "italic";

    let pixiLine = new PIXI.Container();
    pixiLine.setParent(container);
    let currentLine = "";
    let bolding = false;
    let italics = false;
    let x = 0;
    let y = 0;
    let iter = 5000;
    for (let i = 0; i < text.length; i++) {
        if (!iter--) {
            throw new Error("Infinite loop detected trying to wrap text, aborting");
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
            case "\n":
                // newline, so end the current line
                newline = true;
                if (text[i + 1] === "\n") {
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

        if (i === (text.length - 1)) {
            // end of text, force a newline to spit out what we've built
            newline = true;
        }

        if (!newline) {
            // we need to check if the added character is making this line too long,
            // forcing it to wrap
            const bounds = PIXI.TextMetrics.measureText(currentLine, currentStyle);
            const lastLineObject = pixiLine.children[pixiLine.children.length - 1] as PIXI.Text;
            const lastLineOffset = lastLineObject
                ? (lastLineObject.x + lastLineObject.width)
                : 0;
            const totalLineWidth = bounds.width + lastLineOffset;

            if (totalLineWidth >= width) {
                // the line has gotten too long, wrap it
                // we need to move i backwards until we find a space to newline on
                for (let r = i; r >= 0; r--) {
                    const rChar = text[r];
                    if (rChar === " ") {
                        const delta = i - r;
                        currentLine = currentLine.substring(0, currentLine.length - delta);
                        i = r; // reset index
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
            else if (pixiText) { // cutoff
                x += pixiText.width - PIXI.TextMetrics.measureText(" ", currentStyle).width / 5;
            }

            currentLine = "";
        }
    }

    return container;
}

export type PIXICircleOrRectangle = PIXI.Circle | PIXI.Rectangle;

/**
 * Builds a PIXI.Container that contains child PIXI.Texts that wrap a given
 * string, and automatically downsizes the text to force it to fit
 * @param text the text to fit
 * @param width the maximum width to wrap at
 * @param height the maximum height to downscale if the wrapped text it too tall
 * @param normalStyle the normal style of the text
 * @param autoSizeStep when stepping down the text the amount to step down
 * @param collisions a list of PIXI circles and/or rectangles to check for
 *                   collisions in. If any are encountered we will down-step.
 * @param centerHorizontally if the text should be centered horizontally
 * @param centerVertically if the text should be centered vertically
 * @returns a pixi container with text wrapped in it accordingly
 */
export function autoSizeAndWrapStyledText(text: string, width: number, height: number, normalStyle: PIXI.TextStyle,
                                          autoSizeStep: number = 1,
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
            container.pivot.y = -(height - container.height) / 2;
        }

        if (centerVertically) {
            for (const child of container.children) {
                const childContainer = child as PIXI.Container;
                child.x = (width - childContainer.width) / 2;
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
            // step down the font size to see if that one fits
            normalStyle.fontSize = Number(normalStyle.fontSize) - autoSizeStep;
        }
        else {
            // it fits!
            return container;
        }
    }

    return null; // nothing fits :(
}
