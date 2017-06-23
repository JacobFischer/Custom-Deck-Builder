import { wrapText } from './svg-text-helper';
import './card.scss';
import 'normalize.css';

const template: (args: Object) => string = require('./card.hbs');
const DEFAULT_TEXT_SIZE = 38;

function replaceAll(target: string, search: string, replacement: string): string {
    return target.replace(new RegExp(search, 'g'), replacement);
};

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
        readonly type: 'Equipment' | 'Hero' | 'Location' | 'Starter' | 'Super Hero' | 'Super Power' | 'Super Villain' | 'Villain' | 'Weakness',
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
        const variantType = ((this.variant ? 'super-' : '') + this.type).toLowerCase();

        // TODO: extract this from the template?
        svgElement.setAttribute('width', '750px');
        svgElement.setAttribute('height', '1050px');
        svgElement.setAttribute('viewBox', '0 0 750 1050');
        svgElement.setAttribute('class', `custom-card main-type-${variantType}`);

        svgElement.innerHTML = template({
            name: this.name.toUpperCase(),
            type: this.type.toUpperCase(),
            backgroundTypeImage: require(`../resources/card-templates/${variantType}.png`),
            backgroundVPImage: require(`../resources/card-templates/background-vp-${vpKey}.png`),
            backgroundCostImage: require(`../resources/card-templates/background-cost.png`),
            vpVariableImage: this.victoryPoints === '*' && require(`../resources/card-templates/vp-variable.png`),
            vp: this.victoryPoints,
            cost: this.cost,
            imageURL: this.imageURL,
            logoURL: this.logoURL,
            textSize: this.textSize,
            copyright: this.copyright,
            legal: this.legal,
            subtype: this.subtype.toUpperCase(),
        });

        // now we need to manually wrap the text, because svg can't do that for whatever reason :P

        // we assume the template has a .text-wrapper with 1 child .text.
        // We will extract those and manually wrap them
        const cardText = <any>svgElement.getElementsByClassName('card-text')[0];
        const cardLegal = <any>svgElement.getElementsByClassName('card-legal')[0];
        setTimeout(() => {
            wrapText(cardText, this.text, this.textSize * 36/DEFAULT_TEXT_SIZE, 40, this.textSize * 50/DEFAULT_TEXT_SIZE);
            wrapText(cardLegal, this.legal, 20, 224, 30);
        }, 1);

        return svgElement;
    }
}
