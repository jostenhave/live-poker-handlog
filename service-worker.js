/* WIJZIGING v2.6 RC9 Build 3 – 2026-08-08: cache-identiteit verhoogd van rc9-pwa-1 naar rc9-pwa-2 zodat Build 2 een nieuwe wachtende service worker detecteert en de zichtbare updateflow kan tonen. */
const CACHE_NAME = 'live-poker-handlog-v2.6-rc9-pwa-2';

const APP_SHELL = [
  './',
  './index.html',
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
    const cache=await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);

    // Eenmalige bootstrap vanuit de oude v2.5-PWA, die nog geen zichtbare update-UI kent.
    // Vanaf RC9 Build 2 wachten volgende workers juist op "Nu bijwerken".
    const names=await caches.keys();
    const upgradingFromLegacyV25=names.some(name=>name.startsWith('live-poker-handlog-v2.5-'));
    if(upgradingFromLegacyV25)self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const cacheNames=await caches.keys();
    await Promise.all(
      cacheNames
        .filter(cacheName => cacheName !== CACHE_NAME)
        .map(cacheName => caches.delete(cacheName))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if(event.data&&event.data.type==='SKIP_WAITING'){
    self.skipWaiting();
  }
});

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
      await cache.put('./index.html', response.clone());
    }
    return response;
  } catch (error) {
    return (
      await caches.match(request) ||
      await caches.match('./index.html') ||
      await caches.match('./')
    );
  }
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

  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(event.request));
    return;
  }

  event.respondWith(cacheFirstStatic(event.request));
});
