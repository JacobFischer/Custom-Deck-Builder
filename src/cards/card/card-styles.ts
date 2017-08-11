// Note: This is like a poor man's CSS
// PIXI.js support CSS "like" styles, but not identical properties

/**
 * A "fake" css like structure that contains PIXI text style options based on a
 * card's part, type, and if it is oversized
 */
const styles: {
    [key: string]: {
        [key: string]: PIXI.TextStyleOptions,
    },
} = {
    // disabling sorting because out of order reads better
    // tslint:disable:object-literal-sort-keys
    defaults: {
        // these are the default values
        defaults: {
            dropShadow: false,
            fill: "#000000",
            fontFamily: "CompactaBT",
            fontSize: 32,
            lineJoin: "round",
        },

        cost: {
            fill: "#000000",
            fontFamily: "CompactaBdBT",
            fontSize: 91.67,
            fontWeight: "bold",
            letterSpacing: 0.06,
            padding: 100,
            stroke: "#646569",
            strokeThickness: 18,
        },
        name: {
            dropShadow: true,
            dropShadowAngle: 60 * Math.PI / 180,
            dropShadowBlur: 0,
            dropShadowColor: "#000000",
            dropShadowDistance: 12,
            fill: "#ffffff",
            fontSize: 83.333,
            letterSpacing: -0.9,
            padding: 100,
        },
        subtype: {
            fontSize: 33.333,
            letterSpacing: 1.375,
        },
        type: {
            fill: "#ffffff",
            fontSize: 66.667,
            letterSpacing: 2.75,
            padding: 100,
        },
        text: {
            fill: "#000000",
            fontFamily: "TradeGothic",
            fontSize: 38,
            letterSpacing: -0.84,
            padding: 0,
        },
        vp: {
            fill: "#000000",
            fontSize: 48.75,
            padding: 100,
            stroke: "#fcb041",
            strokeThickness: 6,
        },
        copyright: {
            fill: "#000000",
            fontFamily: "TradeGothic",
            fontSize: 21,
            letterSpacing: -0.20,
        },
        legal: {
            fill: "#ffffff",
            fontFamily: "TradeGothic",
            fontSize: 21.5,
            letterSpacing: -0.20,
        },
        set: {
            fontFamily: "CompactaBT",
            fontSize: 30,
            letterSpacing: 1,
            padding: 100,
        },
    },

    oversized: {
        copyright: {
            fill: "#ffffff",
            fontSize: 21.5,
        },
        name: {
            fill: "#ffc70e",
            fontSize: 108.33,
            letterSpacing: 1,
        },
        set: {
            fontSize: 22,
        },
        subtype: {
            dropShadow: true,
            dropShadowAngle: 60 * Math.PI / 180,
            dropShadowBlur: 0,
            dropShadowColor: "#000000",
            dropShadowDistance: 6,
            fill: "#ffc70e",
            fontSize: 60,
        },
        text: {
            fill: "#ffffff",
        },
    },

    // specific card types

    Equipment: {
        type: {
            fill: "#000000",
        },
    },

    Hero: {
        name: {
            fill: "#00a5e3",
        },
    },

    SuperPower: {
        name: {
            fill: "#f77d27",
        },
        type: {
            fill: "#000000",
        },
    },

    Villain: {
        name: {
            fill: "#ed2122",
        },
    },

    Location: {
        name: {
            fill: "#ea078c",
        },
    },

    Starter: {
        name: {
            fill: "#fff200",
        },
        type: {
            fill: "#000000",
        },
    },

    Weakness: {
        name: {
            fill: "#8dc73f",
        },
        type: {
            fill: "#000000",
        },
    },

    // tslint:enable:object-literal-sort-keys
};

/**
 * Gets a style for a card part
 * @param type the type this card is
 * @param part the part of the card we are styling
 * @param oversized if this card is oversized
 * @returns a PIXI.TextStyle with default values representing that card part
 */
export function getStyle(type: string, part: string, oversized: boolean = false): PIXI.TextStyle {
    const style = Object.assign({}, styles.defaults.defaults);

    if (part === "subtype") {
        Object.assign(style, styles.defaults.type);
    }

    if (styles.defaults[part]) {
        Object.assign(style, styles.defaults[part]);
    }

    // no spaces un types, e.g. 'Super Power' -> 'SuperPower'
    type = type.replace(" ", "");
    if (styles[type]) {
        if (part === "subtype") {
            Object.assign(style, styles[type].type);
        }

        if (styles[type][part]) {
            Object.assign(style, styles[type][part]);
        }
    }

    if (oversized && styles.oversized[part]) {
        Object.assign(style, styles.oversized[part]);
    }

    return new PIXI.TextStyle(style);
}
