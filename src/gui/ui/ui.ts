import './ui.scss';
import { template, removeTags } from 'src/utils/';
import { Tabular, Tab } from 'src/gui/tabular/';
import { getTabs } from 'src/gui/tabs/';

const uiTemplate = template(require('./ui.hbs'));

/**
 * The User Interface to interact with this custom card builder project
 */
export class UI {
    /** The parent element of the UI (probably the body of the document) */
    readonly parent: HTMLElement;

    /** The element containing the UI */
    private element: HTMLElement;

    /** The <main> element not the wrapper */
    private mainElement: HTMLElement;

    /** The tabular that controls each section of the UI */
    private tabular: Tabular;

    /** The main title of the UI */
    readonly title = 'Cryptozoic Game Engine';

    /** The subtitle to be placed below the UI */
    readonly subtitle = 'Custom Deck Builder';

    /**
     * Create the UI. Only one probably should exist per page
     * @param element the parent element to place the UI in, probably the <body>
     */
    constructor(element: HTMLElement) {
        this.parent = element;
        this.element = <HTMLElement>uiTemplate(this);
        this.parent.appendChild(this.element);

        this.mainElement = <HTMLElement>this.element.getElementsByTagName('main')[0];

        // add the user agent to the document for css styling per browser
        document.documentElement.setAttribute("data-browser", navigator.userAgent);

        // set the title to the title of the UI
        document.title = 'Cryptozoic Game Engine - Custom Card builder';

        // add the favicon
        const faviconLink = document.createElement('link');
        faviconLink.href = require('../../../resources/images/favicon.png');
        faviconLink.rel = 'icon';
        faviconLink.type = 'image/png';
        document.head.appendChild(faviconLink);

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
