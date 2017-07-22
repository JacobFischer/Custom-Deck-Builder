import { template, loadTextures, tryToCast, cloneExceptEmpty } from '../../utils';

const tabularTemplate = template(require('./tabular.hbs'));

export const TabularEventSymbols = {
    tabChanged: Symbol('tabChanged'),
};

export abstract class Tab {
    constructor(
        readonly name: string,
        readonly element: HTMLElement,
    ) {}
}

export class Tabular {
    private parent: HTMLElement;
    private element: HTMLElement;
    private tabsList: HTMLUListElement;
    readonly tabs: Tab[];
    private tabToContent = new Map<Tab, HTMLElement>();

    constructor(tabs: Tab[], parent?: HTMLElement) {
        this.element = <HTMLElement>tabularTemplate();
        this.tabsList = <HTMLUListElement>this.element.getElementsByTagName('ul')[0];
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

        this.changeTab(tabs[1]);

        if (parent) {
            this.setParent(parent);
        }
    }

    public setParent(parent: HTMLElement): void {
        this.parent = parent;
        parent.appendChild(this.element);
    }

    public changeTab(toTab: Tab): void {
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
    }
}
