const MainTemplate = require('../templates/main');
const marked = require('marked');
const addSyntaxHighlight = require('../utils/syntax-highlight');

function BlogPost(post) {
  const creationDate = new Date(post.fields.creationDate)
    .toISOString()
    .substring(0, 10);
  const htmlContent = marked(post.fields.content);
  const highLighted = addSyntaxHighlight(htmlContent);

  return `
    <link rel="stylesheet" type="text/css" href="../syntax.css">
    <div class="blog-post">
      <h1>${post.fields.title}</h1>
      <time>${creationDate}</time>
      <content>
        ${highLighted}
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
