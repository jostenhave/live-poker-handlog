const CACHE_NAME = 'live-poker-handlog-v2.8-pwa-1';
const APP_ENTRY = './app-v2.8.html';
const MANUAL_PATH = './docs/Gebruikershandleiding Live Poker Handlog.pdf';

const APP_SHELL = [
  APP_ENTRY,
  './manifest.webmanifest',
  MANUAL_PATH,
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/maskable-512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/favicon-32.png',
  './assets/icons/favicon-16.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async()=>{
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    // Een bestaande installatie activeert een nieuwe versie alleen na de expliciete updatekeuze.
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const names = await caches.keys();
    await Promise.all(
      names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function serveActiveVersion() {
  const cached = await caches.match(APP_ENTRY);
  if (cached) return cached;
  return fetch(APP_ENTRY, {cache:'no-store'});
}

async function cacheFirstStatic(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response && response.ok && new URL(request.url).origin === self.location.origin) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Update-metadata blijft netwerk-only; alleen detecteren wijzigt nooit de actieve appversie.
  if (url.pathname.endsWith('/pwa-update.json')) {
    event.respondWith(fetch(event.request, {cache:'no-store'}));
    return;
  }

  // De handleiding is een echte documentresource en mag niet door de appnavigatie worden vervangen.
  if (decodeURIComponent(url.pathname).endsWith('/docs/Gebruikershandleiding Live Poker Handlog.pdf')) {
    event.respondWith(cacheFirstStatic(event.request));
    return;
  }

  // Iedere overige documentnavigatie binnen de scope blijft gekoppeld aan de daadwerkelijk actieve appversie.
  if (event.request.mode === 'navigate') {
    event.respondWith(serveActiveVersion());
    return;
  }

  event.respondWith(cacheFirstStatic(event.request));
});
