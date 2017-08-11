import { EventEmitter } from "events";
import { select, template } from "src/utils/";
import Tab from "./tab";
import * as hbs from "./tabular.hbs";

const tabularTemplate = template(hbs as any);

/**
 * A simple GUI element that wraps sections and selects between them using Tabs
 */
export class Tabular extends EventEmitter {
    /** Symbols emitted when an event occurs in this Tabular */
    public static EventSymbols = {
        /** Emitted when a tab changed and starts the animation */
        tabChanging: Symbol("tabChanging"),

        /** Emitted when a tab changed and finished the animation */
        tabChanged: Symbol("tabChanged"),
    };

    /** All the tabs in this Tabular */
    public tabs: Tab[];

    /** The currently selected (displayed) tabs */
    public currentTab: Tab;

    /** The parent element of the Tabular (tabs and their contents) */
    private parent: HTMLElement;

    /** The element that contains this Tabular */
    private element: HTMLElement;

    /** The list of tabs, Clicking on an li changes the tab */
    private tabsList: HTMLUListElement;

    /** The container for the contents of the tabs */
    private tabsContents: HTMLElement;

    /** A mapping of a tab to its contents */
    private tabToContent: Map<Tab, HTMLElement> = new Map();

    /** A mapping of a tab to its list element (visual tab) */
    private tabToListElement: Map<Tab, HTMLLIElement> = new Map();

    /**
     * Set of timeouts waiting to happen to allow for animations (fading)
     * transitions
     */
    private timeouts: Set<NodeJS.Timer> = new Set();

    /**
     * Creates a new Tabular
     * @param tabs the tabs to set
     * @param parent the parent element to attach this tabular to
     */
    constructor(tabs?: Tab[], parent?: HTMLElement) {
        super();

        this.element = tabularTemplate() as HTMLElement;
        this.tabsList = select(this.element, "ul") as HTMLUListElement;
        this.tabsContents = select(this.element, ".tabular-contents");

        if (tabs) {
            this.setTabs(tabs);
        }

        if (parent) {
            this.setParent(parent);
        }
    }

    /**
     * Sets the tabs contained in this Tabular
     * @param tabs the array of tabs to use
     * @param startingTab the tab in the array of tabs to set to the current tab
     */
    public setTabs(tabs: Tab[], startingTab?: Tab): void {
        this.tabs = tabs;

        for (const tab of tabs) {
            const li = document.createElement("li");
            li.innerHTML = tab.name;
            li.addEventListener("click", () => this.changeTab(tab));
            this.tabsList.appendChild(li);
            this.tabToListElement.set(tab, li);

            const div = document.createElement("div");
            div.classList.add("tab-contents");
            div.appendChild(tab.element);
            this.tabsContents.appendChild(div);
            this.tabToContent.set(tab, div);
        }

        this.changeTab(startingTab || tabs[0]);
    }

    /**
     * Sets the parent HTMLElement of this Tabular
     * @param parent the parent element this will be appended to
     */
    public setParent(parent: HTMLElement): void {
        this.parent = parent;
        parent.appendChild(this.element);
    }

    /**
     * Gets a tab by its id
     * @param id the id of the tab to get
     * @returns the tab with the given ID, or undefined if not found
     */
    public getTabByID(id: string): Tab {
        return this.tabs.find((tab: Tab) => tab.id === id);
    }

    /**
     * Changes the Tabular to the given Tab
     * @param toTab the Tab to change into the current tab
     */
    public changeTab(toTab: Tab): void {
        const found = this.tabs.find((aTab: Tab) => aTab === toTab);
        if (!found) {
            throw new Error(`Cannot change to Tab ${toTab} because it is not a tab of ours.`);
        }

        const oldTab = this.currentTab;
        this.currentTab = toTab;

        // update <li>s
        if (oldTab) {
            this.tabToListElement.get(oldTab).classList.remove("current");
        }
        this.tabToListElement.get(this.currentTab).classList.add("current");

        // cross-fade content <div>s
        const newContent = this.tabToContent.get(this.currentTab);
        const oldContent = this.tabToContent.get(oldTab);

        if (!oldTab) {
            newContent.classList.add("current");
            newContent.classList.remove("hidden");
            this.hideTabs();
        }
        else {
            this.tabsContents.style.height = `${oldContent.clientHeight}px`;
            oldContent.classList.remove("current");
            newContent.classList.remove("hidden");

            this.clearTimeouts();
            this.setTimeout(() => {
                // we must do this so it shows up before the old tab while animating below
                newContent.remove();
                this.tabsContents.insertBefore(newContent, this.tabsContents.firstChild);

                this.setTimeout(() => {
                    oldContent.classList.add("hidden");
                    newContent.classList.add("current");

                    this.tabsContents.style.height = `${newContent.clientHeight}px`;
                    this.setTimeout(() => {
                        this.tabsContents.style.height = "";
                        this.hideTabs();

                        this.emit(Tabular.EventSymbols.tabChanged, toTab);
                    }, 355);
                }, 50);  // delay for DOM to update (MSDN says this shouldn't be needed...)
            }, 355);     // this number is from the SCSS transition (3.5 sec) file.
                         // I can't think of an elegant way that doesn't
                         // piss off VSC to parse this out of SCSS

            // Note: we could add event listeners for 'transitionend', however
            // then we'd have to cancel them if they click too fast, and it
            // could trigger on the wrong transition, so that's not as reliable
            // as old school setTimeouts
        }

        this.emit(Tabular.EventSymbols.tabChanging, toTab);
    }

    /**
     * Hides all tabs content except the current tab
     */
    private hideTabs(): void {
        this.tabToContent.get(this.currentTab).classList.remove("hidden");
        this.tabToListElement.get(this.currentTab).classList.add("current");

        for (const tab of this.tabs) {
            if (tab !== this.currentTab) {
                this.tabToContent.get(tab).classList.add("hidden");
            }
        }
    }

    /**
     * Does a callback after some time and stores it to cancel if need be
     * @param callback the callback to invoke after given time
     * @param time the time to timeout for (in ms)
     */
    private setTimeout(callback: () => void, time: number): void {
        const timer = setTimeout(() => {
            this.timeouts.delete(timer);
            callback();
        }, time);

        this.timeouts.add(timer);
    }

    /**
     * Clears and cancels all timeouts currently queued
     */
    private clearTimeouts(): void {
        for (const timer of this.timeouts) {
            clearTimeout(timer);
        }

        this.timeouts.clear();
    }
}
