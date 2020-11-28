const { readAndMinifyCssSync } = require('../utils/persist');
const { join } = require('path');

const inlineCSS = readAndMinifyCssSync(join(__dirname, '..', 'styles/inlined.css'));

function Link({ title, slug, level }) {
  return `<a href="${'../'.repeat(level)}${slug}.html">${title}</a>`;
}

module.exports = function Main({ content, level = 0, title, description }) {
  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
      <title>${title}</title>
      <!--<link rel="stylesheet" type="text/css" href="${'../'.repeat(level)}deferred.css">-->
      <link rel="shortcut icon" href="${'../'.repeat(level)}favicon.ico" />
      <meta name="Description" content="${description}">
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
      <style>${inlineCSS}</style>
      <body>
        <header>
          <content>
            <h1>>autofagist</h1>
            <input class="menu-btn" type="checkbox" id="menu-btn" />
            <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
            <ul>
              <li>${Link({ title: 'home', slug: 'index', level })}</li>
              <li>${Link({ title: 'blog', slug: 'blog', level })}</li>
            </ul>
          </content>
        </header>
        <main>${content}</main>
      </body>
    </html>
  `;
};
