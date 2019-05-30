var Prism = require('prismjs');

function htmlCharDecode(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
}

function unescapeHTML(escapedHTML) {
  return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"');
}

const highlight = snippet =>
  Prism.highlight(snippet, Prism.languages.javascript, 'javascript');

function addSyntaxHighlight(html) {
  const split = html.split(/<\s*code[^>]*>/);
  const splitAgain = split.reduce(
    (sum, val) => [...sum, ...val.split(/<\s*\/\s*code>/)],
    []
  );
  const highlighted = splitAgain
    .map((snippet, i) => {
      if (i % 2 == 0) return snippet;
      return `<code>${highlight(htmlCharDecode(unescapeHTML(snippet)))}</code>`;
    })
    .join('');
  return highlighted;
}

module.exports = addSyntaxHighlight;