'use strict';

import { Tab } from '../tabular';
import { LiveEditorTab } from './live-editor/';
import { DeckGeneratorTab } from './deck-generator/';
import { HelpTab } from './help/';
import { template } from 'src/utils/dom';

/** A simple tab with a name and handlebars file, but no logic otherwise */
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

/** Gets and creates a new list of Tabs for the GUI's Tabular */
export function getTabs(): Tab[] {
    return [
        new LiveEditorTab(),
        new DeckGeneratorTab(),
        new HelpTab(),
        new SimpleTab('About'),
    ];
};
