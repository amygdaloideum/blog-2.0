const MainTemplate = require('../templates/main');
const generalDescription = require('../utils/general-description');
const groupPostsByTags = require('../utils/group-posts-by-tags');

function Dashboard(posts = []) {
  const groups = groupPostsByTags(posts);
  return `
    <section>
      <h2>Hello</h2>
      <p>
        I am a facet of a self-refining digestive system, currently encompassing the entirety of planet Tellus.
      </p>
      <p>
        I compile collections of phonetic symbols to increase the total digestive capacity and power aggregation of life.
      </p>
      <p>
        I traverse the energyscape by means of a deterministic decision-making engine that maps some patterns of cosmic signals to a coherent hallucinogenic construct.
      </p>
      <p>
        Meet me in your dreams; I'll be waiting by the western gate.
      </p>
    </section>
    <section>
      <h2>Posts</h2>
      <side>
        ${groups
          .map(
            (group) => `
          <h3>${group.name}</h3>
          <ul class="post-list">
            ${group.posts
              .map(
                (post) => `
              <a href="blog/${post.fields.slug}.html">
                <li>
                  <h4>${post.fields.title}</h4>
                  <p>${post.fields.description}</p>
                </li>
              </a>
            `
              )
              .join('')}
          </ul>
        `
          )
          .join('')}
      </side>
    </section>
  `;
}

const render = (content) =>
  MainTemplate({
    title: 'AUTOFAGIST',
    content: Dashboard(content.posts),
    description: generalDescription,
  });

module.exports = render;
