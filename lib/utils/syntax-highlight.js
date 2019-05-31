var Prism = require('prismjs');

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

function detectSequence(arr, i, string) {
  const match = arr.slice(i, i + string.length);
  return match === string;
}

// example ['<p>hej</p>', '<code class="language-javascript">', 'const test = 2', </code>]
function splitArray(html) {
  const result = [];
  let lastCutIndex = 0;
  let parsingCodeBlock = false;
  let lastStart = '';
  for (const [i, char] of Array.from(html).entries()) {
    if (char === '<' && !parsingCodeBlock) {
      const isBeginningBlockCodeBlock = detectSequence(html, i, '<code class="language-');
      const isBeginningInlineCodeBlock = detectSequence(html, i, '<code>');
      const isEndOfCodeBlock = detectSequence(html, i, '</code>');
      if (isBeginningBlockCodeBlock || (isEndOfCodeBlock && lastStart === 'block')) {
        result.push(html.slice(lastCutIndex, i));
        lastCutIndex = i;
        parsingCodeBlock = true;
        lastStart = '';
      }
      if(isBeginningBlockCodeBlock || isBeginningInlineCodeBlock) lastStart = isBeginningBlockCodeBlock ? 'block' : 'inline';
    }
    if (char === '>' && parsingCodeBlock) {
      result.push(html.slice(lastCutIndex, i + 1));
      lastCutIndex = i + 1;
      parsingCodeBlock = false;
    }
  }
  return result.length > 0 ? result : [html];
}

function processArray(arr) {
  return arr.map((snippet, i) => {
    return (arr[i + 1] === '</code>') ? highlight(htmlCharDecode(unescapeHTML(snippet))) : snippet;
  })
}

function addSyntaxHighlight(html) {
  const splitted = splitArray(html);
  const processed = processArray(splitted);
  const highlighted = processed.join('');
  return highlighted;
}

module.exports = addSyntaxHighlight;
