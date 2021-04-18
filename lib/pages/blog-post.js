const templates = require('../templates');
const marked = require('marked');
const processHtml = require('../utils/process-html');

async function BlogPost(post) {
  const creationDate = new Date(post.fields.creationDate)
    .toISOString()
    .substring(0, 10);
  const htmlContent = marked(post.fields.content);
  const highLighted = await processHtml(htmlContent);

  return `
    <link rel="stylesheet" type="text/css" href="../syntax.css">
    <div class="blog-post">
      <time>${creationDate}</time>
      <h1>${post.fields.title}</h1>
      ${highLighted}
    </div>
  `;
}

const render = async post => {
  const Template = templates[post.fields.templateId] || templates.main;
  return Template({
    title: post.fields.metaTitle,
    level: 1,
    content: await BlogPost(post),
    description: post.fields.metaDescription,
  });
};
module.exports = render;
