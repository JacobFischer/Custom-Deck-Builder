"use strict";

// css reset
import 'normalize.css';
// the main style sheet
import 'src/styles/style.scss';

import { initialize } from 'src/initialize';
import { UI } from 'src/gui/ui';

// initialize everything, then create the UI
initialize(() => new UI(document.body));
