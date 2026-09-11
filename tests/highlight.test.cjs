const test = require('node:test');
const assert = require('node:assert/strict');
const highlight = require('../core/highlight.js');
test('highlighting escapes markup and preserves code text', () => {
  for (const language of ['js','html','css']) {
    const code = '<img src=x onerror=alert(1)> & "hello"\nconst total = 12;';
    const colored = highlight(code,language);
    assert.ok(!colored.includes('<img'));
    const restored = colored.replace(/<\/?span\b[^>]*>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    assert.equal(restored,code);
  }
});
