"use strict";

import * as _ from 'lodash';

import { ANSWER } from './modules/constants';
import SmartClass from './modules/functions';
import * as lib from './modules/lib';


let words: string[] = ['hello', 'world'];
words.forEach(word => console.log(word));

console.log('here are some number: ');
[1, 2, 3].map(n => n ** 2).forEach(console.log)


console.log(`but we only trust this one: ${ANSWER}`);


console.log('et voilà!');

let instance: SmartClass = new SmartClass();
instance.doSomethingSmart();

var t = new lib.OtherClass();