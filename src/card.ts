import { wrapSVGText, roundedRectangle } from './svg-text-helper';
import { replaceAll, surroundText } from './utils';
import './card.scss';
import 'normalize.css';

const regularTemplate: (args: Object) => string = require('./card.hbs');
const oversizedTemplate: (args: Object) => string = require('./card-oversized.hbs');
const DEFAULT_TEXT_SIZE = 38;

/**
 * @class represents a custom card
 */
export class Card {
    private container: PIXI.Container;
    private backgroundTypeSprite: PIXI.Sprite;
    private backgroundCostSprite: PIXI.Sprite;
    private backgroundVPSprite: PIXI.Sprite;

    private nameText: PIXI.Text;
    private manualTextSize: boolean = false;

    constructor(
        readonly name: string,
        readonly baseType: 'Equipment' | 'Hero' | 'Location' | 'Starter' | 'Super Power' | 'Villain' | 'Weakness',
        readonly variant: boolean = false,
        readonly oversized: boolean = false,
        readonly typePrefix: string = '',
        readonly victoryPoints: '*' | number = 1,
        readonly cost: number = 1,
        readonly text: string,
        readonly imageURL: string,
        readonly logoURL: string,
        readonly textSize: number,
        readonly copyright: string = '',
        readonly legal: string = '',
        readonly subtype: string = null,
        readonly set: string = null,
        readonly setTextColor = '#ffffff',
        readonly setBackgroundColor = '#000000',
        readonly alsoBold: string[] = [],
    ) {
        if (!copyright) {
            this.copyright = String(new Date().getFullYear());
        }
        this.copyright = `©${this.copyright}`;

        if (textSize) {
            this.manualTextSize = true;
        }
        else {
            this.textSize = DEFAULT_TEXT_SIZE;
        }
    }

    toSVG(): SVGSVGElement {
        let vpKey = 'normal';
        if (this.victoryPoints < 0) {
            vpKey = 'negative';
        }

        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let variantType: string = this.baseType;
        if (this.variant && (this.baseType === 'Hero' || this.baseType === 'Villain')) {
            variantType = `Super ${variantType}`;
        }
        else if (this.oversized) {
            variantType = `oversized-${this.baseType}`;
        }
        variantType = variantType.replace(' ', '-').toLowerCase();

        // TODO: extract this from the template?
        const width = this.oversized ? 900 : 750;
        const height = this.oversized ? 1200 : 1050;

        svgElement.setAttribute('width', `${width}px`);
        svgElement.setAttribute('height', `${height}px`);
        svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svgElement.setAttribute('class', `custom-card main-type-${this.baseType.replace(' ', '-').toLowerCase()} ${this.variant ? 'variant' : this.oversized ? 'oversized' : 'normal'}`);
        svgElement.setAttribute('style', 'display: inline-block;');

        const template = this.oversized ? oversizedTemplate : regularTemplate;

        svgElement.innerHTML = template({
            name: this.name.toUpperCase(),
            type: this.baseType !== 'Weakness' && this.baseType.toUpperCase(),
            backgroundTypeImage: require(`../resources/card-templates/${variantType}.png`),
            backgroundVPImage: require(`../resources/card-templates/background-vp-${vpKey}.png`),
            backgroundCostImage: require(`../resources/card-templates/background-cost.png`),
            vpVariableImage: this.victoryPoints === '*' && require(`../resources/card-templates/vp-variable.png`),
            vpType: this.victoryPoints < 0 ? 'negative' : 'positive',
            vp: Math.abs(<number>this.victoryPoints),
            cost: this.cost,
            imageURL: this.imageURL,
            logoURL: this.logoURL,
            copyright: this.copyright,
            legal: this.legal,
            subtype: this.baseType !== 'Weakness' && this.subtype && this.subtype.toUpperCase(),
            set: this.set && this.set.toUpperCase(),
            setTextColor: this.setTextColor,
            setBackgroundColor: this.setBackgroundColor,
        });

        // now we need to manually wrap the text, because svg can't do that for whatever reason :P

        // we assume the template has a .text-wrapper with 1 child .text.
        // We will extract those and manually wrap them
        const cardText = <SVGTextElement>svgElement.getElementsByClassName('card-text')[0];
        const cardLegal = <SVGTextElement>svgElement.getElementsByClassName('card-legal')[0];
        const cardVPRect = <SVGRectElement>svgElement.getElementsByClassName('card-vp-rect')[0];

        const formattedText = this.formatText();

        setTimeout(() => {
            console.log(this.name, 'delayed');
            wrapSVGText(cardText, formattedText, {
                center: this.oversized,
                middle: this.oversized,

                textSize: this.textSize,
                resize: !this.manualTextSize,
                onResize: (options) => {
                    options.lineHeight = options.textSize * 36/DEFAULT_TEXT_SIZE;
                    options.newParagraphHeight = options.textSize * 50/DEFAULT_TEXT_SIZE
                    return options;
                },
                collisions: this.oversized ? [] : [cardVPRect.getBBox()],
            });

            wrapSVGText(cardLegal, this.legal, {
                textSize: 20,
                lineHeight: 21,
                newParagraphHeight: 22,
            });

            if (this.set) {
                const setText = <any>svgElement.getElementsByClassName('card-set-text')[0];
                const setBackground = <any>svgElement.getElementsByClassName('card-set-background')[0];
                roundedRectangle(setBackground, setText);
            }
        }, 1);

        return svgElement;
    }

    private formatText(): string {
        let formattedText = this.text;


        formattedText = surroundText(formattedText, /\+(.*?)\ Power/g, '[b]', '[/b]');
        formattedText = surroundText(formattedText, /(\d)\ Power/g, '[b]', '[/b]');
        formattedText = surroundText(formattedText,  /\(([^)]+)\)/g, '[i]', '[/i]');
        formattedText = surroundText(formattedText, /(Stack)\ Ongoing/g, '[b]', '[/b]');

        for (const toBold of ['+Power', ':', 'Attacked', 'Attack', 'Defense', 'Ongoing', 'Weakness', this.name].concat(this.alsoBold)) {
            formattedText = replaceAll(formattedText, toBold, `[b]${toBold}[/b]`);
        }

        return formattedText;
    }
}
