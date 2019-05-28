const { persistMarkup, persistCSS, persistAssets } = require('./utils/persist');

const Blog = require('./pages/blog');
const Dashboard = require('./pages/dashboard');
const BlogPost = require('./pages/blog-post');
const NotFound = require('./pages/404');

async function init(content) {
  // Netlify throws EEXIST if this is not done first for some reason.
  await persistAssets();
  const operations = [
    persistMarkup('./public/index.html', Dashboard(content)),
    persistMarkup('./public/blog.html', Blog(content)),
    persistMarkup('./public/404.html', NotFound(content)),
    persistCSS('./public/style.css'),
    ...content.posts.map(post =>
      persistMarkup(`./public/blog/${post.fields.slug}.html`, BlogPost(post))
    ),
  ];

  return Promise.all(operations);
}

module.exports = init;
