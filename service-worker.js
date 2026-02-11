const CACHE_NAME = "my-site-cache-v1";

// Install: Sirf basic files cache karega
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/", "/index.html"]);
    })
  );
});

// Activate: Purane cache ko saaf karega
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch: Isse products load hona band nahi honge
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Agar internet chal raha hai, toh naya data dikhao
        return response;
      })
      .catch(() => {
        // Agar internet nahi hai, toh purana cached data dikhao
        return caches.match(event.request);
      })
  );
});
