const cacheName = 'simple-app';
const filesToCache = [
    '/',
    'index.html',
    'start.html',
    'app.html',
    'question.html',
    'leaderboard.html',
    '/js/',
    '/images/Treasure.hunt.png',
    '/images/icons/',
    '/css/',
    "main.js"
];
//Start the service worker and cache all the app's content.
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});
//Define which content to retrieve when the app is offline.
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});