import {JSDOM} from "jsdom";

const document = (new JSDOM(`<body></body>`)).window;
global.document = document;
// map
const map = global.document.createElement(`div`);
map.setAttribute(`id`, `map`);
global.document.body.appendChild(map);
