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
    private tabsContents: HTMLElement;
    private tabToContent = new Map<Tab, HTMLElement>();
    private tabToListElement = new Map<Tab, HTMLLIElement>();
    private timeouts = new Set<NodeJS.Timer>();

    public tabs: Tab[];
    public currentTab: Tab;

    static EventSymbols = {
        tabChanged: Symbol('tabChanged'),
    };

    constructor(tabs?: Tab[], parent?: HTMLElement) {
        super();

        this.element = <HTMLElement>tabularTemplate();
        this.tabsList = <HTMLUListElement>this.element.getElementsByTagName('ul')[0];
        this.tabsContents = <HTMLElement>this.element.getElementsByClassName('tabular-contents')[0];

        if (tabs) {
            this.setTabs(tabs);
        }

        if (parent) {
            this.setParent(parent);
        }
    }

    public setTabs(tabs: Tab[], startingTab?: Tab) {
        this.tabs = tabs;

        for (const tab of tabs) {
            const li = document.createElement('li');
            li.innerHTML = tab.name;
            li.addEventListener('click', () => this.changeTab(tab));
            this.tabsList.appendChild(li);
            this.tabToListElement.set(tab, li);

            const div = document.createElement('div');
            div.classList.add('tab-contents');
            div.appendChild(tab.element);
            this.tabsContents.appendChild(div);
            this.tabToContent.set(tab, div);
        }

        this.changeTab(startingTab || tabs[0]);
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

        const oldTab = this.currentTab;
        this.currentTab = toTab;

        // update <li>s
        if (oldTab) {
            this.tabToListElement.get(oldTab).classList.remove('current');
        }
        this.tabToListElement.get(this.currentTab).classList.add('current');

        // crossfade content <div>s
        const newContent = this.tabToContent.get(this.currentTab);
        const oldContent = this.tabToContent.get(oldTab);

        if (!oldTab) {
            newContent.classList.add('current');
            newContent.classList.remove('hidden');
            this.hideTabs();
        }
        else {
            this.tabsContents.style.height = `${oldContent.clientHeight}px`;
            oldContent.classList.remove('current');
            newContent.classList.remove('hidden');

            this.clearTimeouts();
            this.setTimeout(() => {
                // we must do this so it shows up before the old tab while animating below
                newContent.remove();
                this.tabsContents.insertBefore(newContent, this.tabsContents.firstChild);

                this.setTimeout(() => {
                    oldContent.classList.add('hidden');
                    newContent.classList.add('current');

                    this.tabsContents.style.height = `${newContent.clientHeight}px`;
                    this.setTimeout(() => {
                        this.tabsContents.style.height = '';
                        this.hideTabs();
                    }, 355);
                }, 50);    // delay for DOM to update (MSDN says this shouldn't be needed...)
            }, 355);     // this number is from the SCSS transition (3.5 sec)
                         //  file. I can't think of an elegant way that doesn't
                         //  piss off VSC to parse this out of SCSS

            // Note: we could add event listeners for 'transitionend', however
            // then we'd have to cancel them if they click too fast, and it
            // could trigger on the wrong transition, so that's not as reliable
            // as old school setTimeouts
        }

        this.emit(Tabular.EventSymbols.tabChanged, toTab);
    }

    private hideTabs() {
        this.tabToContent.get(this.currentTab).classList.remove('hidden');
        this.tabToListElement.get(this.currentTab).classList.add('current');

        for (const tab of this.tabs) {
            if (tab !== this.currentTab) {
                this.tabToContent.get(tab).classList.add('hidden');
            }
        }
    }

    private setTimeout(callback: () => void, time: number): void {
        const timer = setTimeout(() => {
            this.timeouts.delete(timer);
            callback();
        }, time);

        this.timeouts.add(timer);
    }

    private clearTimeouts(): void {
        for (const timer of this.timeouts) {
            clearTimeout(timer);
        }

        this.timeouts.clear();
    }
}
