const MainTemplate = require('../templates/main');
const marked = require('marked');
const addSyntaxHighlight = require('../utils/syntax-highlight');

async function BlogPost(post) {
  const creationDate = new Date(post.fields.creationDate)
    .toISOString()
    .substring(0, 10);
  const htmlContent = marked(post.fields.content);
  const highLighted = await addSyntaxHighlight(htmlContent);

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

const render = async post =>
  MainTemplate({
    title: post.fields.metaTitle,
    level: 1,
    content: await BlogPost(post),
    description: post.fields.metaDescription,
  });

module.exports = render;
