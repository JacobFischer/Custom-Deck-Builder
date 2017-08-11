/** An option a card can have */
export interface ICardOption {
    name: string;
    type: "text" | "number" | "checkbox" | "url" | "color" | "text list";
    description: string;
}

/**
 * All the options we can realistically expect to be set in a deck's CSV
 * file.
 * Ordered by most important to least.
 */
export const CardOptionsList: ICardOption[] = [
    {
        name: "Name",
        type: "text",
        description: `The name of the card.`,
    },
    {
        name: "Type",
        type: "text",
        description: `The card type. Must be "Equipment", "Hero", "Location", `
                   + `"Starter", "Super Power", "Villain", or "Weakness". `
                   + `Alternatively "Super Hero" or "Super Villain" are `
                   + `shorthand for their oversized versions`,
    },
    {
        name: "Variant",
        type: "checkbox",
        description: `If enabled, the card's textbox will be black instead of `
                   + `white, such as for the Villain Stack. If the type is `
                   + `"Hero" or "Villain", then they also gain the special `
                   + `"Super Hero/Villain" subtype. This option has no effect `
                   + `on Oversized card`,
    },
    {
        name: "Oversized",
        type: "checkbox",
        description: `If enabled, the card becomes an oversized player card. `
                   + `This option is only valid for "Hero" and "Villain" types,`
                   + ` and Sub Type, Cost, and Victory Points are ignored.`,
    },
    {
        name: "Type Prefix",
        type: "text",
        description: `Some text to place in front of the card's type. `
                   + `Ignored on oversized cards.`,
    },
    {
        name: "Victory Points",
        type: "number",
        description: `The number of Victory Points this is worth at the end. `
                   + `Can be negative or "*". Ignored on Oversized cards.`,
    },
    {
        name: "Cost",
        type: "number",
        description: `How much this card costs. Ignored on Oversized cards.`,
    },
    {
        name: "Text",
        type: "text",
        description: `The card text describing what this card does. It will `
                   + `auto format in both font size and bold/italics. Words `
                   + `like "+2 Power", "Attack", and other common <abbr `
                   + `title="Cryptozoic Game Engine">CGE</abbr> terms will `
                   + `automatically be bolded or italics. To manually bold text`
                   + ` use [b]bold this[/b], and to italic use [i]italic `
                   + `this[/i]. Newlines can be used, and two sequential `
                   + `newlines indicate a break between sections of text.`,
    },
    {
        name: "Image URL",
        type: "url",
        description: `URL to the image for this card. We recommend using a site`
                   + ` like <a href="https://imgur.com/">imgur</a> to manage `
                   + `your images. The image will be automatically centered on `
                   + `the card. Normal cards will be 750px × 523px in size, and`
                   + ` Oversized ones will be 900px × 741px.`,
    },
    {
        name: "Logo URL",
        type: "url",
        description: `URL to the image for the logo in the top right of this `
                   + `card. For both sizes of cards the image will be rendered `
                   + `at 175px × 175px.`,
    },
    {
        name: "Logo Scale",
        type: "number",
        description: `A number between 0.00 to 1.00 that scales the logo down `
                   + `so it better fits on cards.`,
    },
    {
        name: "Copyright",
        type: "text",
        description: `The year and company the card is Copyright from. The © `
                   + `symbol is added automatically, and if this is omitted `
                   + `just the year will be displayed, e.g. `
                   + `"©${new Date().getFullYear()}".`,
    },
    {
        name: "Legal",
        type: "text",
        description: `The legal disclaimer at the bottom of the card. Often has`
                   + ` a set notation such as "(s01)".`,
    },
    {
        name: "Subtype",
        type: "text",
        description: `An additional type describing the card, such as its owner`
                   + ` in the Street Fighter Deck Building Game.`,
    },
    {
        name: "Set",
        type: "text",
        description: `The set this card is a part of.`,
    },
    {
        name: "Set Text Color",
        type: "color",
        description: `The hex color to use for the text on the set indicator.`,
    },
    {
        name: "Set Background Color",
        type: "color",
        description: `The hex color to use for the background rectangle for the`
                   + ` set indication.`,
    },
    {
        name: "Preferred Text Size",
        type: "number",
        description: `The text size to start at when fitting text on the card. `
                   + `Defaults to 38. <em>Note</em>: if the text does not fit `
                   + `at this size it will be downsized until it fits.`,
    },
    {
        name: "Also Bold",
        type: "text list",
        description: `List of words separated by commas and a space ", " of `
                   + `words to bold even if they lack bold tags ([b]word[/b]).`,
    },
    {
        name: "Round Corners",
        type: "checkbox",
        description: `If the corners should be rounded. By default disabled `
                   + `for the deck building tool, and enabled for the live `
                   + `editor.`,
    },
];

/**
 * All the options we can realistically expect to be set in a deck's CSV
 * file.
 * Indexed by the option's name (order is lost)
 */
export const CardOptions: {[key: string]: ICardOption} = {};

for (const cardOption of CardOptionsList) {
    CardOptions[cardOption.name] = cardOption;
}
