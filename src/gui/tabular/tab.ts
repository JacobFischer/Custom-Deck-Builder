import { toDashCase } from "src/utils/";

/**
 * The basics of a Tab for a Tabular.
 * If you make a custom Tab it must extend this class
 */
export default class Tab {
    /** The id of the tab. Will be the-dash-case version of its name */
    public readonly id: string;

    /**
     * Creates a named Tab
     * @param name the name of the tab
     * @param element the parent element for the content of the tab
     */
    constructor(
        /** The name of the tab to display on the tab and use for ID */
        readonly name: string,

        /** The element that makes up the section to toggle between */
        readonly element: HTMLElement,
    ) {
        this.id = toDashCase(this.name);
    }
}
