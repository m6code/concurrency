// Chrome's currently missing some useful cache methods,
// this polyfill adds them.
importScripts('polyfill.js');

const CACHE_NAME = 'concurrency-cache-v3';
const urls_to_cache = [
    './',
    './assets/css/material.teal-pink.min.css',
    './assets/css/bootstrap.min.css',
    './assets/css/style.css',
    './assets/img/AppLogo.png',
    './assets/img/Toggle%20On.png',
    './assets/img/Instagram.png',
    './assets/img/Facebook.png',
    './assets/img/Twitter.png',
    './assets/img/Web.png',
    './assets/img/welcome_card.jpg',
    './assets/js/http.js',
    './assets/js/app.js',
    './assets/js/material.min.js',
    './assets/js/bootstrap.min.js',
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    //'logging.js'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urls_to_cache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response.
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', function(event) {

    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});