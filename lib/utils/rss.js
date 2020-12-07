var builder = require('xmlbuilder');
const description = require('./general-description');

function generateRssFile(content) {
  const obj = {
    rss: {
      '@version': '2.0',
      channel: {
        title: 'autofagist.blog',
        link: process.env.PAGE_URL,
        description,
        language: 'en-us',
        ttl: '1440',
        item: content.posts.map(post => ({
          title: post.fields.title,
          description: post.fields.description,
          link: `${process.env.PAGE_URL}/blog/${post.fields.slug}.html`,
          pubDate: post.sys.createdAt,
        }))
      }
    }
  };
  return builder.create(obj).end({ pretty: true});
}

module.exports = { generateRssFile };
