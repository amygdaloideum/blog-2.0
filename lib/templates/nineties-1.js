const { readAndMinifyCssSync } = require('../utils/persist');
const { join } = require('path');

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
      <link rel="shortcut icon" href="${'../'.repeat(level)}favicon.ico" />
      <meta name="Description" content="${description}">
      <body background="${'../'.repeat(level)}img/retro-bg.jpg" style="font-family: 'Comic Sans MS', cursive, sans-serif">
        <h1>>autofagist</h1>
        <img src="${'../'.repeat(level)}retro-gifs/welcome.gif">
        <ul>
          <li>${Link({ title: 'home', slug: 'index', level })}</li>
          <li>${Link({ title: 'blog', slug: 'blog', level })}</li>
        </ul>
        <img src="${'../'.repeat(level)}retro-gifs/dancing-hamster1.gif">
        <img src="${'../'.repeat(level)}retro-gifs/dancing-hamster2.gif">
        <img src="${'../'.repeat(level)}retro-gifs/dancing-hamster3.gif">
        <div style="max-width: 40rem">
        ${content}
        <div>
        <img src="${'../'.repeat(level)}retro-gifs/under-construction.gif">
      </body>
    </html>
  `;
};
