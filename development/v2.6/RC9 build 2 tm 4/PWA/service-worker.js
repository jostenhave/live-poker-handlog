/* WIJZIGING v2.6 RC9 Build 4 – 2026-08-08: dit is de vaste baseline/gate voor de strikte PWA-updateflow. Navigaties blijven op de gecachete actieve appversie; update-metadata wordt apart online opgehaald. */
const CACHE_NAME = 'live-poker-handlog-v2.6-rc9-pwa-3';

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

    /* AANDACHTSPUNT: Build 4 is een eenmalige architectuurmigratie vanuit de
       eerder gepubliceerde RC9 Build 3-worker. Build 3 gebruikt nog network-first
       navigatie en kan de strikte updatebarrière daarom zelf niet garanderen.
       Alleen deze overgang activeert Build 4 automatisch. Vanaf Build 4 worden
       toekomstige kandidaat-workers pas geregistreerd na 'Nu bijwerken'. */
    const names=await caches.keys();
    const migratingFromPreStrictRC9=names.some(name=>
      name==='live-poker-handlog-v2.6-rc9-pwa-1' ||
      name==='live-poker-handlog-v2.6-rc9-pwa-2'
    );
    if(migratingFromPreStrictRC9)self.skipWaiting();
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

async function activeVersionNavigation(request){
  /* Cache-first is hier bewust: zolang de actieve worker Build 4 is, blijft ook
     de Build 4-index actief. Een nieuwere server-index mag pas zichtbaar worden
     nadat de gebruiker de bijbehorende kandidaat-worker expliciet activeert. */
  return (
    await caches.match('./index.html') ||
    await caches.match(request) ||
    fetch(request)
  );
}

async function cacheFirstStatic(request){
  const cached=await caches.match(request);
  if(cached)return cached;

  const response=await fetch(request);
  if(response&&response.ok&&new URL(request.url).origin===self.location.origin){
    const cache=await caches.open(CACHE_NAME);
    await cache.put(request,response.clone());
  }
  return response;
}

self.addEventListener('fetch', event => {
  if(event.request.method!=='GET')return;

  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;

  /* pwa-update.json mag nooit uit de app-shellcache komen: dit bestand is juist
     het kleine online signaal waarmee de actieve app ziet dat een nieuwere
     kandidaatversie beschikbaar is. */
  if(url.pathname.endsWith('/pwa-update.json')){
    event.respondWith(fetch(event.request,{cache:'no-store'}));
    return;
  }

  if(event.request.mode==='navigate'){
    event.respondWith(activeVersionNavigation(event.request));
    return;
  }

  event.respondWith(cacheFirstStatic(event.request));
});
