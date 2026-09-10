/* CodeDaily web shell. Curriculum, validation, and queue algorithms are shared with Expo. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const KEY = 'codedaily-progress-v1';
  const progress = window.CodeDailyProgress;
  let projects, resources, preview, state, project;
  let activeRun = null, timer = null, lastPassed = false, loaded = false;
  const controls = ['#code-editor', '#run-code', '#reset-code', '#hint-button', '#swap-project'];
  function enable(value) { controls.forEach(selector => { $(selector).disabled = !value; }); }
  function notice(text) { $('#app-notice').textContent = text; $('#app-notice').hidden = !text; }
  function save() {
    if (!state) return false;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      $('#save-status').textContent = 'Saved on device';
      $('#save-error').hidden = true;
      return true;
    } catch {
      $('#save-status').textContent = 'Save failed';
      $('#save-error p').textContent = 'Your changes are still in this tab. Storage may be full or disabled. Retry before closing it.';
      $('#save-error').hidden = false;
      return false;
    }
  }
  function consoleRow(text, kind = 'log') {
    const line = document.createElement('div');
    line.className = kind; line.textContent = text;
    $('#console-output').append(line);
    while ($('#console-output').children.length > 30) $('#console-output').firstChild.remove();
  }
  function feedback(text, kind) { $('#console-output').replaceChildren(); consoleRow(text, kind); }
  function switchPanel(name) {
    document.querySelectorAll('[data-panel]').forEach(button => {
      const selected = button.dataset.panel === name;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-selected', String(selected));
    });
    $('#code-panel').classList.toggle('active', name === 'code');
    $('#preview-panel').classList.toggle('active', name === 'preview');
  }
  function showStarter(type) {
    if (!project) return;
    document.querySelectorAll('[data-file]').forEach(button => button.classList.toggle('active', button.dataset.file === type));
    $('#starter-code').textContent = type === 'html' ? project.html : type === 'css' ? project.css : type === 'wiring' ? project.providedJavaScript || 'No additional wiring. Connect this project’s events in your editor.' : JSON.stringify(resources, null, 2);
  }
  function updateLines() {
    $('#line-numbers').textContent = Array.from({ length: $('#code-editor').value.split('\n').length }, (_, i) => i + 1).join('\n');
    $('#line-numbers').scrollTop = $('#code-editor').scrollTop;
  }
  function updateProgress() {
    $('#streak-count').textContent = state.completionCount;
    $('#progress-text').textContent = `${state.completedIds.length} of ${projects.length}`;
    $('#progress-fill').style.width = `${state.completedIds.length / projects.length * 100}%`;
    $('#week-days').textContent = `Cycle ${state.cycle} · Project ${state.position + 1} of ${projects.length} · ${state.cycleCompleted.length} passed this cycle`;
    $('#swap-project').textContent = state.position === projects.length - 1 ? 'Finish cycle & reshuffle →' : 'Next project →';
    $('#complete-project').disabled = !lastPassed;
    $('#complete-project').classList.toggle('completed', lastPassed);
    $('#complete-project').textContent = lastPassed ? '✓ Completed — Next project →' : '🔒 Pass all checks to complete';
    $('#completion-explanation').hidden = !lastPassed && !state.completedIds.includes(project.id);
    $('#completion-explanation p').textContent = project.completionExplanation;
  }
  function renderHints() {
    const count = state.hints[project.id] || 0;
    $('#hint-box').hidden = count === 0;
    $('#hint-number').textContent = `${count} OF ${project.hints.length} HINTS REVEALED`;
    $('#hint-text').textContent = project.hints.slice(0, count).map((hint, i) => `${i + 1}. ${hint}`).join('\n\n');
    $('#hint-button').disabled = count >= project.hints.length;
    $('#hint-button').textContent = count >= project.hints.length ? 'All hints revealed' : count ? 'Show another hint' : '💡 Give me a hint';
  }
  function invalidate(clearPreview = false) {
    activeRun = null; clearTimeout(timer); timer = null; lastPassed = false;
    $('#validator').srcdoc = '';
    if (clearPreview) $('#preview').srcdoc = '';
    $('#validation-results').hidden = true;
    $('#validation-results ul').replaceChildren();
    $('#run-code').textContent = '▶ Save & Run';
  }
  function renderProject() {
    invalidate(true);
    project = projects.find(p => p.id === state.order[state.position]);
    $('#project-title').textContent = project.title;
    $('#project-title').dataset.projectId = project.id;
    $('#project-description').textContent = project.description;
    $('#level').textContent = project.difficulty.toUpperCase();
    $('#mission').textContent = project.instructions;
    $('#concepts').replaceChildren(...project.concepts.map(concept => { const span = document.createElement('span'); span.textContent = concept; return span; }));
    $('#requirements').replaceChildren(...project.validationRequirements.map(requirement => { const li = document.createElement('li'); li.textContent = requirement; return li; }));
    $('#code-editor').value = state.drafts[project.id] ?? project.starterJavaScript;
    updateLines(); renderHints(); updateProgress(); showStarter('html'); switchPanel('code');
    feedback('Write your JavaScript, then Save & Run.');
  }
  function edit() {
    if (!loaded) return;
    invalidate();
    state.drafts[project.id] = $('#code-editor').value;
    save(); updateLines(); updateProgress();
    feedback('Draft changed. Run again to validate this version.');
  }
  function nextProject() {
    if (!loaded) return;
    // Persist current text even if navigation follows an editor change immediately.
    state.drafts[project.id] = $('#code-editor').value;
    state = progress.advance(state, projects); save(); renderProject();
  }
  function runCode() {
    if (!loaded) return;
    invalidate();
    const code = $('#code-editor').value;
    state.drafts[project.id] = code; save(); updateProgress();
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    activeRun = { id, projectId: project.id, code, settled: false };
    feedback('Running behavioral checks…', 'progress');
    $('#run-code').textContent = '↻ Restart run';
    // Separate sandboxed documents: test fixtures never mutate the learner's preview data.
    $('#preview').srcdoc = preview.buildDocument(project, code, id, 'preview', state.sandbox[project.id] || {});
    $('#validator').srcdoc = preview.buildDocument(project, code, id, 'test');
    switchPanel('preview');
    timer = setTimeout(() => {
      if (activeRun?.id !== id || activeRun.settled) return;
      invalidate(true); updateProgress();
      feedback('Validation timed out. Check for an infinite loop or an unresolved promise, then run again. If the browser is unresponsive, reload the page.', 'error');
    }, 20000);
  }
  window.addEventListener('message', event => {
    const fromTest = event.source === $('#validator').contentWindow;
    const fromPreview = event.source === $('#preview').contentWindow;
    const data = event.data, run = activeRun;
    if ((!fromTest && !fromPreview) || !loaded || !run || !data || data.runId !== run.id || data.projectId !== run.projectId || project.id !== run.projectId || $('#code-editor').value !== run.code) return;
    if (fromPreview && data.type === 'storage' && data.storage && typeof data.storage === 'object' && !Array.isArray(data.storage)) {
      const storage = Object.fromEntries(Object.entries(data.storage).filter(([, value]) => typeof value === 'string'));
      if (JSON.stringify(storage).length <= 200000) { state.sandbox[project.id] = storage; save(); }
      else notice('Exercise storage is limited to 200 KB per project. Reduce the amount of saved data.');
    }
    if (fromPreview && data.type === 'console') consoleRow(String(data.message).slice(0, 2000));
    if (data.type === 'error') consoleRow(String(data.message).slice(0, 2000), 'error');
    if (!fromTest || data.type !== 'result' || run.settled) return;
    run.settled = true; clearTimeout(timer); $('#validator').srcdoc = '';
    $('#run-code').textContent = '▶ Save & Run';
    const count = preview.checkCount(project);
    const valid = data.passed === true && data.total === count && data.passedCount === count && Array.isArray(data.results) && data.results.length === count && data.results.every(r => r.passed === true);
    lastPassed = valid;
    if (valid) { state = progress.complete(state, project.id, data, count); save(); }
    feedback(valid ? '✓ All checks passed. Project completed!' : 'Not quite yet. Review the checks below, edit your JavaScript, and try again.', valid ? 'success' : 'warning');
    $('#validation-results').hidden = false;
    $('#validation-results ul').replaceChildren(...(Array.isArray(data.results) ? data.results : []).map(result => {
      const li = document.createElement('li'); li.className = result.passed ? 'pass' : 'fail'; li.textContent = `${result.passed ? '✓' : '✕'} ${String(result.label)}`; return li;
    }));
    updateProgress();
  });
  function legacyWork() {
    const entries = Object.keys(localStorage).filter(key => key.startsWith('cd-'));
    if (!entries.length) return;
    notice('Your previous web work is still stored. The new curriculum uses stricter checks, so old completion flags are not counted as validated passes.');
    const button = document.createElement('button'); button.type = 'button'; button.textContent = 'Download previous work';
    button.addEventListener('click', () => {
      const data = Object.fromEntries(entries.map(key => [key, localStorage.getItem(key)]));
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url; a.download = 'codedaily-previous-work.json'; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    $('#app-notice').append(document.createElement('br'), button);
  }
  async function load() {
    loaded = false; enable(false); $('#load-error').hidden = true;
    try {
      if (!projects) {
        const paths = ['mobile/src/data/projects.json', 'mobile/src/data/resources.json', 'mobile/src/core/runtime-source.json'];
        const [catalog, localResources, runtime] = await Promise.all(paths.map(async path => { const response = await fetch(path); if (!response.ok) throw Error(`Cannot load ${path}`); return response.json(); }));
        if (catalog.length !== 100 || !progress || !window.createCodeDailyPreview) throw Error('The shared curriculum could not be loaded.');
        projects = catalog; resources = localResources; preview = window.createCodeDailyPreview(resources, runtime);
      }
      const raw = localStorage.getItem(KEY), restored = progress.restore(raw, projects);
      if (restored.recovered && raw) {
        localStorage.setItem(`${KEY}-recovery-${Date.now()}`, raw);
        notice('Saved progress needed repair. A recovery copy was preserved locally; valid drafts and completions were retained where possible.');
      }
      state = restored.state; loaded = true; enable(true); renderProject(); save();
      if (!restored.recovered) legacyWork();
      const hour = new Date().getHours(); $('#greeting').textContent = `Good ${hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'}, Gabriel.`;
    } catch (error) {
      loaded = false; enable(false); $('#complete-project').disabled = true; $('#save-status').textContent = 'Not loaded';
      $('#load-error p').textContent = `Could not load CodeDaily. Serve the project root over HTTP (for example: python3 -m http.server 8000). Existing progress has not been replaced. ${error.message}`;
      $('#load-error').hidden = false;
    }
  }
  $('#run-code').addEventListener('click', runCode);
  $('#swap-project').addEventListener('click', nextProject);
  $('#complete-project').addEventListener('click', () => { if (lastPassed) nextProject(); });
  $('#hint-button').addEventListener('click', () => {
    if (!loaded) return;
    state.hints[project.id] = Math.min(project.hints.length, (state.hints[project.id] || 0) + 1); save(); renderHints();
  });
  $('#reset-code').addEventListener('click', () => {
    if (loaded && confirm('Replace this draft with the starter JavaScript? Completion history is kept.')) { $('#code-editor').value = project.starterJavaScript; edit(); $('#preview').srcdoc = ''; switchPanel('code'); }
  });
  $('#code-editor').addEventListener('input', edit);
  $('#code-editor').addEventListener('scroll', updateLines);
  $('#code-editor').addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    event.preventDefault(); const editor = event.target;
    editor.setRangeText('  ', editor.selectionStart, editor.selectionEnd, 'end'); edit();
  });
  document.querySelectorAll('[data-panel]').forEach(button => button.addEventListener('click', () => switchPanel(button.dataset.panel)));
  document.querySelectorAll('[data-file]').forEach(button => button.addEventListener('click', () => showStarter(button.dataset.file)));
  $('#retry-save').addEventListener('click', save);
  $('#retry-load').addEventListener('click', () => location.reload());
  // A second tab must not silently overwrite a newer queue or completion record.
  window.addEventListener('storage', event => {
    if (event.key !== KEY || !loaded) return;
    loaded = false; invalidate(); enable(false); $('#complete-project').disabled = true;
    $('#load-error p').textContent = 'CodeDaily changed in another tab. Reload to use the latest saved progress.'; $('#load-error').hidden = false;
  });
  load();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});
})();
