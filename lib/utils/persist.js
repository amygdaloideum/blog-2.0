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
  try {
    const minified = minifyHTML(content);
    await fse.remove(path);
    await fse.outputFile(path, minified);
    return;
  } catch (e) {
    console.error(`failed to persist ${path}`);
  }
}

async function persistCSS(path) {
  try {
    const css = await fse.readFile(join(__dirname, '..', 'style.css'), 'utf-8');
    const options = { level: 2 };
    const { styles: minified } = new CleanCSS(options).minify(css);
    await fse.remove(path);
    await fse.outputFile(path, minified);
    return;
  } catch (e) {
    console.error(`failed to persist ${path}`, e);
  }
}

async function persistAssets() {
  try {
    await fse.copy(
      join(__dirname, '..', 'assets'),
      join(__dirname, '..', '..', 'public'),
      { overwrite: true }
    );
    return;
  } catch (e) {
    console.error('failed to persist assets', e);
  }
}

module.exports = {
  persistMarkup,
  persistCSS,
  persistAssets,
};
