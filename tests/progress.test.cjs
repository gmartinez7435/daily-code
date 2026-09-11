const test=require('node:test'),assert=require('node:assert/strict');
const projects=require('../data/projects.js');
const {initial,shuffle,advance,complete,restore,createWriter}=require('../core/progress.js');
const {checkCount,buildDocument}=require('../core/preview.js');
function seeded(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
test('100 complete, unique authored records cover required topics',()=>{
 assert.equal(projects.length,100);assert.equal(new Set(projects.map(p=>p.id)).size,100);assert.equal(new Set(projects.map(p=>p.title)).size,100);
 for(const p of projects){for(const key of ['description','learningObjective','instructions','html','css','starterJavaScript','completionExplanation'])assert.ok(p[key],`${p.id}: ${key}`);assert.ok(p.hints.length>=3);assert.ok(p.validationRequirements.length);assert.ok(checkCount(p)>0);}
 const concepts=new Set(projects.flatMap(p=>p.concepts));
 for(const c of ['variables','let','const','strings','numbers','template literals','conditionals','functions','arrays','objects','loops','DOM selection','DOM manipulation','event listeners','forms','map','filter','find','reduce','destructuring','spread syntax','localStorage','Date','timers','async/await','fetch','error handling','modules'])assert.ok(concepts.has(c),c);
});
test('1000 queues have no repeats, gentle opening, and no adjacent concept families',()=>{
 const byId=Object.fromEntries(projects.map(p=>[p.id,p]));
 for(let seed=1;seed<=1000;seed++){
  const order=shuffle(projects,[],1,seeded(seed));assert.equal(new Set(order).size,100);
  assert.ok(order.slice(0,20).every(id=>byId[id].difficulty==='Beginner'));
  // The greedy selection can exhaust a family at the tail; measure the actual catalog.
  for(let i=1;i<order.length;i++)assert.notEqual(byId[order[i]].conceptFamily,byId[order[i-1]].conceptFamily,`seed ${seed}, position ${i}`);
 }
});
test('next persists position; cycle boundary reshuffles with no immediate project repeat',()=>{
 let state=initial(projects,seeded(1));const first=[...state.order];
 for(let i=0;i<99;i++)state=advance(state,projects,seeded(i+2));
 assert.equal(state.position,99);assert.equal(state.cycle,1);
 const last=state.order[99];state=advance(state,projects,seeded(102));
 assert.equal(state.position,0);assert.equal(state.cycle,2);assert.equal(new Set(state.order).size,100);assert.notEqual(last,state.order[0]);assert.notDeepEqual(first,state.order);
});
test('only a complete successful current-project result grants completion, once per cycle',()=>{
 let s=initial(projects,seeded(1)),id=s.order[0];
 for(const r of [null,{passed:false,total:3,passedCount:3},{passed:true,total:0,passedCount:0},{passed:true,total:3,passedCount:2}])assert.equal(complete(s,id,r,3),s);
 assert.equal(complete(s,'wrong',{passed:true,total:3,passedCount:3},3),s);
 s=complete(s,id,{passed:true,total:3,passedCount:3},3);assert.equal(s.completionCount,1);
 assert.equal(complete(s,id,{passed:true,total:3,passedCount:3},3),s);
 const again={...s,cycle:2,cycleCompleted:[]};const done=complete(again,id,{passed:true,total:3,passedCount:3},3);assert.equal(done.completionCount,2);assert.equal(done.completedIds.length,1);
});
test('reload preserves queue, empty drafts, hints, completion and exercise storage',()=>{
 let s=initial(projects,seeded(1)),id=s.order[0];
 s={...s,position:4,drafts:{[id]:''},hints:{[id]:2},sandbox:{[id]:{note:'hello'}}};
 assert.deepEqual(restore(JSON.stringify(s),projects).state,s);
});
test('corrupt data is detected; damaged order retains valid work and clamps hints',()=>{
 assert.equal(restore('{bad',projects).recovered,true);
 const id=projects[0].id,s={...initial(projects),order:['missing'],drafts:{[id]:'my code',unknown:'bad'},hints:{[id]:99},completedIds:[id,id,'missing']};
 const r=restore(JSON.stringify(s),projects);assert.equal(r.recovered,true);assert.equal(r.state.drafts[id],'my code');assert.equal(r.state.hints[id],3);assert.deepEqual(r.state.completedIds,[id]);assert.equal(r.state.order.length,100);
});
test('writes serialize and recover after rejection',async()=>{
 const writes=[];const save=createWriter(async v=>{if(v===1){await new Promise(r=>setTimeout(r,20));throw Error('full');}writes.push(v);});
 const first=save(1).catch(()=>{}),second=save(2),third=save(3);await Promise.all([first,second,third]);assert.deepEqual(writes,[2,3]);
});
test('script terminators in a draft cannot break out of the bootstrap script',()=>{
 const doc=buildDocument(projects[0],'// </script><p>bad</p>','run');assert.equal((doc.match(/<\/script>/g)||[]).length,1);assert.ok(doc.includes('connect-src'));
});
test('web entrypoint and offline cache reference only existing web files',()=>{
 const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'..');
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),app=fs.readFileSync(path.join(root,'app.js'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
 assert.ok(!/mobile\//.test(html+app+sw));
 for(const match of html.matchAll(/<script src="([^"?]+)/g))assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);
 for(const file of ['data/projects.js','data/resources.js','core/progress.js','core/runtime.js','core/preview.js'])assert.ok(sw.includes(file),file);
 assert.ok(app.includes("const KEY = 'codedaily-progress-v1'"),'saved progress key is preserved');
 assert.equal(new Set(projects.map(p=>p.completionExplanation)).size,100);
});
