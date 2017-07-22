import { Tab } from '../tabular';
import { LiveEditorTab } from './live-editor/';
import { DeckGeneratorTab } from './deck-generator/';
import { template } from 'src/utils';

class SimpleTab extends Tab {
    constructor(name: string, required?: any) {
        let element: HTMLElement;
        if (required) {
            element = <HTMLElement>template(required)();
        }
        else {
            element = document.createElement('h2');
            element.innerHTML = name;
        }

        super(name, element);
    }
}

export function getTabs(): Tab[] {
    return [
        new LiveEditorTab(),
        new DeckGeneratorTab(),
        new SimpleTab('Help', require('./help.hbs')),
        new SimpleTab('About'),
    ];
};
