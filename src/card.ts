import { wrapSVGText, roundedRectangle } from './svg-text-helper';
import { replaceAll, surroundText, newSprite, outline, outlineCircle, wrapStyledText, autoSizeAndWrapStyledText, wrapStyledTextCharacters, loadTextures } from './utils';
import { getStyle } from './card-styles';
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
    private imageSprite: PIXI.Sprite;
    private logoSprite: PIXI.Sprite;

    private nameText: PIXI.Text;
    private manualTextSize: boolean = false;

    public pxWidth = 750;
    public pxHeight = 1050;

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
        readonly logoScale: number,
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

        if (this.oversized) {
            this.pxWidth = 900;
            this.pxHeight = 1200;
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
            vp: Math.abs(Number(this.victoryPoints)),
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
            wrapSVGText(cardText, formattedText, {
                center: this.oversized,
                middle: this.oversized,

                textSize: this.textSize,
                resize: !this.manualTextSize,
                onResize: (options) => {
                    options.lineHeight = options.textSize * 36/DEFAULT_TEXT_SIZE;
                    options.newParagraphHeight = options.textSize * 50/DEFAULT_TEXT_SIZE;
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

    private getStyle(part: string): PIXI.TextStyle {
        return getStyle(this.baseType, part, this.oversized);
    }

    public render(): Promise<PIXI.Container> {
        return new Promise((resolve, reject) => {
            loadTextures([this.imageURL, this.logoURL], () => {
                this.renderSync();

                resolve(this.container);
            })
        });
    }

    public renderSync(): PIXI.Container {
        this.container = new PIXI.Container();

        this.renderImage();
        this.renderBackground();
        this.renderLogo();

        this.renderCost();
        this.renderVP();

        this.renderName();
        this.renderType();
        this.renderSubType();

        this.renderText();

        this.renderCopyright();
        this.renderLegal();

        this.renderSet();

        return this.container;
    };

    private renderImage(): void {
        let imageMaxWidth = 750;
        let imageMaxHeight = 523;
        let imageTop = 117;
        if (this.oversized) {
            imageMaxWidth = 900;
            imageMaxHeight = 741;
            imageTop = 216;
        }

        const backgroundImage = newSprite(this.imageURL, this.container);
        backgroundImage.position.set(imageMaxWidth/2, imageTop + imageMaxHeight/2);
        let backgroundBounds = backgroundImage.getBounds();

        let scale = 1;
        if (backgroundBounds.width > backgroundBounds.height) {
            // bind height to max height
            scale = imageMaxHeight/backgroundBounds.height;
        }
        else {
            // bind width to max width
            scale = imageMaxWidth/backgroundBounds.width;
        }

        backgroundImage.scale.set(scale, scale);
        backgroundBounds = backgroundImage.getLocalBounds();
        backgroundImage.pivot.set(backgroundBounds.width/2, backgroundBounds.height/2);

        let backgroundImageMask = new PIXI.Graphics();
        backgroundImageMask.beginFill(0);
        backgroundImageMask.drawRect(0, imageTop, imageMaxWidth, imageMaxHeight);
        backgroundImageMask.endFill();
        this.container.addChild(backgroundImageMask);
        backgroundImage.mask = backgroundImageMask;
    }

    private renderBackground(): void {
        let backgroundType: string = this.baseType;
        if (this.variant) {
            if (this.baseType === 'Hero' || this.baseType === 'Villain') {
                backgroundType = `Super-${this.baseType}`;
            }
        }
        if (this.oversized) {
            backgroundType = `Oversized-${backgroundType}`;
        }

        let cardBackgroundSprite = newSprite(backgroundType.replace(' ', '-').toLowerCase(), this.container);

        if (this.variant && !this.oversized) {
            const graphics = new PIXI.Graphics();
            graphics.beginFill(0x000000); // black
            graphics.drawRect(0, 719, 750, 224);
            graphics.endFill();
            this.container.addChild(graphics);
        }
    }

    private renderLogo(): void {
        const maxLogoWidth = 175;
        const maxLogoHeight = 175;
        const logoSprite = newSprite(this.logoURL, this.container);
        let bounds = logoSprite.getBounds();

        let scale = 1;
        if (bounds.width > maxLogoWidth) {
            scale = Math.min(scale, maxLogoWidth/bounds.width);
        }
        if (bounds.height > maxLogoHeight) {
            scale = Math.min(scale, maxLogoHeight/bounds.height);
        }

        if (this.logoScale) {
            scale *= this.logoScale;
        }

        let x = 714;
        let y = 26;
        if (this.oversized) {
            x = 900 - 25;
            y = 40;
        }

        bounds = logoSprite.getLocalBounds();
        logoSprite.scale.set(scale, scale);
        logoSprite.pivot.x = bounds.width;
        logoSprite.position.set(x, y);
    }

    private renderName(): void {
        let x = 45;
        let y = 48;
        if (this.oversized) {
            x = 53;
            y = 55;
        }

        let cardName = new PIXI.Text(this.name.toUpperCase(), this.getStyle('name'));

        cardName.position.set(x, y);
        cardName.scale.y *= 0.75;
        cardName.scale.x *= 0.96;
        cardName.skew.x = -0.265;
        this.container.addChild(cardName);
    }

    private renderType(): void {
        if (this.oversized) {
            return;
        }

        let cardTypeText = new PIXI.Text(this.baseType.toUpperCase(), this.getStyle('type'));
        cardTypeText.x = 45;
        cardTypeText.y = 666;

        cardTypeText.scale.y *= 0.75;
        cardTypeText.scale.x *= 0.96;
        cardTypeText.skew.x = -0.265;
        this.container.addChild(cardTypeText);
    }

    private renderSubType(): void {
        if (!this.subtype) {
            return;
        }

        let x = 710;
        let y = 700;
        if (this.oversized) {
            x = 900 - 39;
            y = 950;
        }

        let subtypeText = new PIXI.Text(this.subtype.toUpperCase(), this.getStyle('subtype'));
        subtypeText.scale.y *= 0.75;
        subtypeText.scale.x *= 0.96;
        subtypeText.skew.x = -0.265;
        subtypeText.pivot.set(subtypeText.width, subtypeText.height);
        subtypeText.position.set(x, y);
        this.container.addChild(subtypeText);
    }

    private renderCost(): void {
        if (this.oversized) {
            return;
        }

        let backgroundCost = newSprite('background-cost', this.container);

        // card's cost back
        const cardCostBackStyle = this.getStyle('cost');
        let cardCostBackText = new PIXI.Text(String(this.cost), cardCostBackStyle);
        cardCostBackText.pivot.set(cardCostBackText.width/2, cardCostBackText.height/2);
        cardCostBackText.position.set(641, 958);
        this.container.addChild(cardCostBackText);

        // and front (so we can basically have a double stroke)
        const cardCostFrontStyle = cardCostBackStyle.clone();
        cardCostFrontStyle.stroke = '#ffffff';
        cardCostFrontStyle.strokeThickness = 10;
        let cardCostFrontText = new PIXI.Text(String(this.cost), cardCostFrontStyle);
        cardCostFrontText.pivot.set(cardCostFrontText.width/2, cardCostFrontText.height/2);
        cardCostFrontText.position.set(641, 958);;
        this.container.addChild(cardCostFrontText);
    }

    private renderVP(): void {
        if (this.oversized) {
            return;
        }

        const vpSign = this.victoryPoints < 0 ? 'negative': 'normal';
        let backgroundVP = newSprite(`background-vp-${vpSign}`, this.container);

        if (this.victoryPoints === '*') {
            const vpAsteriskSprite = newSprite('vp-variable', this.container);
        }
        else { // it's a number
            const scalar = 2;
            const vpStyle = this.getStyle('vp');

            if (this.victoryPoints < 0) {
                vpStyle.stroke = '#9dcd4e'; // green outline for negative VPs
            }

            vpStyle.fontSize = Number(vpStyle.fontSize) * scalar;
            vpStyle.strokeThickness = Number(vpStyle.strokeThickness) * scalar;

            const vpText = new PIXI.Text(String(Math.abs(this.victoryPoints)), vpStyle);
            vpText.scale.y *= 0.75/scalar;
            vpText.scale.x *= 1/scalar;

            const bounds = vpText.getLocalBounds();
            vpText.pivot.set(bounds.width/2, bounds.height/2);
            vpText.position.set(88, 982);
            this.container.addChild(vpText);
        }
    }

    private renderText(): void {
        let formattedText = this.formatText();

        formattedText = replaceAll(formattedText, '[b]', wrapStyledTextCharacters.boldStart);
        formattedText = replaceAll(formattedText, '[/b]', wrapStyledTextCharacters.boldEnd);
        formattedText = replaceAll(formattedText, '[i]', wrapStyledTextCharacters.italicStart);
        formattedText = replaceAll(formattedText, '[/i]', wrapStyledTextCharacters.italicEnd);

        const vpCircle = new PIXI.Circle(603, 215, 78 + 5);
        let collisions = [];
        let maxWidth = 750;
        let maxHeight = 172;
        let x = 39;
        let y = 731;
        if (this.oversized) {
            y = 974;
            maxWidth = 900;
            maxHeight = 161 - 14*2;
        }
        else {
            collisions.push(vpCircle);
        }

        const style = this.getStyle('text');
        if (this.variant && !this.oversized) {
            style.fill = '#ffffff';
        }

        let textContainer = autoSizeAndWrapStyledText(formattedText, maxWidth - x*2, maxHeight, style, 1, collisions, this.oversized, this.oversized);

        textContainer.position.set(x, y);

        this.container.addChild(textContainer);

        //outlineCircle(vpCircle).setParent(textContainer);
    }

    private renderSet(): void {
        const style = this.getStyle('set');
        style.fill = this.setTextColor || '#ffffff';
        let set = new PIXI.Text(this.set.toUpperCase(), style);

        set.scale.y *= 0.75;
        set.pivot.set(set.width, set.height);
        if (this.oversized) {
            set.position.set(696, 1161);
        }
        else {
            set.position.set(550, 934);
        }

        // now draw the background
        const xPad = 4;
        const topPad = 3;
        const bottomPad = 4;
        const graphics = new PIXI.Graphics();
        graphics.beginFill(parseInt((this.setBackgroundColor || '#000000').replace(/^#/, ''), 16));
        graphics.drawRoundedRect(set.x - set.width - xPad, set.y - set.height - topPad, set.width + xPad*2, set.height + bottomPad*2, 4);
        graphics.endFill();

        this.container.addChild(graphics);
        this.container.addChild(set);
    }

    private renderCopyright(): void {
        let maxWidth = 332;
        let x = 223;
        let y = 941;
        if (this.oversized) {
            maxWidth = 182;
            x = 900 - 37;
            y = 1136;
        }

        const style = this.getStyle('copyright');
        if (this.variant && !this.oversized) {
            style.fill = '#ffffff';
        }

        let copyright = wrapStyledText(this.copyright, maxWidth, style);

        if (this.oversized) {
            copyright.pivot.x = copyright.width;
        }
        else {
            copyright.pivot.y = copyright.height;
        }

        copyright.position.set(x, y);
        this.container.addChild(copyright);
    }

    private renderLegal(): void {
        let maxWidth = 332;
        let x = 223;
        let y = 954;
        if (this.oversized) {
            maxWidth = 560;
            x = 37;
            y = 1136;
        }

        const legal = wrapStyledText(this.legal, maxWidth, this.getStyle('legal'));

        legal.position.set(x, y);
        this.container.addChild(legal);
    }

    public toString(): string {
        return `Card ${this.name}`;
    }
}
