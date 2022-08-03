import { createFile, readFile } from './utils.js'
import { listTemplate } from './templates.js'

let comments = JSON.parse(readFile('./public/output.json'));

let template = readFile('template.html');

template = template.replace('%LIST%', listTemplate(comments));

createFile('./public/index.html', template);