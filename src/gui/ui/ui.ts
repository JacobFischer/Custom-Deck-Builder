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
        (<any>document.body).onhashchange = () => {
            if (changing) {
                return;
            }

            const hash = window.location.hash.substr(1); // get the hash without the #

            const tab = this.tabular.getTabByID(hash);
            if (tab) {
                changing = true;
                this.tabular.changeTab(tab);
                changing = false;
            }
        };

        this.tabular.on(Tabular.EventSymbols.tabChanged, (tab: Tab) => {
            window.location.hash = tab.id;
        });

        this.tabular.setTabs(getTabs());
        this.tabular.setParent(this.mainElement);
    }
}
