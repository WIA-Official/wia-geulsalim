/**
 * WIA 글살림 Service Worker
 * Cache-first for static assets, Network-first for HTML
 * 弘益人間 — 오프라인에서도 최소한 기본 정보는 보이도록
 */

const CACHE_VERSION = 'wia-geulsalim-v2026-04-24-a';
const OFFLINE_URL = '/offline.html';
const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/js/a11y-widget.js',
  '/assets/images/favicon.svg',
  '/assets/pwa/icon-192.png',
  '/assets/pwa/icon-512.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(PRECACHE_URLS).catch(() => {});
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // HTML: Network-first with offline fallback
  if (request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE_VERSION);
          cache.put(request, fresh.clone());
          return fresh;
        } catch (_) {
          const cached = await caches.match(request);
          return cached || caches.match(OFFLINE_URL);
        }
      })()
    );
    return;
  }

  // Static assets: Cache-first
  if (/\.(css|js|woff2?|ttf|svg|png|jpg|jpeg|webp|ico|json)$/i.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE_VERSION);
          cache.put(request, fresh.clone());
          return fresh;
        } catch (_) {
          return new Response('', { status: 504 });
        }
      })()
    );
  }
});
