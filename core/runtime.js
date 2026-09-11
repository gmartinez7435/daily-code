(function(root){
async function runtime(config) {
  const {project,code,runId,mode,resources}=config;
  const nativePost=raw=>window.parent.postMessage(JSON.parse(raw),'*');
  const send=(type,data={})=>nativePost?.(JSON.stringify({type,runId,projectId:project.id,...data}));
  const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const errors=[];
  const error=e=>{const message=String(e?.message||e);errors.push(message);send('error',{message});};
  window.addEventListener('error',e=>error(e.error||e.message));
  window.addEventListener('unhandledrejection',e=>{e.preventDefault();error(e.reason);});
  for(const method of ['log','warn','error'])console[method]=(...args)=>send('console',{message:args.map(a=>{try{return typeof a==='string'?a:JSON.stringify(a);}catch{return String(a);}}).join(' ').slice(0,2000)});
  const data=Object.assign(Object.create(null),mode==='test'?project.storageSeed||{}:config.storage||{});
  const notifyStorage=()=>{if(mode==='preview')send('storage',{storage:{...data}});};
  const storage={getItem:key=>Object.hasOwn(data,String(key))?data[String(key)]:null,
    setItem(key,value){data[String(key)]=String(value);notifyStorage();},
    removeItem(key){delete data[String(key)];notifyStorage();},
    clear(){for(const key of Object.keys(data))delete data[key];notifyStorage();},
    key:index=>Object.keys(data)[index]??null,get length(){return Object.keys(data).length;}};
  try{Object.defineProperty(window,'localStorage',{value:storage,configurable:false});}catch(e){error(e);return;}
  let attempts={};
  const requests=[];
  window.fetch=async(input,options={})=>{
    const path=String(input);
    if(!path.startsWith('/api/'))throw new TypeError('Offline practice: use a bundled /api/ URL.');
    const url=new URL(path,'https://practice.invalid');
    const count=attempts[path]=(attempts[path]||0)+1;
    requests.push({path,options,at:performance.now()});
    const delay=url.pathname==='/api/slow'?500:url.pathname==='/api/search'&&url.searchParams.get('q')?.length===1?450:80;
    await new Promise((resolve,reject)=>{
      const signal=options.signal;
      const abort=()=>{clearTimeout(timer);signal?.removeEventListener('abort',abort);reject(new DOMException('Aborted','AbortError'));};
      const timer=setTimeout(()=>{signal?.removeEventListener('abort',abort);resolve();},delay);
      if(signal?.aborted)abort();else signal?.addEventListener('abort',abort,{once:true});
    });
    if(url.pathname==='/api/network-error')throw new TypeError('Simulated connection failure');
    let status=200,body=resources.routes[url.pathname];
    if(url.pathname==='/api/flaky'){status=count===1?503:200;body=status===200?{message:'Recovered'}:{error:'Try again'};}
    if(url.pathname==='/api/search')body={label:'Results for '+(url.searchParams.get('q')||'')};
    if(url.pathname==='/api/slow')body={message:'Finished'};
    if(url.pathname==='/api/bad-json')return new Response('{broken',{status:200});
    if(url.pathname==='/api/rsvp'){
      status=400;body={error:'Expected JSON POST with name'};
      try{const value=JSON.parse(options.body);const headers=new Headers(options.headers);if(options.method?.toUpperCase()==='POST'&&headers.get('content-type')==='application/json'&&typeof value.name==='string'){status=201;body={name:value.name,registered:true};}}catch{}
    }
    if(body===undefined){status=404;body={error:'Not found'};}
    return new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}});
  };
  const equal=(a,b)=>{
    if(a===b)return true;
    if(a===null||b===null||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b))return false;
    const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&equal(a[k],b[k]));
  };
  const results=[];
  const assert=(ok,label)=>results.push({passed:!!ok,label});
  const moduleURL=source=>'data:text/javascript;charset=utf-8,'+encodeURIComponent(source);
  try {
    const imports=Object.fromEntries(Object.entries(resources.modules).map(([name,source])=>[name,moduleURL(source)]));
    const map=document.createElement('script');map.type='importmap';map.textContent=JSON.stringify({imports});document.head.append(map);
    await import(moduleURL(code));
    if(project.providedJavaScript)new Function(project.providedJavaScript)();
    if(mode==='preview'){send('ready');return;}
    if(project.kind==='function') {
      for(const [index,test] of project.cases.entries()) {
        const input=JSON.parse(JSON.stringify(test.input)),before=JSON.parse(JSON.stringify(input));
        try {
          const value=await window.solve(input);
          assert(equal(value,test.expected),`Example ${index+1}: expected ${JSON.stringify(test.expected)}, received ${JSON.stringify(value)??'undefined'}`);
          if(project.requireUnchangedInput)assert(equal(input,before),`Example ${index+1}: original input is unchanged`);
        } catch(e){assert(false,`Example ${index+1}: ${e.message}`);if(project.requireUnchangedInput)assert(false,'Function must return without throwing');}
      }
    } else {
      for(const step of project.steps) {
        const el=step.selector?document.querySelector(step.selector):null;
        if(step.action==='wait'){await sleep(step.ms);continue;}
        if(step.action==='storage'){assert(storage.getItem(step.key)===step.value,`Saved ${step.key} equals ${step.value}`);continue;}
        if(step.action==='expect'){
          let value;
          if(step.property==='exists')value=!!el;
          else if(step.property.startsWith('class:'))value=el?.classList.contains(step.property.slice(6));
          else if(step.property.startsWith('attr:'))value=el?.getAttribute(step.property.slice(5));
          else value=step.property.split('.').reduce((v,k)=>v?.[k],el);
          assert(equal(value,step.value),`${step.selector} ${step.property}: expected ${JSON.stringify(step.value)}, received ${JSON.stringify(value)}`);
          continue;
        }
        if(!el)throw Error(`Missing element ${step.selector}`);
        if(step.action==='click')el.click();
        if(step.action==='input'){el.value=step.value;el.dispatchEvent(new Event(step.event,{bubbles:true}));}
        if(step.action==='event'){
          const e=new Event(step.event,{bubbles:true,cancelable:true});el.dispatchEvent(e);
          if(step.event==='submit')assert(e.defaultPrevented,'Form submission is prevented');
        }
      }
    }
    await sleep(30);
    send('result',{passed:errors.length===0&&results.length>0&&results.every(r=>r.passed),passedCount:results.filter(r=>r.passed).length,total:results.length,results});
  }catch(e){error(e);send('result',{passed:false,passedCount:0,total:config.expectedChecks,results:[{passed:false,label:String(e.message||e)}]});}
}
if(typeof module==="object"&&module.exports)module.exports=runtime;
else root.CodeDailyRuntime=runtime;
})(typeof globalThis!=="undefined"?globalThis:this);
