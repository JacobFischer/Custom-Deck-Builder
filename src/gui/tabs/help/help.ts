import './help.scss';
import { Tab } from 'src/gui/tabular/';
import { EditableTable, ColumnData, RowData } from 'src/gui/table';
import { CardOptionsList } from 'src/cards/card/card-options';
import { template } from 'src/utils/dom';

const tabTemplate = template(require('./help.hbs'));

const typeTitles: {[key: string]: string} = {
    text: 'Normal alphanumeric text.',
    number: 'A number, no text.',
    checkbox: 'If the cell is empty that counts as unchecked (false). Any other value, such as "X" indicate that cell is checked.',
    url: 'Text that is a valid URL to an image',
    color: 'A hexadecimal color in the format #FF0000 (red)',
    'text list': 'A list of words or text items. Indicate a new text in the list via a comma and space ", ". E.g. "Some Card Name, Some Special Term, Bold This too"',
};

/** The help tab that shows a list of card options from the CardOptionsList */
export class HelpTab extends Tab {
    /** The table that shows what the card options are */
    private cardOptionsTable: EditableTable;

    /** Creates a Help Tab for a Tabular */
    constructor() {
        super('Help', <HTMLElement>tabTemplate());

        const columns: ColumnData[] = [
            {
                name: 'Column Name',
                id: 'name',
                notEditable: true,
            },
            {
                name: 'Type',
                id: 'type',
                notEditable: true,
            },
            {
                name: 'Description',
                id: 'description',
                notEditable: true,
            }
        ];

        this.cardOptionsTable = new EditableTable(this.element.getElementsByClassName('card-options')[0], columns, CardOptionsList);

        for (const td of this.element.getElementsByTagName('td')) {
            const title = typeTitles[td.innerHTML];

            if (title) {
                td.title = title;
            }
        }
    }
}
