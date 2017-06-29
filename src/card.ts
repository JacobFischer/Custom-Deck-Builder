import { wrapText, roundedRectangle } from './svg-text-helper';
import { replaceAll } from './utils';
import './card.scss';
import 'normalize.css';

const template: (args: Object) => string = require('./card.hbs');
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

    constructor(
        readonly name: string,
        readonly baseType: 'Equipment' | 'Hero' | 'Location' | 'Starter' | 'Super Power' | 'Villain' | 'Weakness',
        readonly variant: boolean = false,
        readonly typePrefix: string = '',
        readonly victoryPoints: '*' | number = 1,
        readonly cost: number = 1,
        readonly text: string,
        readonly imageURL: string,
        readonly logoURL: string,
        readonly textSize: number = DEFAULT_TEXT_SIZE,
        readonly copyright: string = '',
        readonly legal: string = '',
        readonly subtype: string = null,
        readonly set: string = null,
        readonly setTextColor = '#ffffff',
        readonly setBackgroundColor = '#000000',
    ) {
        if (!copyright) {
            this.copyright = String(new Date().getFullYear());
        }
        this.copyright = `©${this.copyright}`;
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
        variantType = variantType.replace(' ', '-').toLowerCase();

        // TODO: extract this from the template?
        svgElement.setAttribute('width', '750px');
        svgElement.setAttribute('height', '1050px');
        svgElement.setAttribute('viewBox', '0 0 750 1050');
        svgElement.setAttribute('class', `custom-card main-type-${this.baseType.replace(' ', '-').toLowerCase()} ${this.variant ? 'variant' : 'normal'}`);
        svgElement.setAttribute('style', 'display: block;');

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
            textSize: this.textSize,
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
        const cardText = <any>svgElement.getElementsByClassName('card-text')[0];
        const cardLegal = <any>svgElement.getElementsByClassName('card-legal')[0];

        setTimeout(() => {
            wrapText(cardText, this.text, this.textSize * 36/DEFAULT_TEXT_SIZE, 40, this.textSize * 50/DEFAULT_TEXT_SIZE);
            wrapText(cardLegal, this.legal, 20, 224, 30);

            if (this.set) {
                const setText = <any>svgElement.getElementsByClassName('card-set-text')[0];
                const setBackground = <any>svgElement.getElementsByClassName('card-set-background')[0];
                roundedRectangle(setBackground, setText);
            }
        }, 1);

        return svgElement;
    }
}
