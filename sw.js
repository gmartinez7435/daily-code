// Cache only application source/content. Never cache dependencies or test/build artifacts.
const CACHE = 'codedaily-web-v4-syntax-preview';
const FILES = ['./', './index.html', './styles.css', './app.js',
  './data/projects.js', './data/resources.js', './core/progress.js', './core/runtime.js', './core/preview.js', './core/highlight.js'];
self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(CACHE);
  await cache.addAll(FILES);
  await self.skipWaiting();
})()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const key of await caches.keys()) if (key.startsWith('codedaily-web-') && key !== CACHE) await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  const known = FILES.some(file => new URL(file, self.registration.scope).pathname === new URL(event.request.url).pathname);
  if (!known) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    try {
      const response = await fetch(event.request);
      if (response.ok) await cache.put(new URL(new URL(event.request.url).pathname, self.location.origin), response.clone());
      return response;
    } catch (error) {
      const saved = await cache.match(event.request, { ignoreSearch: true });
      if (saved) return saved;
      throw error;
    }
  }));
});
