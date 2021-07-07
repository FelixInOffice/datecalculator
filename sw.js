// Cache name
const cacheName = 'v8';

// install cache
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll(["./index.html",
							"./index.js",
							"./sw.js",
							"./scripts/moment-with-locales.min.js",
							"./styles/style.css",
							"./manifest.json",
							"./maskable_icon.png",
							"./icon-192x192.png",
							"./icon-256x256.png",
							"./icon-384x384.png",
							"./icon-512x512.png"
							]) + skipWaiting();
							
		})
	);
});

// request cache
self.addEventListener('fetch', function(event) {
	event.respondWith(
	  caches.match(event.request).then(function(resp) {
		return resp || fetch(event.request).then(function(response) {
		  return caches.open(cacheName).then(function(cache) {
			cache.put(event.request, response.clone());
			return response;
		  });
		});
	  })
	);
});

// update and delete old cache
self.addEventListener('activate', (event) => {
	var cacheKeeplist = [cacheName];
  
	event.waitUntil(
	  caches.keys().then((keyList) => {
		return Promise.all(keyList.map((key) => {
		  if (cacheKeeplist.indexOf(key) === -1) {
			return caches.delete(key);
		  }
		}));
	  })
	);
});