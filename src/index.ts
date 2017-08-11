"use strict";

// css reset
import "normalize.css";
// the main style sheet
import "src/styles/style.scss";

import { UI } from "src/gui/ui";
import { initialize } from "src/initialize";

// initialize everything, then create the UI
initialize(() => new UI(document.body));
