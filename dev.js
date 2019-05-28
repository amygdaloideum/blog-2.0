require('dotenv').config();
const chokidar = require('chokidar');
const clearModule = require('clear-module');
const service = require('./lib/service.js');

async function init() {
  let build = require('./lib/make-site');
  const response = await service.getEntries();
  const posts = response.items;
  build({ posts });
  const watcher = chokidar
    .watch('.', { ignoreInitial: true, ignored: 'public' })
    .on('all', (event, path) => {
      clearModule.all();
      let build = require('./lib/make-site');
      console.info('rebuilding...');
      build({ posts });
    });
  watcher
    .on('add', path => console.log(`File ${path} has been added`))
    .on('change', path => console.log(`File ${path} has been changed`))
    .on('unlink', path => console.log(`File ${path} has been removed`));
}

init();
