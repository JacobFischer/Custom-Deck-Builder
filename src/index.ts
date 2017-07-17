"use strict";

import { initialize } from './initialize';
import { buildCards } from './card-builder';
import { csvData } from './data';
import { UI } from './ui';

initialize(() => {
    /*document.getElementById('submit').addEventListener('click', () => {
        const text = csvTest || document.getElementById('csv').innerText;

        parse(text);
    });

    parse(csvTest);*/

    //buildCards(csvData);
    new UI(document.body);
});
