const test = require('node:test');
const assert = require('node:assert/strict');
const projects = require('../data/projects.js');
const {buildStaticDocument} = require('../core/preview.js');

test('all initial previews include original HTML/CSS without running scripts or validation', () => {
  for (const project of projects) {
    const document = buildStaticDocument(project);
    assert.ok(document.includes(`<body>${project.html}</body>`), project.id);
    assert.ok(document.includes(`<style>${project.css}</style>`), project.id);
    assert.ok(!document.includes('<script'), project.id);
    assert.ok(document.includes("default-src 'none'"));
  }
});

test('all displayed files are indented and preserve original curriculum content', () => {
  for (const project of projects) {
    assert.ok(project.displayHtml.startsWith('<main>\n  '), project.id);
    assert.ok(project.displayHtml.endsWith('\n</main>'), project.id);
    assert.equal(project.displayHtml.replace(/\s/g, ''), project.html.replace(/\s/g, ''), project.id);
    assert.ok(project.displayCss.includes(' {\n  '), project.id);
    assert.ok(project.displayCss.includes('\n}\n\n'), project.id);
    const compact = css => css.replace(/\s/g, '').replace(/;}/g, '}');
    assert.equal(compact(project.displayCss), compact(project.css), project.id);
    // Values inside textareas must remain unchanged, including multiline JSON.
    const values = html => [...html.matchAll(/<textarea\b[^>]*>([\s\S]*?)<\/textarea>/g)].map(m => m[1]);
    assert.deepEqual(values(project.displayHtml), values(project.html), project.id);
  }
});
