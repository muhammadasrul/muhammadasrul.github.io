importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
    } else {
    console.log(`Boo! Workbox didn't load 😬`);
}

const {registerRoute} = workbox.routing;
const {precacheAndRoute} = workbox.precaching;
const {StaleWhileRevalidate} = workbox.strategies;
const {CacheFirst} = workbox.strategies;
const {CacheableResponsePlugin} = workbox.cacheableResponse;
const {ExpirationPlugin} = workbox.expiration;

const urlsToCache = [
    { url: '/', revision: '1'},
    { url: '/manifest.json', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/regist.js', revision: '1' },
    { url: '/matchdetail.html', revision: '1' },
    { url: '/teamdetail.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/fabaction.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/notif.js', revision: '1' },
    { url: '/img/icons/icon-72x72.png', revision: '1' },
    { url: '/img/icons/icon-96x96.png', revision: '1' },
    { url: '/img/icons/icon-128x128.png', revision: '1' },
    { url: '/img/icons/icon-144x144.png', revision: '1' },
    { url: '/img/icons/icon-152x152.png', revision: '1' },
    { url: '/img/icons/icon-192x192.png', revision: '1' },
    { url: '/img/icons/icon-384x384.png', revision: '1' },
    { url: '/img/icons/icon-512x512.png', revision: '1' },
];

  
precacheAndRoute(urlsToCache, {
    // Ignore all URL parameters.
    ignoreURLParametersMatching: [/.*/]
});

registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    new StaleWhileRevalidate()
)

registerRoute(
    new RegExp('pages/'),
    new StaleWhileRevalidate({
        cacheName: 'pages'
    })
);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
                }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

self.addEventListener("push", function(event) {
    var body;
    if(event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});