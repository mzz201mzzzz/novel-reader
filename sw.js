// Service Worker - Offline support
const CACHE_NAME = "novel-reader-v2";
const ASSETS = [
  ".",
  "index.html",
  "manifest.json",
  "css/style.css",
  "js/storage.js",
  "js/data.js",
  "js/reader.js",
  "js/app.js",
  "novels/fanren-xiuxian-zhuan.js",
  "novels/mushen-ji.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
