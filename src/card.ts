import { wrapText } from './svgTextHelper';

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

    draw(app: PIXI.Application) {
        this.container = new PIXI.Container();
        this.container.setParent(app.stage);

        this.backgroundTypeSprite = new PIXI.Sprite(PIXI.loader.resources[this.type.toLowerCase()].texture);
        this.backgroundTypeSprite.setParent(this.container);

        this.backgroundCostSprite = new PIXI.Sprite(PIXI.loader.resources['background-cost'].texture);
        this.backgroundCostSprite.setParent(this.container);

        let vpKey = 'normal';
        if (this.victoryPoints < 0) {
            vpKey = 'negative';
        }
        this.backgroundVPSprite = new PIXI.Sprite(PIXI.loader.resources[`background-vp-${vpKey}`].texture);
        this.backgroundVPSprite.setParent(this.container);

        this.nameText = new PIXI.Text(this.name.toUpperCase(), new PIXI.TextStyle({
            fontFamily: 'CompactaBT',
            fill: '#ffffff',
            fontStyle: 'italic',
            /*fontSize: 83,
            
            //fontWeight: 'bold',
            
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 0,
            dropShadowAngle: 60 * Math.PI / 180,
            dropShadowDistance: 8,*/
        }));
        this.nameText.setParent(this.container);

        this.nameText.position.set(36, 40);
        this.nameText.scale.y *= 0.75;

        this.container.x = 0;
        this.container.y = 0;
    }

    toSVG(): SVGSVGElement {
        let vpKey = 'normal';
        if (this.victoryPoints < 0) {
            vpKey = 'negative';
        }

        const boldTag = '<tspan style="font-weight: bold;">';
        const italicsTag = '<tspan style="font-style: italic;">';
        const endTag = '</tspan>';

        let formattedText = this.text;
        formattedText = replaceAll(formattedText, '<b>', boldTag);
        formattedText = replaceAll(formattedText, '<i>', italicsTag);
        formattedText = replaceAll(formattedText, '</b>', endTag);
        formattedText = replaceAll(formattedText, '</i>', endTag);
        formattedText = replaceAll(formattedText, '<br />', '\n');
        formattedText = replaceAll(formattedText, '<br/>', '\n');

        const blocks = formattedText.split('\n');
        const formattedBlocks: string[][] = [];

        // now we need to find the manual word breaks, because svg doesn't do that...
        for (const block of blocks) {
            formattedBlocks.push(block.split('<wr/>'));
        }

        // TODO: throw all the formatted text, irrgardless of line breaks and such, into a single <text>
        // then grab that text via its ID.
        // then empty out the string, and word by word inset a character into a new tspan with a dy
        // when the tspan.clientWidth exceeds some number (750-40-40), then wrap the line into a new tspan
        // continue till no words remain

        let typeFill = '#FFFFFF'; // assume the type text is white
        if (this.type === 'Equipment' || this.type === 'Super Power') {
            typeFill = '#000000';
        }

        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        // TODO: extract this from the template?
        svgElement.setAttribute('width', '750px');
        svgElement.setAttribute('height', '1050px');
        svgElement.setAttribute('viewBox', '0 0 750 1050');

        svgElement.innerHTML = template({
            name: this.name.toUpperCase(),
            type: this.type.toUpperCase(),
            typeFill,
            backgroundTypeImage: require(`../resources/card-templates/${this.type.toLowerCase()}.png`),
            backgroundVPImage: require(`../resources/card-templates/background-vp-${vpKey}.png`),
            backgroundCostImage: require(`../resources/card-templates/background-cost.png`),
            vpVariableImage: this.victoryPoints === '*' && require(`../resources/card-templates/vp-variable.png`),
            vp: this.victoryPoints,
            cost: this.cost,
            //blocks: [['Hello how are you doing today Im quite well thank you for asking, though I wish i had purchased some pizza from work today']],//formattedBlocks,
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
        const cardText = <any>svgElement.getElementById('card-text');
        const cardLegal = <any>svgElement.getElementById('card-legal');
        setTimeout(() => {
            wrapText(cardText, this.text, this.textSize * 36/DEFAULT_TEXT_SIZE, 40, this.textSize * 50/DEFAULT_TEXT_SIZE);
            wrapText(cardLegal, this.legal, 20, 224, 30);
        }, 1);

        return svgElement;
    }
}
