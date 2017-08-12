import { Tab } from "src/gui/tabular/";
import * as entireReadme from "../../../README.md";

/**
 *  Acts as a basic tab that displays [part] of the project's README.md file
 * as a tab
 */
export default class AboutTab extends Tab {
    /** Creates the AboutTab from the readme */
    constructor() {
        const container = document.createElement("div");
        super("About", container);

        const readme = String(entireReadme as any);
        // cutoff everything after the horizontal line, as that's readme
        // specific stuff for building the project
        container.innerHTML = readme.substr(0, readme.indexOf("<hr"));

        // remove the <h1> element(s) that should be the page title
        for (const h1 of container.getElementsByTagName("h1")) {
            h1.remove();
        }
    }
}
