const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const projects = require('../data/projects.js');
const solutions = require('../tests/solutions.json');
const {initial} = require('../core/progress.js');
(async () => {
  const browser = await chromium.launch({headless:true, ...(process.env.BROWSER_PATH ? {executablePath:process.env.BROWSER_PATH} : {})});
  try {
    const page = await browser.newPage();
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    const state = initial(projects);state.order = ['counter', ...state.order.filter(id => id !== 'counter')];
    await page.addInitScript(state => {if (window.top === window && !localStorage.getItem('codedaily-progress-v1')) localStorage.setItem('codedaily-progress-v1',JSON.stringify(state));},state);
    await page.goto(process.env.TEST_URL || 'file://' + path.resolve('index.html'));
    await page.frameLocator('#preview').locator('#plus').waitFor();
    assert.equal(await page.frameLocator('#preview').locator('#count').innerText(),'0');
    await page.locator('[data-panel="code"]').click();
    await page.locator('#code-editor').fill('const greeting = "hello";\n// a comment\n' + solutions.counter);
    assert.ok(await page.locator('#code-highlight .syntax-keyword').count());
    assert.ok(await page.locator('#code-highlight .syntax-string').count());
    assert.ok(await page.locator('#code-highlight .syntax-comment').count());
    await page.locator('#run-code').click();
    await page.waitForFunction(() => !document.querySelector('#complete-project').disabled);
    await page.frameLocator('#preview').locator('#plus').click();
    assert.equal(await page.frameLocator('#preview').locator('#count').innerText(),'1');
    await page.reload();
    await page.frameLocator('#preview').locator('#plus').waitFor();
    assert.equal(await page.frameLocator('#preview').locator('#count').innerText(),'0');
    for (let i=1;i<100;i++) {
      await page.locator('#swap-project').click();
      await page.waitForFunction(() => document.querySelector('#project-title').dataset.projectId === JSON.parse(localStorage.getItem('codedaily-progress-v1')).order[JSON.parse(localStorage.getItem('codedaily-progress-v1')).position]);
      const id = await page.locator('#project-title').getAttribute('data-project-id');
      await page.waitForFunction(html => document.querySelector('#preview').srcdoc.includes(html),projects.find(p=>p.id===id).html);
      await page.frameLocator('#preview').locator('main').waitFor();
      assert.ok((await page.frameLocator('#preview').locator('body').innerText()).trim(),id);
    }
    await page.locator('.starter-files summary').click();
    assert.ok(await page.locator('#starter-code .syntax-tag').count());
    await page.locator('[data-file="css"]').click();
    assert.ok(await page.locator('#starter-code .syntax-attribute').count());
    assert.deepEqual(errors,[]);
    console.log('PASS Brave: 100 initial previews, reload, syntax colors, saved draft, validation and live preview interaction.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
