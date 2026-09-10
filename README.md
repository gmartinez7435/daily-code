# CodeDaily — web and iPhone

One 100-project JavaScript curriculum, with the original web interface and a native Expo mobile app. Both use the same exercise content, hints, explanations, mock APIs, ES modules, behavioral validators, and shuffle/progress algorithms. There is no AI generation or backend.

## Run the website

From this repository root:

```sh
python3 -m http.server 8000
```

Open **http://localhost:8000**. Any static HTTP server works; no npm install, build step, API key, or mobile dependencies are needed for the web app. Opening `index.html` directly as a `file://` URL is not supported because the app loads the shared JSON files.

Serve the repository root, not just index.html: the web page also needs `styles.css`, `app.js`, `sw.js`, and the referenced files in `mobile/src/`. Keep using the same hostname and port to retain the same browser storage.

After the first successful load on localhost or HTTPS, the service worker caches the app shell and all learning content for offline reloads. Online requests refresh cached files; failed network requests fall back to the cached version. A new browser/device still needs its initial load. The exercise preview never requires an internet API. Browser storage and cached content can be removed by browser settings or private-session cleanup.

## Run the iPhone app

Install Expo Go on the iPhone, then:

```sh
cd mobile
npm install
npx expo start --go
```

Use the same Wi-Fi on the Mac and iPhone, scan the QR code with the iPhone Camera, and open Expo Go. Dependencies are already installed in this checkout; `npm install` is for a fresh checkout or dependency changes.

Expo Go is a development preview. For reliable standalone offline cold launches, use the release-build and signing steps in [mobile/README.md](mobile/README.md). A release build bundles all content locally and needs no development server. Physical iPhone installation remains owner/device setup.

## Shared source layout

| Source | Used by |
| --- | --- |
| `mobile/src/data/projects.json` | Both apps; the one runtime curriculum catalog |
| `mobile/src/data/resources.json` | Both apps; local responses and module source |
| `mobile/src/core/progress.js` | Both apps; shuffled cycles, progress restoration, completion gating |
| `mobile/src/core/preview-factory.js` | Both apps; isolated preview/test documents and expected check counts |
| `mobile/src/core/runtime.browser.js` | Maintained browser runtime source |
| `mobile/src/core/runtime-source.json` | Both apps; generated runtime text protected from Metro transformations |
| `mobile/src/core/*.cjs` | Small CommonJS adapters for Expo and Node tests |
| `app.js` | Web DOM/editor/storage UI and authenticated-by-frame run messages |
| `mobile/App.tsx` | Native UI and AsyncStorage adapter |

The web page reads the existing catalog directly; no second web catalog or generated web copy is introduced. The source remains under `mobile/src/` to keep the Expo project self-contained. The browser-compatible shared files expose browser globals while the mobile adapters import the same implementations.

`more-projects.js` remains as unused legacy source, per the instruction not to delete source code. It is no longer loaded and does not contribute exercises or validation. `tests/solutions.json` is test-only reference code, not loaded by either app. Generated curriculum/runtime files are required application source and must not be removed as disposable build output.

See [all 100 projects](mobile/PROJECTS.md). To update authored content, edit `mobile/scripts/author-curriculum.cjs` or `mobile/scripts/explanations.cjs`, then run `npm run generate` from `mobile/`. Test both apps after shared-code changes.

## Web behavior and existing progress

Save & Run saves the draft, starts a visible sandboxed preview and a separate sandboxed validator, and records completion only after all expected behavioral checks pass. Tests exercise multiple inputs, DOM events, boundary conditions, storage, or async/timer behavior. Merely changing text, pressing Run, or clicking the completion button does not pass a project. Old-run messages and messages from any other frame are ignored. This is a learning tool, not a tamper-proof examination system; finite tests cannot prove correctness for every possible input.

Next moves through a persisted 100-project queue. Each project appears once per cycle, including skipped projects. The next cycle reshuffles; early first-cycle exercises are beginner-level, with related concepts spaced apart. Distinct completed projects and total per-cycle completions are tracked separately.

Web drafts, hint counts, queue, current position, completion records, and preview localStorage live in the browser under `codedaily-progress-v1`. Web saves occur on edits and state changes; failures leave the draft in memory with a visible Retry action. Reloading restores saved work. Another tab changing progress requires reload before further edits to avoid overwriting it. Web and mobile storage are separate; no sync or automatic transfer is claimed.

Old `cd-code-*` drafts and `cd-completions` records are retained verbatim. When present, **Download previous work** exports them without deleting them. They are not silently imported into different starter contracts, and old weak-validator completions do not count as passes under the new requirements.

A 20-second watchdog clears stalled runs when the browser can service it. Arbitrary learner JavaScript can still monopolize a browser thread; reload a frozen tab if necessary. Preview code runs in sandboxed frames without same-origin privileges, and actual external connections are blocked by CSP.

## Tests

The installed development tools live under `mobile/`:

```sh
cd mobile
npm run check
npm test
npm run test:web
npm run test:browser
```

Browser suites require Playwright browser binaries. Temporary project-local browser downloads were removed during final cleanup; see the optional browser setup commands in `mobile/README.md` when you deliberately want to rerun those suites. Running the website or either app does **not** require Playwright browsers. Do not reinstall browsers just to run the app.

Use `ENGINE=webkit` to select WebKit. Chromium tests exercise offline browser reload; the WebKit web test makes the HTTP server unavailable because Playwright's forced offline navigation returns an internal WebKit error before cached page loading. The shared preview suites still use offline browser contexts in both engines.

See [the verification and cleanup report](CLEANUP.md) for results, removed temporary files, retained source, and known external tool files.
