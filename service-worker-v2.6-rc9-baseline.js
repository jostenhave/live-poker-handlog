/* WIJZIGING v2.6 RC9 PWA Baseline – 2026-08-08: versiegebonden immutable service worker.
   Alle navigaties binnen de app-scope worden door deze actieve worker naar zijn
   eigen versiegebonden HTML geleid. pwa-update.json blijft een netwerk-only
   detectiesignaal en registreert zelf nooit een nieuwe worker. */
const CACHE_NAME = 'live-poker-handlog-v2.6-rc9-baseline';
const APP_ENTRY = './app-v2.6-rc9-baseline.html';

const APP_SHELL = [
  APP_ENTRY,
  './manifest.webmanifest',
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
    /* Bewust geen automatische skipWaiting().
       Bij een eerste installatie is er geen oude actieve worker.
       Bij een update wordt activatie uitsluitend vanuit de pagina gestart nadat
       de gebruiker expliciet 'Nu bijwerken' heeft gekozen. */
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const names = await caches.keys();
    await Promise.all(
      names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
    );
    /* De expliciet geactiveerde nieuwe worker neemt de bestaande client over.
       De pagina luistert naar controllerchange en voert daarna één bewaakte reload uit. */
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function serveThisVersion() {
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

  /* Update-metadata moet altijd langs het netwerk.
     Detectie alleen verandert nooit de actieve service-workerregistratie. */
  if (url.pathname.endsWith('/pwa-update.json')) {
    event.respondWith(fetch(event.request, {cache:'no-store'}));
    return;
  }

  /* HARDE ARCHITECTUUREIS:
     iedere documentnavigatie binnen scope krijgt de HTML van de ACTIEVE versie,
     ongeacht of de browser /, /index.html of een refresh aanvraagt. */
  if (event.request.mode === 'navigate') {
    event.respondWith(serveThisVersion());
    return;
  }

  event.respondWith(cacheFirstStatic(event.request));
});
