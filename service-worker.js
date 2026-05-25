// service-worker.js
const CACHE_NAME = 'raspisanie-sluzhb-v1';

const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'styles/style.css',
  'scripts/app.js',
  'scripts/schedule.js',
  'scripts/utils.js',
  'scripts/export.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});