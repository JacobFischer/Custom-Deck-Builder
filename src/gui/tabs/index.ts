import { Tab } from "../tabular";
import AboutTab from "./about";
import { DeckGeneratorTab } from "./deck-generator/";
import { HelpTab } from "./help/";
import { LiveEditorTab } from "./live-editor/";

/**
 * Gets and creates a new list of Tabs for the GUI's Tabular
 * @returns the array of freshly constructed tabs to use in the tabular
 */
export function getTabs(): Tab[] {
    return [
        new LiveEditorTab(),
        new DeckGeneratorTab(),
        new HelpTab(),
        new AboutTab(),
    ];
}
