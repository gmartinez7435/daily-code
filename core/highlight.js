(function(root) {
  'use strict';
  const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const keywords = new Set('const let var function return if else for while of in async await new throw try catch finally import from export default class extends this typeof null undefined true false switch case break continue'.split(' '));
  function highlight(source, language = 'js') {
    // A display-only lexer. Never execute source or insert unescaped learner text.
    const pattern = language === 'html'
      ? /<!--[\s\S]*?-->|<\/?[\w-]+|\b[\w-]+(?==)|"[^"]*"|'[^']*'|\/?>/g
      : /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|#[\da-fA-F]{3,8}\b|[\w$-]+/g;
    let result = '', end = 0;
    for (const match of source.matchAll(pattern)) {
      const token = match[0], index = match.index;
      result += escape(source.slice(end, index));
      let kind = '';
      if (/^(\/\/|\/\*|<!--)/.test(token)) kind = 'comment';
      else if (/^["'`]/.test(token)) kind = 'string';
      else if (language === 'html') kind = /^[<>/]/.test(token) ? 'tag' : 'attribute';
      else if (/^(\d|#[\da-f])/i.test(token)) kind = 'number';
      else if (keywords.has(token)) kind = 'keyword';
      else if (language === 'css' && /^\s*:/.test(source.slice(index + token.length))) kind = 'attribute';
      else if (/^\s*\(/.test(source.slice(index + token.length))) kind = 'function';
      result += kind ? `<span class="syntax-${kind}">${escape(token)}</span>` : escape(token);
      end = index + token.length;
    }
    return result + escape(source.slice(end));
  }
  if (typeof module === 'object' && module.exports) module.exports = highlight;
  else root.CodeDailyHighlight = highlight;
})(typeof globalThis !== 'undefined' ? globalThis : this);
