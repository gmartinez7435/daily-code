(function(root,factory){
if(typeof module==="object"&&module.exports)module.exports=factory();
else root.CodeDailyProgress=factory();
})(typeof globalThis!=="undefined"?globalThis:this,function(){
const VERSION = 1;
const rank = {Beginner: 0, Intermediate: 1, Advanced: 2};
function shuffle(projects, previous = [], cycle = 1, random = Math.random) {
  const remaining = [...projects], order = [], recent = [...previous];
  while (remaining.length) {
    const position = order.length;
    const ceiling = cycle === 1 ? (position < 20 ? 0 : position < 60 ? 1 : 2) : 2;
    let candidates = remaining.filter(p => rank[p.difficulty] <= ceiling);
    if (!candidates.length) candidates = remaining;
    // Avoid the previous project across the cycle boundary whenever possible.
    if (candidates.length > 1) candidates = candidates.filter(p => p.id !== recent.at(-1)?.id);
    const scored = candidates.map(p => ({p, score: recent.slice(-3).reduce((sum,r,i) =>
      sum + (r.conceptFamily === p.conceptFamily ? 6 : 0) + p.concepts.filter(c => r.concepts.includes(c)).length * (i+1), 0) + random() * 3}));
    scored.sort((a,b) => a.score-b.score);
    const chosen = scored[0].p;
    order.push(chosen.id); recent.push(chosen); remaining.splice(remaining.indexOf(chosen),1);
  }
  // Separate any concept-family pair left at the end of a greedy shuffle.
  const byId=Object.fromEntries(projects.map(p=>[p.id,p]));
  const allowed=(id,i)=>cycle!==1||rank[byId[id].difficulty]<=(i<20?0:i<60?1:2);
  const clean=i=>{
    const p=byId[order[i]],before=i?byId[order[i-1]]:previous.at(-1),after=byId[order[i+1]];
    return (!before||p.conceptFamily!==before.conceptFamily)&&(!after||p.conceptFamily!==after.conceptFamily);
  };
  for(let i=0;i<order.length;i++){
    if(clean(i))continue;
    for(let j=order.length-1;j>=0;j--){
      if(i===j||!allowed(order[i],j)||!allowed(order[j],i))continue;
      [order[i],order[j]]=[order[j],order[i]];
      if(clean(i)&&clean(j))break;
      [order[i],order[j]]=[order[j],order[i]];
    }
  }
  return order;
}
function initial(projects, random) {
  return {version:VERSION, order:shuffle(projects,[],1,random), position:0, cycle:1,
    completedIds:[], cycleCompleted:[], completionCount:0, drafts:{}, hints:{}, sandbox:{}};
}
const record = v => v && typeof v === 'object' && !Array.isArray(v);
function restore(raw, projects, random) {
  const fresh = initial(projects,random);
  if (!raw) return {state:fresh, recovered:false};
  let saved;
  try {saved=JSON.parse(raw);} catch {return {state:fresh,recovered:true};}
  if (!record(saved) || saved.version!==VERSION) return {state:fresh,recovered:true};
  const ids=new Set(projects.map(p=>p.id));
  const validOrder=Array.isArray(saved.order)&&saved.order.length===ids.size&&new Set(saved.order).size===ids.size&&saved.order.every(id=>ids.has(id));
  const validPosition=Number.isInteger(saved.position)&&saved.position>=0&&saved.position<projects.length;
  const list=v=>Array.isArray(v)?[...new Set(v.filter(id=>ids.has(id)))]:[];
  const drafts={},hints={},sandbox={};
  for(const p of projects){
    if(record(saved.drafts)&&typeof saved.drafts[p.id]==='string')drafts[p.id]=saved.drafts[p.id];
    const hint=saved.hints?.[p.id];
    if(Number.isInteger(hint))hints[p.id]=Math.max(0,Math.min(p.hints.length,hint));
    if(record(saved.sandbox?.[p.id]))sandbox[p.id]=Object.fromEntries(Object.entries(saved.sandbox[p.id]).filter(([k,v])=>typeof v==='string'));
  }
  const completedIds=list(saved.completedIds);
  const cycle=Number.isSafeInteger(saved.cycle)&&saved.cycle>=1?saved.cycle:1;
  return {recovered:!validOrder||!validPosition,state:{...fresh,order:validOrder?saved.order:fresh.order,
    position:validOrder&&validPosition?saved.position:0,cycle,completedIds,
    cycleCompleted:validOrder?list(saved.cycleCompleted):[],
    completionCount:Math.max(completedIds.length,Number.isSafeInteger(saved.completionCount)&&saved.completionCount>=0?saved.completionCount:0),drafts,hints,sandbox}};
}
function advance(state, projects, random) {
  if(state.position+1<state.order.length)return {...state,position:state.position+1};
  const recent=state.order.slice(-3).map(id=>projects.find(p=>p.id===id));
  return {...state,order:shuffle(projects,recent,state.cycle+1,random),position:0,cycle:state.cycle+1,cycleCompleted:[]};
}
function complete(state, id, result, expectedChecks) {
  if(id!==state.order[state.position]||!result||result.passed!==true||result.total!==expectedChecks||result.passedCount!==expectedChecks||expectedChecks<1||state.cycleCompleted.includes(id))return state;
  return {...state,completedIds:[...new Set([...state.completedIds,id])],cycleCompleted:[...state.cycleCompleted,id],completionCount:state.completionCount+1};
}
// Serialize writes; a slow earlier save can never overwrite a newer snapshot.
function createWriter(write) {
  let chain=Promise.resolve();
  return value=>{chain=chain.catch(()=>{}).then(()=>write(value));return chain;};
}
return {initial,restore,advance,complete,shuffle,createWriter};
});
