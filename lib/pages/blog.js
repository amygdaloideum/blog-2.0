const MainTemplate = require('../templates/main');
const generalDescription = require('../utils/general-description');
const groupPostsByTags = require('../utils/group-posts-by-tags');

function Blog(posts = []) {
  const groups = groupPostsByTags(posts);
  return `
    <div>
      <side>
        ${groups.map(
          group => `
          <h3>${group.name}</h3>
          <ul>
            ${group.posts.map(
              post => `
              <li>
                <a href="blog/${post.fields.slug}.html">${post.fields.title}</a>
              </li>
            `
            ).join('')}
          </ul>
        `
        ).join('')}
      </side>
    </div>
  `;
}

const render = content =>
  MainTemplate({
    title: 'BLOG - AUTOFAGIST',
    content: Blog(content.posts),
    description: generalDescription,
  });

module.exports = render;
