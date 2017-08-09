'use strict';

import { replaceAll, surroundText, newSprite, wrapStyledText, autoSizeAndWrapStyledText, wrapStyledTextCharacters, loadTextures } from 'src/utils/';
import { getStyle } from './card-styles';

/** The maximum width (in pixels) that a card can be (oversized) */
export const CARD_MAX_WIDTH = 900;

/** The maximum height (in pixels) that a card can be (oversized) */
export const CARD_MAX_HEIGHT = 1200;

/**
 * @class represents a custom card
 */
export class Card {
    /** The PIXI.Container this card's render is in */
    private container: PIXI.Container;

    /** The current width in pixels of the rendered card */
    public pxWidth = CARD_MAX_WIDTH;

    /** The current height in pixels of the rendered card */
    public pxHeight = CARD_MAX_HEIGHT;

    /** The name of the card */
    public name: string = 'Card Name';

    /** The type of the card, used for background generation */
    public type: 'Equipment' | 'Hero' | 'Location' | 'Starter' | 'Super Power' | 'Villain' | 'Weakness' = 'Starter';

    /** If this card is a variant with black background text */
    public variant: boolean = false;

    /** If this card is oversized */
    public oversized: boolean = false;

    /** A string prefix to place in front of this card's type */
    public typePrefix: string = '';

    /** The number of VP this card is worth at the end of the game */
    public victoryPoints: '*' | number = 1;

    /** How much this card costs to buy */
    public cost: number = 1;

    /** The text on the card. You can use [b] and [i] to bold and italic text */
    public text: string = '';

    /** The url to the image to use for this card */
    public imageURL: string = '';

    /** The url to the image to use for its upper right logo */
    public logoURL: string = '';

    /** A scalar to apply to the logo's size */
    public logoScale: number = 1;

    /** The copyright text, A © is automatically placed in front of this text */
    public copyright: string = String(new Date().getFullYear());

    /** The legal disclaimer on the bottom of the card */
    public legal: string = '';

    /** The sub type of the card next to the type */
    public subtype: string = '';

    /** The name of the set this card is a part of */
    public set: string = '';

    /** The color of the name of this card's set */
    public setTextColor = '#cccccc';

    /** The background color of the rounded box behind the set text */
    public setBackgroundColor = '#333333';

    /**
     * The preferred starting text size number to start at when auto sizing the
     * text. If the number is too large it will be ignored and downscaled
     */
    public preferredTextSize: number = 0;

    /** A list of string to bold if they are encountered in the text */
    public alsoBold: string[] = [];

    /** If the corners of the card should be rounded */
    public roundCorners: boolean = true;

    /** Creates a card from so key/value object */
    constructor(args?: {[key: string]: any}) {
        if (args) {
            this.setFrom(args);
        }
    }

    /**
     * Sets this card's internal variables from a key/value object
     * @param args the args to set; so to set imageURL, set args.imageURL
     * */
    public setFrom(args: {[key: string]: any}) {
        args = Object.assign({}, args);
        args.victoryPoints = args.victoryPoints || args.vp || args.VP || args.vP || 0;

        for (let key in args) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                (<any>this)[key] = args[key];
            }
        }

        // special cases, we can take "Super Hero/Villain" as a type
        // (which is invalid) and make it the oversized version
        if (<any>this.type === 'Super Hero') {
            this.type = 'Hero';
            this.oversized = true;
        }
        else if (<any>this.type === 'Super Villain') {
            this.type = 'Villain';
            this.oversized = true;
        }

        if (this.oversized && !(this.type == 'Hero' || this.type === 'Villain')) {
            this.oversized = false;
        }

        if (this.oversized) {
            this.pxWidth = CARD_MAX_WIDTH;
            this.pxHeight = CARD_MAX_HEIGHT;
        }
        else {
            this.pxWidth = 750;
            this.pxHeight = 1050;
        }
    }

    /**
     * Formats the text, checking for keywords to bold or italic automatically
     * @returns the text now with bold and italic formatting tags inserted
     */
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

    /**
     * Gets the PIXI.TextStyle for a part of the card
     * @param part the part of the card to get the style for
     * @returns the style for that part of the card, if found
     */
    private getStyle(part: string): PIXI.TextStyle {
        return getStyle(this.type, part, this.oversized);
    }

    /**
     * Rendered the card asynchronously to a PIXI.Container
     * This method will load textures
     * @returns a promise that resolves to a rendered PIXI.Container with no
     *          parent
     */
    public render(): Promise<PIXI.Container> {
        return new Promise((resolve, reject) => {
            loadTextures([this.imageURL, this.logoURL], () => {
                this.renderSync();

                resolve(this.container);
            })
        });
    }

    /**
     * Renders a card synchronously, must be invoked after textures are already
     * loaded
     * @returns a PIXI.Container with no parent of the rendered card
     */
    public renderSync(): PIXI.Container {
        if (this.container) {
            this.container.removeChild(this.container);
        }

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

        const copyright = this.renderCopyright();
        const set = this.renderSet(copyright);
        this.renderLegal(set, copyright);

        this.renderRoundedCorners();

        return this.container;
    };

    /**
     * Renders the image part of the card
     */
    private renderImage(): void {
        if (!this.imageURL) {
            return;
        }

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
        const scale = Math.max(imageMaxWidth/backgroundBounds.width, imageMaxHeight/backgroundBounds.height);

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

    /**
     * Renders the background part of the card based on the card's type
     */
    private renderBackground(): void {
        if (!this.type) {
            return;
        }

        let backgroundType: string = this.type;
        if (this.variant || this.oversized) {
            if (this.type === 'Hero' || this.type === 'Villain') {
                backgroundType = `Super-${this.type}`;
            }
        }
        if (this.oversized) {
            backgroundType = `Oversized-${backgroundType}`;
        }

        let cardBackgroundSprite = newSprite(backgroundType.replace(' ', '-').toLowerCase(), this.container);

        if (this.variant && !this.oversized) {
            // draw a black box behind the text
            const graphics = new PIXI.Graphics();
            graphics.beginFill(0x000000); // black
            graphics.drawRect(0, 719, 750, 224);
            graphics.endFill();
            this.container.addChild(graphics);
        }
    }

    /**
     * Renders the logo part of the card
     */
    private renderLogo(): void {
        if (!this.logoURL) {
            return;
        }

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
            x = CARD_MAX_WIDTH - 40;
            y = 25;
        }

        bounds = logoSprite.getLocalBounds();
        logoSprite.scale.set(scale, scale);
        logoSprite.pivot.x = bounds.width;
        logoSprite.position.set(x, y);
    }

    /**
     * Renders the name part of the card
     */
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

    /**
     * Renders the type part of the card (text, not background)
     */
    private renderType(): void {
        if (this.oversized || this.type === 'Weakness') {
            return;
        }

        let text = this.type.toUpperCase();
        if (this.typePrefix) {
            text = `${this.typePrefix} ${text}`;
        }
        let cardTypeText = new PIXI.Text(text, this.getStyle('type'));
        cardTypeText.x = 45;
        cardTypeText.y = 666;

        cardTypeText.scale.y *= 0.75;
        cardTypeText.scale.x *= 0.96;
        cardTypeText.skew.x = -0.265;
        this.container.addChild(cardTypeText);
    }

    /**
     * Renders the sub type text part of the card
     */
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

    /**
     * Renders the cost part of the card
     */
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

    /**
     * Renders the victory points part of the card
     */
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

    /**
     * Renders the text part of the card
     */
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

        if (this.preferredTextSize > 0) {
            style.fontSize = this.preferredTextSize;
        }

        let textContainer = autoSizeAndWrapStyledText(formattedText, maxWidth - x*2, maxHeight, style, 1, collisions, this.oversized, this.oversized);

        textContainer.position.set(x, y);

        this.container.addChild(textContainer);
    }

    /**
     * Renders the set part of the card
     */
    private renderSet(copyright: PIXI.Container): PIXI.Container {
        if (!this.set) {
            return;
        }

        const style = this.getStyle('set');
        style.fill = this.setTextColor || '#ffffff';
        let set = new PIXI.Text(this.set.toUpperCase(), style);

        set.scale.y *= 0.75;
        set.pivot.set(set.width, set.height);
        if (this.oversized) {
            set.position.set(copyright.x - copyright.width - 16, 1171 - set.height);
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

        return set;
    }

    /**
     * Renders the copyright part of the card
     */
    private renderCopyright(): PIXI.Container {
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

        let copyright = wrapStyledText(`©${this.copyright}`, maxWidth, style);

        if (this.oversized) {
            copyright.pivot.x = copyright.width;
        }
        else {
            copyright.pivot.y = copyright.height;
        }

        copyright.position.set(x, y);
        this.container.addChild(copyright);
        return copyright;
    }

    /**
     * Renders the legal part of the card
     */
    private renderLegal(set: PIXI.Container, copyright: PIXI.Container): void {
        let maxWidth = 332;
        let x = 223;
        let y = 954;
        const style = this.getStyle('legal');
        let legal: PIXI.Container;
        if (this.oversized) {
            maxWidth = 824;
            x = 37;
            y = 1136;

            if (set) {
                maxWidth -= set.width + 16;
            }
            if (copyright) {
                maxWidth -= copyright.width + 16;
            }

            legal = autoSizeAndWrapStyledText(this.legal, maxWidth, Number(style.fontSize)*2, style, 0.25);
        }
        else {
            legal = wrapStyledText(this.legal, maxWidth, this.getStyle('legal'));
        }

        if (legal) {
            legal.position.set(x, y);
            this.container.addChild(legal);
        }
    }

    /**
     * Renders the rounded corners part of the card
     */
    private renderRoundedCorners(): void {
        if (!this.roundCorners) {
            return;
        }

        const borderRadius = this.oversized
            ? 45
            : 37;

        const bleedMask = new PIXI.Graphics();
        bleedMask.beginFill(0, 1)
        bleedMask.drawRoundedRect(0, 0, this.pxWidth, this.pxHeight, borderRadius);
        bleedMask.endFill();
        this.container.addChild(bleedMask);
        this.container.mask = bleedMask;
    }

    /**
     * A handy toString override that tells you this card's name
     */
    public toString(): string {
        return `Card ${this.name}`;
    }
}
