"use strict";

import { Tab } from "../tabular";
import AboutTab from "./about";
import { DeckGeneratorTab } from "./deck-generator/";
import { HelpTab } from "./help/";
import { LiveEditorTab } from "./live-editor/";

/** Gets and creates a new list of Tabs for the GUI's Tabular */
export function getTabs(): Tab[] {
    return [
        new LiveEditorTab(),
        new DeckGeneratorTab(),
        new HelpTab(),
        new AboutTab(),
    ];
}
