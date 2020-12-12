require('dotenv').config();
require('colors');
const service = require('../lib/service.js');
const build = require('../lib/make-site');

async function init() {
  console.log('Initiating static site build...'.magenta);
  try {
    console.log('Fetching posts...'.magenta);
    const response = await service.getEntries();
    const posts = response.items;
    console.log('Posts successfully fetched.\n'.magenta);
    console.log('The following posts were fetched:'.bgMagenta.black);
    console.log('\n');
    posts.forEach((post) =>
      console.log(`- ${post.fields.title}`.bgYellow.black)
    );
    await build({ posts });
    console.log('\nSite successfully built'.green);
  } catch (e) {
    console.error('Error while building site:'.red, e);
  }
}

init();
