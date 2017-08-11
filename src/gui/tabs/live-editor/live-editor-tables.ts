/** The tables present by default in the LiveEditorTab */

import { CardOptions } from "src/cards/card/card-options";
import { IColumnData, IRowData, IRowValues, RowValue } from "src/gui/table";
import { stripTagsFromString } from "src/utils/";

function addTitlesTo(columns: IColumnData[]): void {
    for (const column of columns) {
        let name: string = column.name;

        if (name === "Delete") {
            continue; // skip, special column we add that is not a normal option
        }

        if (name === "VP") {
            name = "Victory Points";
        }

        column.rowsTitle = stripTagsFromString(CardOptions[name].description);
    }
}

const deleteButton = document.createElement("button");
deleteButton.innerHTML = "&#x2716;";
deleteButton.setAttribute("title", "Delete this row");

/** the headings for the cards defaults table on the LiveEditorTable */
export const defaultsHeadings: IColumnData[] = [
    {
        name: "Name",
        notEditable: true,
    },
    {
        name: "Set",
    },
    {
        name: "Set Text Color",
        color: true,
    },
    {
        name: "Set Background Color",
        color: true,
    },
    {
        name: "Copyright",
    },
    {
        name: "Legal",
        longText: true,
    },
    {
        name: "Logo URL",
    },
    {
        name: "Logo Scale",
        type: "number",
        inputAttributes: {
            min: 0.010,
            max: 2,
            step: 0.001,
        },
    },
];

addTitlesTo(defaultsHeadings);

/** the rows for the cards defaults table on the LiveEditorTable */
export const defaultsRows: IRowValues[] = [
    {
        name: "__defaults__",
        logoURL: "https://i.imgur.com/J6SuXcE.png",
        set: "Teen Titans",
        setTextColor: "#ffec34",
        setBackgroundColor: "#ed1c24",
        copyright: "2015 CZE",
        legal: "TEEN TITANS and all related character and elements are trademarks and © DC Comics\n(s15)",
        logoScale: 0.975,
    },
    /*{
        name: '__oversized_defaults__',
        logoScale: 0.975,
        setTextColor: '#ffec34',
        setBackgroundColor: '#ed1c24',
    },*/
];

/** the headings for the custom cards table on the LiveEditorTable */
export const cardsHeadings: IColumnData[] = [
    {
        name: "Name",
    },
    {
        name: "Type",
        allowedValues: ["Equipment", "Hero", "Location", "Starter", "Super Power", "Villain", "Weakness"],
    },
    {
        name: "Text",
        longText: true,
    },
    {
        name: "Cost",
        type: "number",
    },
    {
        name: "VP",
        id: "victoryPoints",
        type: "number",
    },
    {
        name: "Subtype",
    },
    {
        name: "Variant",
        type: "boolean",
    },
    {
        name: "Oversized",
        type: "boolean",
        transform: (checked: RowValue, row: IRowData) => {
            if (checked && row.values.type !== "Hero" && row.values.type !== "Villain") {
                return false;
            }
            return checked;
        },
    },
    {
        name: "Image URL",
    },
    {
        name: "Delete",
        type: "node",
        defaultValue: deleteButton,
    },
];

addTitlesTo(cardsHeadings);

/** the rows for the custom cards table on the LiveEditorTable */
export const cardsRows: IRowValues[] = [
    {
        name: "Vulnerability",
        type: "Starter",
        text: "",
        imageURL: "https://i.imgur.com/em2ZPJG.png",
        vp: 0,
        cost: 0,
    },
    {
        name: "Wonder Girl",
        type: "Hero",
        oversized: true,
        imageURL: "https://i.imgur.com/RjNwCAX.png",
        text: "Once during each of your turns, if you control two or more "
            + "Equipment, draw two cards and then discard a card.",
    },
];
