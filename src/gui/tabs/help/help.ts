import { CardOptionsList } from "src/cards/card/card-options";
import { EditableTable, IColumnData } from "src/gui/table";
import { Tab } from "src/gui/tabular/";
import { removeTags, select, template } from "src/utils";
import * as hbs from "./help.hbs";
import "./help.scss";

const tabTemplate = template(hbs as any);

const typeTitles: {[key: string]: string} = {
    "text": "Normal alphanumeric text.",
    "number": "A number, no text.",
    "checkbox": `If the cell is empty that counts as unchecked (false). `
              + `Any other value, such as "X" indicate that cell is checked.`,
    "url": "Text that is a valid URL to an image",
    "color": "A hexadecimal color in the format #FF0000 (red)",
    "text list": `A list of words or text items. Indicate a new text in the `
               + `list via a comma and space ", ". E.g. "Some Card Name, Some `
               + `Special Term, Bold This too"`,
};

/** The help tab that shows a list of card options from the CardOptionsList */
export class HelpTab extends Tab {
    /** The table that shows what the card options are */
    private cardOptionsTable: EditableTable;

    /** Creates a Help Tab for a Tabular */
    constructor() {
        super("Help", tabTemplate() as HTMLElement);

        const columns: IColumnData[] = [
            {
                name: "Column Name",
                id: "name",
                notEditable: true,
            },
            {
                name: "Type",
                id: "type",
                notEditable: true,
            },
            {
                name: "Description",
                id: "description",
                notEditable: true,
            },
        ];

        this.cardOptionsTable = new EditableTable(select(this.element, ".card-options"), columns, CardOptionsList);

        for (const td of this.element.getElementsByTagName("td")) {
            const title = typeTitles[removeTags(td.innerHTML)];

            // if a title was found (it's the 'type' <td>), then add the title
            // based on it's type as found in the html above
            if (title) {
                td.title = title;
            }
        }
    }
}
