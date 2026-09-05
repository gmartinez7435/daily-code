const projects = [
  {id:'counter',title:'Pocket Counter',description:'Build a counter that increases, decreases, and returns to zero.',concepts:['querySelector','addEventListener','textContent'],mission:'Connect all three buttons and never let the count drop below zero.',html:'<main class="card">\n  <p class="label">CURRENT COUNT</p>\n  <h1 id="count">0</h1>\n  <div>\n    <button id="minus">−</button>\n    <button id="reset">Reset</button>\n    <button id="plus">+</button>\n  </div>\n</main>',css:'body{display:grid;place-items:center;min-height:100vh;margin:0;background:#eaf0ff;font-family:system-ui;color:#17203a}.card{background:white;padding:2rem;border-radius:24px;text-align:center;box-shadow:0 18px 50px #8292bd44}.label{font-size:12px;letter-spacing:2px;color:#637098}h1{font-size:72px;margin:15px}button{border:0;border-radius:12px;padding:12px 18px;margin:4px;font-size:18px;background:#315fea;color:white}#reset{background:#e7ebf5;color:#263352}',starter:"let count = 0;\n\n// Select the count and all three buttons\n\n// Add your click events below\n"},
  {id:'color',title:'Color Mixer',description:'Change the page color when a visitor taps a color button.',concepts:['dataset','forEach','style'],mission:'Use one event listener for each button and read its data-color value.',html:'<main>\n <h1>Pick a mood</h1>\n <p id="choice">No color selected</p>\n <div id="colors">\n  <button data-color="#ff7b72">Coral</button>\n  <button data-color="#65d6ad">Mint</button>\n  <button data-color="#79c0ff">Sky</button>\n </div>\n</main>',css:'body{margin:0;min-height:100vh;display:grid;place-items:center;text-align:center;font-family:system-ui;background:#f5f7fb;color:#18223b;transition:.3s}main{background:#ffffffcc;padding:35px;border-radius:22px;box-shadow:0 15px 40px #0002}button{padding:12px 16px;border:0;border-radius:10px;margin:4px;font-weight:700}',starter:"const buttons = document.querySelectorAll('[data-color]');\nconst choice = document.querySelector('#choice');\n\n// Loop through the buttons\n// Change the body background and choice text\n"},
  {id:'tip',title:'Tip Calculator',description:'Calculate a restaurant tip from an amount and a percentage.',concepts:['input','Number','template literals'],mission:'Show the tip and final total whenever Calculate is pressed.',html:'<main>\n <h1>Tip calculator</h1>\n <label>Bill <input id="bill" type="number" value="40"></label>\n <label>Tip % <input id="percent" type="number" value="20"></label>\n <button id="calculate">Calculate</button>\n <p id="result">Your total will appear here.</p>\n</main>',css:'body{display:grid;place-items:center;min-height:100vh;margin:0;background:#12253d;font-family:system-ui;color:#15243a}main{width:260px;background:white;padding:28px;border-radius:20px}label{display:block;margin:14px 0;color:#52627a}input{display:block;width:100%;box-sizing:border-box;padding:10px;margin-top:5px}button{width:100%;padding:12px;border:0;border-radius:8px;background:#23a67a;color:white;font-weight:bold}',starter:"const billInput = document.querySelector('#bill');\nconst percentInput = document.querySelector('#percent');\nconst button = document.querySelector('#calculate');\nconst result = document.querySelector('#result');\n\n// Calculate the tip when the button is clicked\n"},
  {id:'todo',title:'Quick Task List',description:'Let someone add tasks and remove them when finished.',concepts:['createElement','append','remove'],mission:'Create a new li for each task and remove it when tapped.',html:'<main>\n <h1>Today</h1>\n <div><input id="task" placeholder="Add a task"><button id="add">Add</button></div>\n <ul id="list"></ul>\n</main>',css:'body{margin:0;min-height:100vh;display:grid;place-items:start center;background:#f2f4fa;font-family:system-ui;color:#1d2942}main{width:min(85%,340px);margin-top:40px}div{display:flex}input{flex:1;padding:12px;border:1px solid #ccd3e2;border-radius:10px 0 0 10px}button{border:0;background:#526dff;color:white;padding:0 18px;border-radius:0 10px 10px 0}li{background:white;margin:10px 0;padding:14px;border-radius:10px;box-shadow:0 5px 15px #2332}',starter:"const input = document.querySelector('#task');\nconst addButton = document.querySelector('#add');\nconst list = document.querySelector('#list');\n\n// Add a task when the button is clicked\n"},
  {id:'quote',title:'Quote Shuffler',description:'Show a random encouraging message whenever the button is pressed.',concepts:['arrays','Math.random','textContent'],mission:'Choose a random item from the quotes array without repeating the UI markup.',html:'<main>\n <p id="quote">Press the button for a thought.</p>\n <button id="shuffle">Inspire me</button>\n</main>',css:'body{margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(145deg,#352f68,#7c4da3);font-family:Georgia;color:white}main{width:75%;text-align:center}p{font-size:26px;line-height:1.4}button{padding:13px 20px;border:0;border-radius:30px;background:white;color:#4d3977;font-weight:bold}',starter:"const quotes = [\n  'Small steps still move you forward.',\n  'Practice makes patterns.',\n  'Build it, break it, learn from it.'\n];\n\nconst quote = document.querySelector('#quote');\nconst button = document.querySelector('#shuffle');\n\n// Show a random quote on click\n"},
  {id:'filter',title:'Temperature Filter',description:'Filter a list to show only the hottest temperatures.',concepts:['filter','map','arrays'],mission:'Use filter to keep temperatures 90 or above, then show them on screen.',html:'<main>\n <h1>Weekly heat</h1>\n <p>All temperatures: 84, 91, 88, 96, 90, 79</p>\n <button id="show">Show hot days</button>\n <ul id="results"></ul>\n</main>',css:'body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff1e4;font-family:system-ui;color:#45291c}main{background:white;padding:28px;border-radius:18px;max-width:290px}button{padding:11px 16px;border:0;border-radius:9px;background:#ef6a37;color:white;font-weight:bold}li{margin:8px}',starter:"const temperatures = [84, 91, 88, 96, 90, 79];\nconst button = document.querySelector('#show');\nconst results = document.querySelector('#results');\n\n// Filter temperatures that are 90 or higher\n"},
  {id:'password',title:'Password Check',description:'Give instant feedback about whether a password is long enough.',concepts:['input event','if/else','classList'],mission:'As the user types, show Weak below 8 characters and Strong at 8 or more.',html:'<main>\n <h1>Create password</h1>\n <input id="password" type="password" placeholder="At least 8 characters">\n <div class="meter"><span id="bar"></span></div>\n <p id="feedback">Start typing</p>\n</main>',css:'body{margin:0;min-height:100vh;display:grid;place-items:center;background:#eef2f8;font-family:system-ui;color:#202a3c}main{width:280px;background:white;padding:30px;border-radius:20px}input{width:100%;box-sizing:border-box;padding:12px}.meter{height:7px;background:#e4e8ef;margin-top:14px;border-radius:10px;overflow:hidden}.meter span{display:block;height:100%;width:0;background:#eb5757;transition:.2s}.meter span.strong{width:100%;background:#27ae60}',starter:"const password = document.querySelector('#password');\nconst feedback = document.querySelector('#feedback');\nconst bar = document.querySelector('#bar');\n\n// Listen for typing and check password.length\n"}
];

const hints = {
  counter: [
    'Start by selecting #count, #minus, #reset, and #plus with document.querySelector().',
    'Inside each click event, change the count variable first, then display it with countDisplay.textContent = count.',
    'For the minus button, wrap the subtraction in: if (count > 0) { count--; }'
  ],
  color: [
    'Use buttons.forEach() so you can attach a click event to every color button.',
    'Inside the event, the clicked button is available as event.currentTarget.',
    'Read event.currentTarget.dataset.color, then assign it to document.body.style.backgroundColor.'
  ],
  tip: [
    "Put your calculation inside button.addEventListener('click', function () { ... }).",
    'Convert both input values with Number(). The tip is bill × (percent ÷ 100).',
    'Add bill + tip, then use a template literal to set result.textContent. Try total.toFixed(2) for money.'
  ],
  todo: [
    "When Add is clicked, check input.value and create an li with document.createElement('li').",
    'Set the new li\'s textContent to input.value, then use list.append(li).',
    "Give the li its own click event with li.addEventListener('click', () => li.remove())."
  ],
  quote: [
    'Your random position must be a whole number between 0 and quotes.length - 1.',
    'Build that position with Math.floor(Math.random() * quotes.length).',
    'Inside the click event, set quote.textContent = quotes[randomIndex].'
  ],
  filter: [
    'Start with temperatures.filter() and return only values that are 90 or higher.',
    'Save the filtered array: const hotTemps = temperatures.filter(temp => temp >= 90).',
    'Use map() to turn each temperature into an li string, join them, and assign the result to results.innerHTML.'
  ],
  password: [
    'Listen for the input event on the password field so your code runs after every typed character.',
    'Check password.value.length with an if/else statement.',
    "At 8 or more, set feedback.textContent to 'Strong' and call bar.classList.add('strong'); otherwise remove that class."
  ]
};

const validators = {
  counter: `(function(){const display=document.querySelector('#count');document.body.addEventListener('click',function(event){if(!event.target.matches('button'))return;const before=display.textContent;setTimeout(function(){parent.postMessage({type:display.textContent!==before||event.target.id==='reset'?'success':'warning',value:display.textContent!==before||event.target.id==='reset'?'Success! The counter responded.':'The button was pressed, but the displayed count did not change.'},'*')},0)})})()`,
  color: `(function(){document.body.addEventListener('click',function(event){if(!event.target.matches('[data-color]'))return;const expected=event.target.dataset.color;setTimeout(function(){const changed=document.body.style.backgroundColor||getComputedStyle(document.body).backgroundColor;parent.postMessage({type:changed?'success':'warning',value:changed?'Success! The page color changed.':'The button was pressed, but the body color did not change.'},'*')},0)})})()`,
  tip: `(function(){const result=document.querySelector('#result');const initial=result.textContent;document.querySelector('#calculate').addEventListener('click',function(){setTimeout(function(){const worked=result.textContent!==initial;parent.postMessage({type:worked?'success':'warning',value:worked?'Success! Your calculator displayed a result.':'Calculate was pressed, but the result text did not change.'},'*')},0)})})()`,
  todo: `(function(){const input=document.querySelector('#task');const add=document.querySelector('#add');const list=document.querySelector('#list');let addedItem=null;const observer=new MutationObserver(function(){const item=list.querySelector('li');if(item&&item!==addedItem){addedItem=item;parent.postMessage({type:item.textContent.trim()?'progress':'warning',value:item.textContent.trim()?'Good! A task was added. Now tap it to test removal.':'A list item was added, but it has no task text.'},'*')}if(addedItem&&!addedItem.isConnected){parent.postMessage({type:'success',value:'Success! You added and removed a task.'},'*');observer.disconnect()}});observer.observe(list,{childList:true,subtree:true});add.addEventListener('click',function(){setTimeout(function(){if(!list.querySelector('li'))parent.postMessage({type:'warning',value:'The button worked, but no li was appended to #list yet.'},'*')},0)});list.addEventListener('click',function(event){if(event.target.matches('li'))setTimeout(function(){if(event.target.isConnected)parent.postMessage({type:'warning',value:'The task is still there. Add a click event that calls li.remove().'},'*')},0)})})()`,
  quote: `(function(){const quote=document.querySelector('#quote');const initial=quote.textContent;document.querySelector('#shuffle').addEventListener('click',function(){setTimeout(function(){const worked=quote.textContent!==initial;parent.postMessage({type:worked?'success':'warning',value:worked?'Success! A quote was selected.':'The button was pressed, but the quote did not change.'},'*')},0)})})()`,
  filter: `(function(){const results=document.querySelector('#results');document.querySelector('#show').addEventListener('click',function(){setTimeout(function(){const worked=results.querySelectorAll('li').length>0;parent.postMessage({type:worked?'success':'warning',value:worked?'Success! The filtered temperatures are displayed.':'The button was pressed, but no list items appeared in #results.'},'*')},0)})})()`,
  password: `(function(){const password=document.querySelector('#password');const feedback=document.querySelector('#feedback');const initial=feedback.textContent;password.addEventListener('input',function(){setTimeout(function(){const worked=feedback.textContent!==initial;parent.postMessage({type:worked?'success':'warning',value:worked?'Success! The feedback changes as you type.':'You typed, but the password feedback did not change.'},'*')},0)})})()`
};

const $ = selector => document.querySelector(selector);
const dateKey = localDateKey(new Date());
const completions = readCompletions();
let swapOffset = 0;
let project;
let hintIndex = -1;
let projectPassed = false;
let activeRunId = 0;
let previewUrl = null;

function localDateKey(date){
  const year=date.getFullYear();
  const month=String(date.getMonth()+1).padStart(2,'0');
  const day=String(date.getDate()).padStart(2,'0');
  return `${year}-${month}-${day}`;
}
function readCompletions(){
  try{
    const saved=JSON.parse(localStorage.getItem('cd-completions') || '[]');
    return Array.isArray(saved)?saved.filter(item=>item&&typeof item.date==='string'&&typeof item.projectId==='string'):[];
  }catch{return []}
}
function isTodayComplete(){return completions.some(item=>item.date===dateKey)}
function updateCompletionButton(){
  const button=$('#complete-project');
  const isDone=isTodayComplete();
  button.disabled=isDone||!projectPassed;
  button.textContent=isDone?'Completed today ✓':projectPassed?'Mark today complete ✓':'🔒 Pass the project to unlock';
  button.classList.toggle('completed',isDone);
}
function hashDate(value){return [...value].reduce((sum,char)=>(sum*31+char.charCodeAt(0))>>>0,0)}
function chooseProject(){const finishedProjects=new Set(completions.map(item=>item.projectId));const available=projects.filter(item=>!finishedProjects.has(item.id));const pool=available.length?available:projects;project=pool[(hashDate(dateKey)+swapOffset)%pool.length];renderProject()}
function renderProject(){
  $('#project-title').textContent=project.title; $('#project-description').textContent=project.description; $('#mission').textContent=project.mission;
  $('#concepts').innerHTML=project.concepts.map(item=>`<span>${item}</span>`).join('');
  const saved=localStorage.getItem(`cd-code-${project.id}`); $('#code-editor').value=saved ?? project.starter; updateLines(); showStarter('html');
  projectPassed=false; updateCompletionButton();
  resetHints();
  runCode();
}
function resetHints(){hintIndex=-1;$('#hint-box').hidden=true;$('#hint-button').textContent='💡 Give me a hint'}
function showNextHint(){
  const projectHints=hints[project.id];
  if(hintIndex===projectHints.length-1){resetHints();return}
  hintIndex++;
  $('#hint-box').hidden=false;
  $('#hint-number').textContent=`HINT ${hintIndex+1} OF ${projectHints.length}`;
  $('#hint-text').textContent=projectHints[hintIndex];
  $('#hint-button').textContent=hintIndex===projectHints.length-1?'Hide hints':hintIndex===0?'Show another hint':'Show final hint';
}
function buildDocument(code,runId){
  const safe=code.replace(/<\/script/gi,'<\\/script');
  const validator=validators[project.id].replaceAll('parent.postMessage({',`parent.postMessage({runId:${runId},`);
  const bridge=`<script>const runId=${runId};const original=console.log;console.log=(...a)=>{parent.postMessage({runId,type:'console',value:a.map(String).join(' ')},'*');original(...a)};window.onerror=(m,s,l)=>parent.postMessage({runId,type:'error',value:m+' (line '+l+')'},'*');</script>`;
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${project.css}</style></head><body>${project.html}${bridge}<script>${safe}</script><script>${validator}</script></body></html>`;
}
function loadPreview(documentText){
  const frame=$('#preview');
  const previousUrl=previewUrl;
  previewUrl=URL.createObjectURL(new Blob([documentText],{type:'text/html'}));
  frame.addEventListener('load',()=>{if(previousUrl)URL.revokeObjectURL(previousUrl)},{once:true});
  frame.src=previewUrl;
}
function runCode(){
  activeRunId++;
  projectPassed=false; updateCompletionButton();
  const code=$('#code-editor').value; localStorage.setItem(`cd-code-${project.id}`,code); $('#save-status').textContent='Saved'; $('#console-output').innerHTML='<span>Running…</span>'; loadPreview(buildDocument(code,activeRunId));
  setTimeout(()=>{if($('#console-output').textContent==='Running…') $('#console-output').innerHTML='<span>✓ Code ran. Now test the project in Preview.</span>'},350);
  switchPanel('preview');
}
function switchPanel(name){document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.panel===name));document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));$(`#${name}-panel`).classList.add('active')}
function updateLines(){const count=$('#code-editor').value.split('\n').length;$('#line-numbers').textContent=Array.from({length:count},(_,i)=>i+1).join('\n')}
function showStarter(type){document.querySelectorAll('.file-tab').forEach(b=>b.classList.toggle('active',b.dataset.file===type));$('#starter-code').textContent=type==='html'?project.html:project.css}
function updateProgress(){
  const now=new Date(); const day=(now.getDay()+6)%7; const names=['M','T','W','T','F','S','S'];
  const monday=new Date(now); monday.setHours(0,0,0,0); monday.setDate(now.getDate()-day);
  const completedDates=new Set(completions.map(item=>item.date));
  const weekDates=names.map((_,index)=>{const date=new Date(monday);date.setDate(monday.getDate()+index);return localDateKey(date)});
  const weekly=weekDates.filter(date=>completedDates.has(date)).length;
  $('#progress-text').textContent=`${weekly} of 7`; $('#progress-fill').style.width=`${weekly/7*100}%`; $('#streak-count').textContent=weekly;
  $('#week-days').innerHTML=names.map((n,i)=>{const done=completedDates.has(weekDates[i]);return `<div class="day ${i===day?'today':''} ${done?'done':''}" aria-label="${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]}"><i>${done?'✓':''}</i>${n}</div>`}).join('');
  $('#today-label').textContent=now.toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'}).toUpperCase();
  const hour=now.getHours(); $('#greeting').textContent=`Good ${hour<12?'morning':hour<18?'afternoon':'evening'}, Gabriel.`;
}

document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>switchPanel(button.dataset.panel)));
document.querySelectorAll('.file-tab').forEach(button=>button.addEventListener('click',()=>showStarter(button.dataset.file)));
$('#run-code').addEventListener('click',runCode);
$('#hint-button').addEventListener('click',showNextHint);
$('#swap-project').addEventListener('click',()=>{swapOffset++;chooseProject()});
$('#reset-code').addEventListener('click',()=>{if(confirm('Reset your JavaScript for this project?')){activeRunId++;$('#code-editor').value=project.starter;localStorage.removeItem(`cd-code-${project.id}`);projectPassed=false;updateCompletionButton();$('#console-output').innerHTML='<span>Reset complete. Write code, then Save & Run.</span>';loadPreview(buildDocument(project.starter,activeRunId));updateLines();switchPanel('code')}});
$('#complete-project').addEventListener('click',()=>{if(!projectPassed||isTodayComplete())return;completions.push({date:dateKey,projectId:project.id});localStorage.setItem('cd-completions',JSON.stringify(completions));updateProgress();updateCompletionButton()});
$('#code-editor').addEventListener('input',()=>{projectPassed=false;updateCompletionButton();$('#save-status').textContent='Editing…';updateLines();clearTimeout(window.saveTimer);window.saveTimer=setTimeout(()=>{localStorage.setItem(`cd-code-${project.id}`,$('#code-editor').value);$('#save-status').textContent='Saved'},500)});
$('#code-editor').addEventListener('keydown',event=>{if(event.key==='Tab'){event.preventDefault();const el=event.target;const start=el.selectionStart;el.value=el.value.slice(0,start)+'  '+el.value.slice(el.selectionEnd);el.selectionStart=el.selectionEnd=start+2;updateLines()}});
window.addEventListener('message',event=>{if(event.source!==$('#preview').contentWindow||event.data?.runId!==activeRunId||!event.data?.type)return;if(event.data.type==='success'){projectPassed=true;updateCompletionButton()}const row=document.createElement('div');row.className=event.data.type;const icons={error:'✕ ',warning:'⚠ ',success:'✓ ',progress:'→ ',console:'› '};row.textContent=(icons[event.data.type]||'› ')+event.data.value;if($('#console-output').textContent==='Running…'||$('#console-output').textContent.includes('Code ran.')||$('#console-output').textContent.includes('Reset complete.'))$('#console-output').innerHTML='';$('#console-output').append(row)});
updateProgress();chooseProject();switchPanel('code');
