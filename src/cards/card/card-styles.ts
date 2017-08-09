// Note: This is like a poor man's CSS
// PIXI.js support CSS "like" styles, but not identical properties

/**
 * A "fake" css like structure that contains PIXI text style options based on a
 * card's part, type, and if it is oversized
 */
const styles: {
    [key: string]: {
        [key: string]: PIXI.TextStyleOptions
    }
} = {
    defaults: {
        defaults: {
            fontFamily: 'CompactaBT',
            fontSize: 32,
            fill: '#000000',
            dropShadow: false,
            lineJoin: 'round',
        },
        name: {
            fontSize: 83.333,
            fill: '#ffffff',
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 0,
            dropShadowAngle: 60 * Math.PI/180,
            dropShadowDistance: 12,
            padding: 100,
            letterSpacing: -0.9,
        },
        type: {
            fill: '#ffffff',
            fontSize: 66.667,
            letterSpacing: 2.75,
            padding: 100,
        },
        subtype: {
            fontSize: 33.333,
            letterSpacing: 1.375,
        },
        cost: {
            fontFamily: 'CompactaBdBT',
            fontWeight: 'bold',
            fontSize: 91.67,
            fill: '#000000',
            stroke: '#646569',
            strokeThickness: 18,
            padding: 100,
            letterSpacing: 0.06,
        },
        text: {
            fontFamily: 'TradeGothic',
            fontSize: 38,
            fill: '#000000',
            letterSpacing: -0.84,
            padding: 0,
        },
        vp: {
            fill: '#000000',
            fontSize: 48.75,
            stroke: '#fcb041',
            padding: 100,
            strokeThickness: 6,
        },
        copyright: {
            fontFamily: 'TradeGothic',
            fontSize: 21,
            fill: '#000000',
            letterSpacing: -0.20,
        },
        legal: {
            fontFamily: 'TradeGothic',
            fontSize: 21.5,
            fill: '#ffffff',
            letterSpacing: -0.20,
        },
        set: {
            fontFamily: 'CompactaBT',
            fontSize: 30,
            letterSpacing: 1,
            padding: 100,
        }
    },

    oversized: {
        name: {
            fill: '#ffc70e',
            fontSize: 108.33,
            letterSpacing: 1,
        },
        subtype: {
            fill: '#ffc70e',
            fontSize: 60,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 0,
            dropShadowAngle: 60 * Math.PI/180,
            dropShadowDistance: 6,
        },
        text: {
            fill: '#ffffff',
        },
        copyright: {
            fill: '#ffffff',
            fontSize: 21.5,
        },
        set: {
            fontSize: 22,
        }
    },

    // specific card types

    Hero: {
        name: {
            fill: '#00a5e3',
        }
    },

    SuperPower: {
        name: {
            fill: '#f77d27',
        },
        type: {
            fill: '#000000',
        }
    },

    Equipment: {
        type: {
            fill: '#000000',
        }
    },

    Villain: {
        name: {
            fill: '#ed2122',
        },
    },

    Location: {
        name: {
            fill: '#ea078c',
        }
    },

    Starter: {
        name: {
            fill: '#fff200',
        },
        type: {
            fill: '#000000',
        }
    },

    Weakness: {
        name: {
            fill: '#8dc73f',
        },
        type: {
            fill: '#000000',
        }
    },
}

/**
 * Gets a style for a card part
 * @param type the type this card is
 * @param part the part of the card we are styling
 * @param oversized if this card is oversized
 * @returns a PIXI.TextStyle with default values representing that card part
 */
export function getStyle(type: string, part: string, oversized = false): PIXI.TextStyle {
    const style = Object.assign({}, styles.defaults.defaults);

    if (part === 'subtype') {
        Object.assign(style, styles.defaults.type);
    }

    if (styles.defaults[part]) {
        Object.assign(style, styles.defaults[part]);
    }

    type = type.replace(' ', '');
    if (styles[type]) {
        if (part === 'subtype') {
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
