const OFFLINE_VERSION = 1;
const CACHE_NAME = 'offline';
const RESOURCES_TO_PRELOAD = [
	'index.html',
	'register-worker.js',
	'manifest.webmanifest'
];
// Customize this with a different URL if needed.
const OFFLINE_URL = 'offline.html';

/* 
   // Note: if you want to preload the UI5 core and mobile libraries by install,
   // uncomment this block of code
	const cdnBase = 'https://openui5.hana.ondemand.com/resources/';
	resourcesToCache = resourcesToCache.concat([
		`${cdnBase}sap-ui-core.js`,
		`${cdnBase}sap/ui/core/library-preload.js`,
		`${cdnBase}sap/ui/core/themes/sap_belize_plus/library.css`,
		`${cdnBase}sap/ui/core/themes/base/fonts/SAP-icons.woff2`,
		`${cdnBase}sap/m/library-preload.js`,
		`${cdnBase}sap/m/themes/sap_belize_plus/library.css`
	]);
*/
debugger;
// Push
self.addEventListener('notificationclick', function (e) {
	var notification = e.notification;
	var action = e.action;

	if (action === 'close') {
		console.log('Other than Close');
		notification.close();
	} else {
		console.log('Other than Close');
		// return clients.openWindow('/');
	}
});



// Preload some resources during install
self.addEventListener('install', function (event) {
	console.log("Installed");
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(RESOURCES_TO_PRELOAD);
			// if any item isn't successfully added to
			// cache, the whole operation fails.
		}).catch(function (error) {
			console.error(error);
		})
	);
});

// Delete obsolete caches during activate
self.addEventListener('activate', function (event) {
	console.log("ACTIVATING");
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== CACHE_NAME) {
					return caches.delete(key);
				}
			}));
		})
	);
});

// During runtime, get files from cache or -> fetch, then save to cache
self.addEventListener('fetch', function (event) {
	console.log('Fetch');
	// only process GET requests
	if (event.request.method === 'GET') {
		event.respondWith(
			caches.match(event.request).then(function (response) {
				if (response) {
					return response; // There is a cached version of the resource already
				}

				let requestCopy = event.request.clone();
				return fetch(requestCopy).then(function (response) {
					// opaque responses cannot be examined, they will just error
					if (response.type === 'opaque') {
						// don't cache opaque response, you cannot validate it's status/success
						return response;
						// response.ok => response.status == 2xx ? true : false;
					} else if (!response.ok) {
						console.error(response.statusText);
					} else {
						return caches.open(CACHE_NAME).then(function (cache) {
							cache.put(event.request, response.clone());
							return response;
							// if the response fails to cache, catch the error
						}).catch(function (error) {
							console.error(error);
							return error;
						});
					}
				}).catch(function (error) {
					// fetch will fail if server cannot be reached,
					// this means that either the client or server is offline
					console.error(error);
					return caches.match('offline-404.html');
				});
			})
		);
	}
	if (event.request.mode === 'navigate') {
		event.respondWith((async () => {
			try {
				// First, try to use the navigation preload response if it's supported.
				const preloadResponse = await event.preloadResponse;
				if (preloadResponse) {
					return preloadResponse;
				}

				const networkResponse = await fetch(event.request);
				return networkResponse;
			} catch (error) {
				// catch is only triggered if an exception is thrown, which is likely
				// due to a network error.
				// If fetch() returns a valid HTTP response with a response code in
				// the 4xx or 5xx range, the catch() will NOT be called.
				console.log('Fetch failed; returning offline page instead.', error);

				const cache = await caches.open(CACHE_NAME);
				const cachedResponse = await cache.match(OFFLINE_URL);
				return cachedResponse;
			}
		})());
	}
});