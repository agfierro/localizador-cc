const CACHE = 'localizador-cc-v15';
const ASSETS = [
  './', './index.html', './manifest.json', './favicon.ico',
  './favicon-16.png', './favicon-32.png', './apple-touch-icon.png',
  './icon-192.png', './icon-512.png',
  './plano_campa.png', './P0.png', './P1.png', './P2.png',
  './P4.png', './P8.png', './NA.png', './Telefonos_Galerias.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then(r => r || caches.match('./index.html')))
  );
});
