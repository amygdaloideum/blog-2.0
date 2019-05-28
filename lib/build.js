const { persistMarkup, persistCSS, persistAssets } = require('./utils/persist');

const Blog = require('./pages/blog');
const Dashboard = require('./pages/dashboard');
const BlogPost = require('./pages/blog-post');
const NotFound = require('./pages/404');

async function init(content) {
  persistMarkup('./public/index.html', Dashboard(content));
  persistMarkup('./public/blog.html', Blog(content));
  persistMarkup('./public/404.html', NotFound(content));

  content.posts.forEach(post => {
    persistMarkup(`./public/blog/${post.fields.slug}.html`, BlogPost(post));
  });

  persistCSS('./public/style.css');
  persistAssets();
}

module.exports = init;
