const CACHE_NAME = 'dealkart-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    'https://i.ibb.co/k6Hy4TTP/1770736037665.png'
];

// 1. Install Event: फाइलों को कैश में सेव करना
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching essential assets...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. Activate Event: पुरानी फाइलों को साफ़ करना (Very Important!)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 3. Fetch Event: इंटरनेट न होने पर कैश से दिखाना
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // अगर फाइल कैश में है तो वहीं से दें, वरना नेटवर्क से लाएं
            return response || fetch(event.request);
        })
    );
});
