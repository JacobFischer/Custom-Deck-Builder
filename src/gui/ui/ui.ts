import { getTabs } from "src/gui/tabs/";
import { Tab, Tabular } from "src/gui/tabular/";
import { select, template } from "src/utils/";
import * as hbs from "./ui.hbs";
import "./ui.scss";

const uiTemplate = template(hbs as any);

/**
 * The User Interface to interact with this custom card builder project
 */
export class UI {
    /** The main title of the UI */
    public readonly title: string = "Cryptozoic Game Engine";

    /** The subtitle to be placed below the UI */
    public readonly subtitle: string = "Custom Deck Builder";

    /** The parent element of the UI (probably the body of the document) */
    public readonly parent: HTMLElement;

    /** The element containing the UI */
    private element: HTMLElement;

    /** The <main> element not the wrapper */
    private mainElement: HTMLElement;

    /** The tabular that controls each section of the UI */
    private tabular: Tabular;

    /** If the tabs are transitioning */
    private tabsChanging: boolean = true;

    /**
     * Create the UI. Only one probably should exist per page
     * @param element the parent element to place the UI in, probably the <body>
     */
    constructor(element: HTMLElement) {
        this.parent = element;
        this.element = uiTemplate(this) as HTMLElement;
        this.parent.appendChild(this.element);

        this.mainElement = select(this.element, "main");

        // add the user agent to the document for css styling per browser
        document.documentElement.setAttribute("data-browser", navigator.userAgent);

        // set the title to the title of the UI
        document.title = `${this.title} - ${this.subtitle}`;

        // add the favicon
        const faviconLink = document.createElement("link");
        faviconLink.href = require("../../../resources/images/favicon.png");
        faviconLink.rel = "icon";
        faviconLink.type = "image/png";
        document.head.appendChild(faviconLink);

        this.tabular = new Tabular();

        this.tabular.on(Tabular.EventSymbols.tabChanging, (tab: Tab) => {
            // update the browser's hash when the tab changes to feel like pages
            this.tabsChanging = true;
            window.location.hash = tab.id;
        });

        this.tabular.on(Tabular.EventSymbols.tabChanged, (tab: Tab) => {
            this.tabsChanging = false; // it's done
        });

        const tabs = getTabs();
        let startingTab = tabs[0];
        // if there is a hash, make the starting tab the tab with that id
        if (window.location.hash) {
            startingTab = tabs.find((tab) => tab.id === window.location.hash.substr(1));
        }
        this.tabular.setTabs(tabs, startingTab);
        this.tabular.setParent(this.mainElement);

        this.tabsChanging = false;
        (document.body as any).onhashchange = () => {
            if (this.tabsChanging) {
                return; // ignore, it's a natural tab change
            }
            // else they clicked a hash and we need to change the tab

            // get the hash without the #
            const hash = window.location.hash.substr(1);
            // and get the tab for that hash
            const tab = this.tabular.getTabByID(hash);

            if (tab) {
                this.tabular.changeTab(tab);
            }
        };
    }
}
