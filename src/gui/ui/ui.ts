import './ui.scss';
import { template, removeTags } from 'src/utils';
import { Tabular, Tab } from 'src/gui/tabular/';
import { getTabs } from 'src/gui/tabs/';

const uiTemplate = template(require('./ui.hbs'));

/**
 * The User Interface to interact with this custom card builder project
 */
export class UI {
    readonly parent: HTMLElement;
    private element: HTMLElement;
    private mainElement: HTMLElement;

    private tabular: Tabular;

    constructor(element: HTMLElement) {
        this.parent = element;
        this.element = <HTMLElement>uiTemplate();
        this.parent.appendChild(this.element);

        this.mainElement = <HTMLElement>this.element.getElementsByTagName('main')[0];

        // adds the user agent to the document for css styling per browser
        document.documentElement.setAttribute("data-browser", navigator.userAgent);
        document.title = removeTags(this.element.getElementsByTagName('h1')[0].innerHTML, ' - ');

        this.tabular = new Tabular();

        let changing = false;

        this.tabular.on(Tabular.EventSymbols.tabChanged, (tab: Tab) => {
            // update the browser's hash when the tab changes to feel like pages
            window.location.hash = tab.id;
        });

        const tabs = getTabs();
        let startingTab = tabs[0];
        // if there is a hash, make the starting tab the tab with that id
        if (window.location.hash) {
            startingTab = tabs.find((tab) => tab.id === window.location.hash.substr(1));
        }
        this.tabular.setTabs(tabs, startingTab);
        this.tabular.setParent(this.mainElement);
    }
}
