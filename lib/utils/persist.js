const { join } = require('path');
const fse = require('fs-extra');
const minify = require('html-minifier').minify;
const CleanCSS = require('clean-css');

const isPromise = value => Boolean(value && typeof value.then === 'function');

function minifyHTML(markup) {
  return minify(markup, {
    collapseWhitespace: false,
    removeAttributeQuotes: true,
    sortAttributes: true,
    sortClassName: true,
  });
}

function readAndMinifyCssSync(source) {
  try {
    const css = fse.readFileSync(source, 'utf-8');
    const options = { level: 2 };
    const { styles: minified } = new CleanCSS(options).minify(css);
    return minified;
  } catch (e) {
    console.error(`could not read css from ${source}`, e);
  }
}

async function persistMarkup(source, content) {
  if(isPromise(content)) {
    content = await content;
  } 
  try {
    const minified = minifyHTML(content);
    await fse.remove(source);
    await fse.outputFile(source, minified);
    return;
  } catch (e) {
    console.error(`failed to persist ${source}`, e);
  }
}

async function persistCSS(source, dest) {
  try {
    const css = await fse.readFile(source, 'utf-8');
    const options = { level: 2 };
    const { styles: minified } = new CleanCSS(options).minify(css);
    await fse.remove(dest);
    await fse.outputFile(dest, minified);
    return;
  } catch (e) {
    console.error(`failed to persist ${dest}`, e);
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
  readAndMinifyCssSync,
};
