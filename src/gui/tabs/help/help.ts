import './help.scss';
import { Tab } from 'src/gui/tabular/';
import { template } from 'src/utils';

const tabTemplate = template(require('./help.hbs'));

const typeTitles: {[key: string]: string} = {
    text: 'Normal alphanumeric text.',
    number: 'A number, no text.',
    checkbox: 'If the cell is empty that counts as unchecked (false). Any other value, such as "X" indicate that cell is checked.',
    url: 'Text that is a valid URL to an image',
    color: 'A hexadecimal color in the format #FF0000 (red)',
    'text list': 'A list of words or text items. Indicate a new text in the list via a comma and space ", "',
};

export class HelpTab extends Tab {
    constructor() {
        super('Help', <HTMLElement>tabTemplate());

        for (const td of this.element.getElementsByTagName('td')) {
            const title = typeTitles[td.innerHTML];

            if (title) {
                td.title = title;
            }
        }
    }
}
