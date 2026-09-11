// Display-only formatting for the bundled curriculum's HTML and flat CSS rules.
// Exercise markup stays untouched, including whitespace-sensitive textarea values.
function formatHtml(source) {
  const tokens = source.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g) || [];
  const lines = [];
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  let depth = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const opening = token.match(/^<([\w-]+)\b/);
    if (/^<\//.test(token)) depth = Math.max(0, depth - 1);
    let line = token;
    if (opening && !voidTags.has(opening[1]) && !/\/>$/.test(token)) {
      const closing = `</${opening[1]}>`;
      if (tokens[i + 1] === closing) {
        line += tokens[++i];
      } else if (tokens[i + 1] && !tokens[i + 1].startsWith('<') && tokens[i + 2] === closing) {
        line += tokens[++i] + tokens[++i];
      } else {
        lines.push('  '.repeat(depth) + line);
        depth++;
        continue;
      }
    }
    if (line.trim()) lines.push('  '.repeat(depth) + line);
  }
  return lines.join('\n');
}
function formatCss(source) {
  return [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => {
    const declarations = body.split(';').filter(s => s.trim()).map(declaration => {
      const colon = declaration.indexOf(':');
      return `  ${declaration.slice(0, colon).trim()}: ${declaration.slice(colon + 1).trim().replace(/\s*!important/g, ' !important')};`;
    });
    return `${selector.trim().replace(/,\s*/g, ', ')} {\n${declarations.join('\n')}\n}`;
  }).join('\n\n');
}
module.exports = {formatHtml, formatCss};
