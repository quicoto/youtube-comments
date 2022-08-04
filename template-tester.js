import { createFile, readFile } from './utils.js'
import { listTemplate } from './templates.js'

let comments = JSON.parse(readFile('./public/output.json'));

let template = readFile('template.html');

let lists = '';

lists += listTemplate({ "title": 'My video title', "id": "123"}, comments);
lists += listTemplate({ "title": 'Another video', "id": "456"}, comments);

template = template.replace('%LIST%', lists);

createFile('./public/index.html', template);