const Prism = require('prismjs');
const parse = require('html-map-parser');
const loadLanguages = require('prismjs/components/');
loadLanguages(['bash']);

const supportedLanguages = ['javascript', 'bash'];

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

const highlight = (snippet, language) =>
  Prism.highlight(snippet, Prism.languages[language], language);

function transform(node) {
  // Add syntax highlighting
  if (node.name === 'code' && node.parent && node.parent.name === 'pre') {
    const classAttr = node.attributes.find(attr => attr.name === 'class');
    if(!classAttr || !classAttr.value.includes('language')) return node;
    const language = classAttr.value.match(/(?<=language-).*/g)[0];
    if(!supportedLanguages.includes(language)) return node;
    const unEscaped = unescapeHTML(node.content);
    const decoded = htmlCharDecode(unEscaped);
    return { ...node, content: highlight(decoded, language) };
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
