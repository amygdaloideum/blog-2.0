require('dotenv').config();
const service = require('./lib/service.js');

async function init() {
  let build = require('./lib/build');
  const response = await service.getEntries();
  const posts = response.items;
  build({ posts });
}

init();
