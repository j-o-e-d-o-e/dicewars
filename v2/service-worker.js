const cacheName = 'cache-v2';
const precacheResources = [
  '/', '/index.html', '/css/style.css', '/css/my-style.css', '/js/app.js',
  '/favicon.ico', '/icon.png', '/icon.svg', '/robots.txt', '/site.webmanifest',
];
for (let i = 1; i <= 8; i++) {
  precacheResources.push(`/img/cube-${i}.svg`, `/img/cube-${i}-sm.svg`);
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources.map(resource => '/dicewars' + resource))));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});
