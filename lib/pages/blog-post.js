const MainTemplate = require('../templates/main');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

function BlogPost(post) {
  const creationDate = new Date(post.fields.creationDate).toISOString().substring(0, 10);
  return `
    <div class="blog-post">
      <h1>${post.fields.title}</h1>
      <time>${creationDate}</time>
      <content>
        ${documentToHtmlString(post.fields.content)}
      </content>
    </div>
  `;
}

const render = post =>
  MainTemplate({
    title: post.fields.metaTitle,
    level: 1,
    content: BlogPost(post),
    description: post.fields.metaDescription,
  });

module.exports = render;
