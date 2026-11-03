const CACHE='soundpad-v2';
const FILES=['./','./index.html','./manifest.json'];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(FILES);await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('soundpad-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method==='GET')e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
