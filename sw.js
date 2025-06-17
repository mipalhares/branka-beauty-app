const CACHE_NAME = 'branka-beauty-experience-v10';
const urlsToCache = [
  '/logo-192.png',
  '/logo-512.png',
  '/',
  '/index.html',
  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
  '/manifest.json',
  
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache).then(() => {
          console.log('Cache populated with', urlsToCache, 'at', new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
        });
      })
      .catch(err => console.error('Cache open or population failed at', new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }), ':', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (!response) {
          console.log('Cache miss for', event.request.url, 'at', new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
        }
        return response || fetch(event.request).then(networkResponse => {
          if (event.request.url.includes()) {
            console.log('Fetched logo.png, status:', networkResponse.status, 'at', new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
          }
          return networkResponse;
        });
      })
      .catch(err => console.error('Fetch failed at', new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }), ':', err))
  );
});