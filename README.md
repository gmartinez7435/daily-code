# CodeDaily — JavaScript practice on the web

100 bundled mini-projects, from beginner through advanced JavaScript, in the existing CodeDaily layout. The phone project is no longer required. Curriculum, hints, explanations, mock APIs, validation and progress logic all live in this web project.

## Open the app

Open **index.html** in your browser. All app content loads through local script files; there is no JSON fetch or dependency on a mobile folder.

For a consistent browser-storage origin and offline page caching, run a static server from this folder:

```sh
python3 -m http.server 8000
```

Then visit **http://localhost:8000**. No npm installation, build step, API key, or backend is needed to use the app. Keep `data/` and `core/` next to `index.html` when copying or serving it. Use the same address and port to keep the same saved progress. Browser handling of storage for direct file URLs can vary; HTTP is the recommended daily-use option.

If you had the broken version open, refresh it once while online. The updated service worker replaces the old cache. It does not clear saved progress. After a successful load on localhost or HTTPS, the page and all content can load offline. For direct file opening, all content is already on disk; no service worker is needed.

## Learning behavior

- One project at a time, in a saved shuffled queue of 100 distinct IDs. Next advances without repetition until the cycle finishes, then reshuffles.
- The first cycle starts with beginner exercises and gradually introduces harder work. Similar concepts are spread apart.
- HTML/CSS appear immediately in the preview when a project loads. Provided files are displayed with readable indentation. Switch to JavaScript to write code, then use Save & Run. The editor and provided files use locally bundled syntax colors. Initial previews do not execute code or award completion.
- A visible sandboxed preview runs the project. A separate sandboxed test frame checks real outputs, events, boundary cases, storage and async behavior. Completion requires every expected check to pass; merely running code or changing text is insufficient.
- Drafts, hints, queue position, completed IDs/counts and project-local storage are saved in the browser. The existing `codedaily-progress-v1` storage key and project IDs are preserved.
- Old `cd-*` records stay stored and can be downloaded with the previous-work button. They are not counted as strict-validator passes.
- Fetch/API exercises use bundled simulated responses. Module exercises resolve to local data URLs. Normal practice requires no internet connection.

Finite behavioral tests accept equivalent implementations; they do not prove correctness for every possible input or act as a tamper-proof exam system. A browser-blocking infinite loop may require refreshing the tab.

## Files

| File | Purpose |
| --- | --- |
| `index.html`, `styles.css`, `app.js` | Existing layout/theme and web UI |
| `data/projects.js` | Single runtime catalog of all 100 projects |
| `data/resources.js` | Bundled API responses and module source |
| `core/progress.js` | Queue, completion, restoration and storage helpers |
| `core/runtime.js` | Sandboxed execution, mock fetch/storage and behavioral tests |
| `core/preview.js` | Preview/test document construction |
| `sw.js` | Offline app cache |
| `scripts/author-curriculum.cjs`, `scripts/explanations.cjs` | Recovered authoring source for the original 100 projects |
| `tests/solutions.json` | Reference solutions for development verification; not loaded by the app |
| `more-projects.js` | Unused original 30-project-era source, retained for reference |

To edit curriculum content, update the authoring source and run `node scripts/author-curriculum.cjs`. This regenerates the one catalog and test references. Do not edit the generated catalog separately.

## Development checks (optional)

Core checks need Node.js only:

```sh
node --test tests/*.test.cjs
```

Automated browser tests need the optional npm development dependency and a browser download:

```sh
npm install
PLAYWRIGHT_BROWSERS_PATH=.artifacts/browsers npx playwright install chromium --only-shell
PLAYWRIGHT_BROWSERS_PATH=.artifacts/browsers npm run test:browser
```

The browser suite tests all 100 reference solutions, rejects blank and unfinished starters, and exercises the real web app over HTTP, directly from disk, and with cached HTTP content offline. Browser downloads, screenshots and caches are temporary, Git-ignored files. They are not required for running CodeDaily.
