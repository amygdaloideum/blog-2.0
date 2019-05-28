const { join } = require('path');
const fse = require('fs-extra');
const minify = require('html-minifier').minify;
const CleanCSS = require('clean-css');

function minifyHTML(markup) {
  return minify(markup, {
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    sortAttributes: true,
    sortClassName: true,
  });
}

async function persistMarkup(path, content) {
  console.log(`Persisting ${path}`);
  const minified = minifyHTML(content);
  await fse.remove(path);
  return fse.outputFile(path, minified);
}

async function persistCSS(path) {
  console.log(`Persisting ${path}`);
  const css = await fse.readFile(join(__dirname, '..', 'style.css'), 'utf-8');
  const options = { level: 2 };
  const { styles: minified } = new CleanCSS(options).minify(css);
  await fse.remove(path);
  return fse.outputFile(path, minified);
}

async function persistAssets() {
  console.log(`Persisting assets`);
  return fse.copy(join(__dirname, '..', 'assets'), join(__dirname, '..', '..', 'public'));
}

module.exports = {
  persistMarkup,
  persistCSS,
  persistAssets,
};
