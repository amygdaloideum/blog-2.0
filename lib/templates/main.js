const { readAndMinifyCssSync } = require('../utils/persist');
const { join } = require('path');

const inlineCSS = readAndMinifyCssSync(
  join(__dirname, '..', 'styles/inlined.css')
);

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
      <!--<link rel="stylesheet" type="text/css" href="${'../'.repeat(
        level
      )}deferred.css">-->
      <link rel="shortcut icon" href="${'../'.repeat(level)}favicon.ico" />
      <meta name="Description" content="${description}">
      <style>${inlineCSS}</style>
      <body>
        <header>
          <content>
            ${Link({ title: '<h1>autofagist.blog</h1>', slug: 'index', level })}
          </content>
        </header>
        <main>${content}</main>
        <footer>
          <content>
            <a href="rss.xml">
              <img class="footer-icon" src="${'../'.repeat(
                level
              )}img/rss.svg" alt="rss feed icon" />
            </a>
          </content>
        </footer>
      </body>
    </html>
  `;
};
