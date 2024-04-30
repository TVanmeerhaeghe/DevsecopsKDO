/*eslint-disable no-restricted-globals*/

const assetVersion = 1;
const assetCacheKey = "assets-v" + assetVersion;
const apiCacheKey = "api-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(assetCacheKey).then((cache) => {
      return cache.addAll([
        "/",
        "/src/app.css",
        "/src/index.css",
        "/src/app.js",
        "/public/service-worker.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (
    request.url.startsWith(self.location.origin) &&
    !request.url.startsWith("chrome-extension://")
  ) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cacheResponse = await caches.match(request);
  return cacheResponse || fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open(apiCacheKey);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response("Hors ligne", { status: 503 });
  }
}
