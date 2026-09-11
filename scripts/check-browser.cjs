const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('@playwright/test');
const projects=require('../data/projects.js'),solutions=require('../tests/solutions.json');
const {buildDocument,checkCount}=require('../core/preview.js');
const {initial}=require('../core/progress.js');
const root=path.resolve(__dirname,'..'),KEY='codedaily-progress-v1';
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(file,(e,data)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css'})[path.extname(file)]||'text/plain','Cache-Control':'no-cache'});res.end(e?'Not found':data);});
});
let browser;
(async()=>{
 browser=await chromium.launch({headless:true});
 let externalRequests=0,index=0;const failures=[];
 async function check(p,code,label){
  const context=await browser.newContext({offline:true}),page=await context.newPage();
  await page.route('**/*',r=>{externalRequests++;return r.abort();});
  let resolve;const completed=new Promise(r=>resolve=r);
  await page.exposeFunction('receive',data=>{if(data.type==='result')resolve(data);});
  const doc=buildDocument(p,code,label,'test').replace('<script>', '<script>window.addEventListener("message",event=>window.receive(event.data));</script><script>');
  await page.setContent(doc);
  let timer;const result=await Promise.race([completed,new Promise(r=>{timer=setTimeout(()=>r({passed:false,timeout:true}),16000);})]);clearTimeout(timer);
  await context.close();return result;
 }
 await Promise.all(Array.from({length:3},async()=>{
  while(index<projects.length){const p=projects[index++];
   const reference=await check(p,solutions[p.id],'reference'),blank=await check(p,'','blank'),starter=await check(p,p.starterJavaScript,'starter');
   console.log('Checked',p.id);
   if(!reference.passed||reference.total!==checkCount(p)||blank.passed||starter.passed||reference.timeout||blank.timeout||starter.timeout)failures.push({id:p.id,reference,blank,starter});
  }
 }));
 assert.equal(externalRequests,0);assert.deepEqual(failures,[]);console.log('PASS all 100 reference solutions; blank and starter submissions rejected; zero external requests.');
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 async function open(id='counter',url=base){
  const s=initial(projects);s.order=[id,...s.order.filter(x=>x!==id)];const context=await browser.newContext({viewport:{width:440,height:956}});
  await context.addInitScript(({s,key})=>{if(window.top===window&&!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(s));},{s,key:KEY});
  const page=await context.newPage();await page.goto(url);await page.waitForFunction(()=>!document.querySelector('#run-code').disabled);return{context,page};
 }
 async function run(page,code,passes){
  await page.locator('[data-panel="code"]').click();await page.locator('#code-editor').fill(code);await page.locator('#run-code').click();await page.locator('#validation-results').waitFor({state:'visible'});assert.equal(await page.locator('#complete-project').isEnabled(),passes);
 }
 for(const url of [base,'file://'+path.join(root,'index.html')]){
  const {context,page}=await open('counter',url);
  const missing=[];page.on('requestfailed',r=>missing.push(r.url()));
  await run(page,'document.querySelector("#count").textContent="changed";',false);
  await run(page,solutions.counter,true);assert.equal(await page.locator('#streak-count').textContent(),'1');
  await page.frameLocator('#preview').locator('#plus').click();assert.equal(await page.frameLocator('#preview').locator('#count').textContent(),'1');
  await page.locator('#hint-button').click();await page.locator('[data-panel="code"]').click();await page.locator('#code-editor').fill('// saved draft');
  await page.reload();await page.waitForFunction(()=>!document.querySelector('#run-code').disabled);assert.equal(await page.locator('#code-editor').inputValue(),'// saved draft');assert.match(await page.locator('#hint-number').textContent(),/1 OF 3/);assert.equal(await page.locator('#streak-count').textContent(),'1');
  assert.equal(await page.locator('#load-error').isVisible(),false);
  for(const viewport of [{width:320,height:568},{width:440,height:956},{width:1440,height:1000}]){await page.setViewportSize(viewport);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);}
  const order=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).order,KEY);await page.locator('#swap-project').click();assert.equal(await page.locator('#project-title').getAttribute('data-project-id'),order[1]);
  if(url===base){
   await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
   const cacheKeys=await page.evaluate(()=>caches.keys());assert.ok(cacheKeys.includes('codedaily-web-v4-syntax-preview'));
   await context.setOffline(true);await page.reload();await page.waitForFunction(()=>!document.querySelector('#run-code').disabled);
   assert.equal(await page.locator('#project-title').getAttribute('data-project-id'),order[1]);
   fs.mkdirSync('.artifacts',{recursive:true});await page.screenshot({path:'.artifacts/web-desktop.png',fullPage:true});
   await page.setViewportSize({width:440,height:956});await page.screenshot({path:'.artifacts/web-phone.png',fullPage:true});
  }
  assert.ok(missing.every(url=>!url.includes('/mobile/')));await context.close();console.log('PASS loading, validation, preview, saved progress, hints, navigation and responsive layout via '+(url===base?'HTTP + offline cache':'direct file opening'));
 }
 for(const id of ['fetch-user','module-dynamic','storage-note']){const {page,context}=await open(id);await run(page,solutions[id],true);await context.close();console.log('PASS web integration:',id);}
 await browser.close();server.close();
})().catch(async error=>{console.error(error);await browser?.close();server.close();process.exitCode=1;});
