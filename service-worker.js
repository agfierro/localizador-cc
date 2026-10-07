const CACHE='localizador-cc-v18';
const ASSETS=["./", "index.html", "manifest.json", "NA.png", "P0.png", "P1.png", "P2.png", "P4.png", "P8.png", "Telefonos_Galerias.png", "Cubierta_Dique_D.jpg", "T3-C16_EXT-TIERRA-Modelo.png", "P1-PS2.png", "P1-PS1.png", "P1-P00.png", "P1-P01.png", "P1-P02.png", "P1-P03.png", "P1-P04.png", "plano_campa.png", "favicon-16.png", "favicon-32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./'))))});
