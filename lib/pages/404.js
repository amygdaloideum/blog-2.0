const MainTemplate = require('../templates/main');
const generalDescription = require('../utils/general-description');

function NotFound() {
  return `
    <section>
      <h1>404 - Not Found</h1>
      <p>The page you were trying to access <i>does not exist</i>. It might have been <i>moved or removed</i>. It might <i>never have existed in the first place</i>.</p>
    </section>
  `;
}

const render = content =>
  MainTemplate({
    title: '404 - AUTOFAGIST',
    content: NotFound(),
    description: generalDescription,
  });

module.exports = render;
