require('dotenv').config();
const service = require('./lib/service.js');

async function init() {
  console.log('Building static site...');
  let build = require('./lib/build');
  const response = await service.getEntries();
  const posts = response.items;
  build({ posts });
}

init();
