(function(root,factory){
if(typeof module==="object"&&module.exports)module.exports=factory(require("../data/resources.js"),require("./runtime.js").toString());
else root.CodeDailyPreview=factory(root.CodeDailyResources,root.CodeDailyRuntime.toString());
})(typeof globalThis!=="undefined"?globalThis:this,function(resources,runtimeSource){

function checkCount(project) {
  return project.kind==='function'?project.cases.length*(project.requireUnchangedInput?2:1):project.steps.filter(s=>s.action==='expect'||s.action==='storage'||(s.action==='event'&&s.event==='submit')).length;
}
// Build a fresh sandboxed browser document for each preview or validation run.

function buildDocument(project,code,runId,mode='preview',storage={}) {
  const config=JSON.stringify({project,code,runId,mode,storage,resources,expectedChecks:checkCount(project)}).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' data:; style-src 'unsafe-inline'; img-src data: blob:; connect-src 'none'; form-action 'none'; base-uri 'none'"><style>${project.css}</style></head><body>${project.html}<script>(${runtimeSource})(${config});</script></body></html>`;
}
// Initial preview is markup only: no learner code, wiring, or validation runs.
function buildStaticDocument(project) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data: blob:; form-action 'none'; base-uri 'none'"><style>${project.css}</style></head><body>${project.html}</body></html>`;
}
return {buildDocument,buildStaticDocument,checkCount};
});
