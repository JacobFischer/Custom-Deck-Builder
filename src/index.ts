"use strict";

import 'src/styles/style.scss';

import { initialize } from 'src/initialize';
import { UI } from 'src/gui/ui';

initialize(() => new UI(document.body));
