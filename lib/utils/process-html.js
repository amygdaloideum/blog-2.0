const Prism = require('prismjs');
const parse = require('html-map-parser');

function htmlCharDecode(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
}

function unescapeHTML(escapedHTML) {
  return escapedHTML
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
}

const highlight = snippet =>
  Prism.highlight(snippet, Prism.languages.javascript, 'javascript');

function transform(node) {
  // Add syntax highlighting
  if (node.name === 'code' && node.parent && node.parent.name === 'pre') {
    const classAttr = node.attributes.find(attr => attr.name === 'class');
    if(!classAttr || !classAttr.value.includes('javascript')) return node;
    const unEscaped = unescapeHTML(node.content);
    const decoded = htmlCharDecode(unEscaped);
    return { ...node, content: highlight(decoded) };
  }
  // Add header anchors
  if(node.name === 'h2' || node.name === 'h1') {
    const idAttr = node.attributes.find(attr => attr.name === 'id');
    if(!idAttr) return node;
    return { ...node, content: `${node.content}<a href="#${idAttr.value}">#</a>`}
  }
  return node;
}

async function processHtml(html) {
  const processed = await parse(html, transform);
  return processed;
}

module.exports = processHtml;
