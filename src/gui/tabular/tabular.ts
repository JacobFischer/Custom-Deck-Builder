import { template, loadTextures, tryToCast, cloneExceptEmpty, toDashCase } from 'src/utils';
import { EventEmitter } from 'events';

const tabularTemplate = template(require('./tabular.hbs'));

export abstract class Tab {
    readonly id: string;
    constructor(
        readonly name: string,
        readonly element: HTMLElement,
    ) {
        this.id = toDashCase(this.name);
    }
}

export class Tabular extends EventEmitter {
    private parent: HTMLElement;
    private element: HTMLElement;
    private tabsList: HTMLUListElement;
    public tabs: Tab[];
    private tabToContent = new Map<Tab, HTMLElement>();

    static EventSymbols = {
        tabChanged: Symbol('tabChanged'),
    };

    constructor(tabs?: Tab[], parent?: HTMLElement) {
        super();

        this.element = <HTMLElement>tabularTemplate();
        this.tabsList = <HTMLUListElement>this.element.getElementsByTagName('ul')[0];

        if (tabs) {
            this.setTabs(tabs);
        }

        if (parent) {
            this.setParent(parent);
        }
    }

    public setTabs(tabs: Tab[]) {
        this.tabs = tabs;

        const tabsContents = <HTMLElement>this.element.getElementsByClassName('tabular-contents')[0];
        for (const tab of tabs) {
            const li = document.createElement('li');
            li.innerHTML = tab.name;
            li.addEventListener('click', () => this.changeTab(tab));
            this.tabsList.appendChild(li);

            const div = document.createElement('div');
            div.classList.add('tab-contents');
            div.appendChild(tab.element);
            tabsContents.appendChild(div);
            this.tabToContent.set(tab, div);
        }

        this.changeTab(tabs[0]);
    }

    public setParent(parent: HTMLElement): void {
        this.parent = parent;
        parent.appendChild(this.element);
    }

    public getTabByID(id: string) {
        return this.tabs.find((tab: Tab) => tab.id === id);
    }

    public changeTab(toTab: Tab): void {
        const found = this.tabs.find((aTab: Tab) => aTab === toTab);
        if (!found) {
            throw new Error(`Cannot change to Tab ${toTab} because it is not a tab of ours.`);
        }

        for (let i = 0; i < this.tabs.length; i++) {
            const tab = this.tabs[i];
            const li = <HTMLLIElement>this.tabsList.getElementsByTagName('li')[i];
            const contents = this.tabToContent.get(tab);

            if (tab === toTab) {
                li.classList.add('current');
                contents.classList.add('current');
            }
            else {
                li.classList.remove('current');
                contents.classList.remove('current');
            }
        }

        this.emit(Tabular.EventSymbols.tabChanged, toTab);
    }
}
