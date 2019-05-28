require('dotenv').config();
const service = require('./lib/service.js');

async function init() {
  console.log('Building static site...');
  try {
    let build = require('./lib/build');
    const response = await service.getEntries();
    const posts = response.items;
    await build({ posts });
    console.log('Site successfully built');
  } catch (e) {
    console.error('Error while building site:', e);
  }
}

init();
