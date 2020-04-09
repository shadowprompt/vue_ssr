const cacheName = 'daozhao-v1.0.4';
const filesToCache = [
  '/favicon.ico',
  '/owner.jpg',
  '/qrcode.jpg',
  '/entry.js',
];

self.addEventListener('install', (e) => {
  console.log('install event');
  // A promise passed to installEvent.waitUntil() signals the duration and success or failure of your install.
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
      .catch((err) => {
        console.log('err', err);
      }),
  );

  // self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  console.log('activate event');
  const cacheWhitelist = [cacheName];
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            // 删除无效版本
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          } else {
            // 删除当前版本中的不需要缓存的文件
            const { origin } = location;
            return caches.open(key).then((theCache) =>
              theCache.keys().then((list) => {
                const needDeleted = list.filter(
                  (item) =>
                    !filesToCache.includes(item.url.replace(origin, '')),
                );
                console.log('needDeleted', needDeleted);
                return Promise.all(
                  needDeleted.map((item) => theCache.delete(item)),
                );
              }),
            );
          }
        }),
      );
      // By default, a page's fetches won't go through a service worker unless the page request itself went through a service worker.
      // So you'll need to refresh the page to see the effects of the service worker
      //clients.claim() can override this default, and take control of non-controlled pages.
    }),
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  console.log('fetch', event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      const url = new URL(event.request.url);
      if (response) {
        console.log('hit successful');
        return response;
      }
      console.log('hit fail');
      const fetchResult = fetch(event.request);
      fetchResult.then((response) => {
        // Check if we received a valid response, 'basic' indicates that it's a request from our origin
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 如果需要将未命中的存入缓存
        const responseToCache = response.clone();
        // // IMPORTANT: Clone the response. A response is a stream
        // // and because we want the browser to consume the response
        // // as well as the cache consuming the response, we need
        // // to clone it so we have two streams.
        caches.open(cacheName)
          .then((cache) => {
            if (event.request.method !== 'POST') { // can not handle POST method
              const whiteList = ['webpack', 'hmr', 'service-worker'];
              const notToCache = whiteList.some(item => url.pathname.includes(item));
              if (!notToCache) {
                console.log('push to filesToCache -> ', url.pathname);
                cache.put(event.request, responseToCache);
              }
            }
          });
        return response;
      });
      console.log('fetchResult -> ', fetchResult);
      return fetchResult;
    }),
  );
});

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.', event);
  let msg;
  try {
    msg = event.data.json();
  } catch (e) {
    msg = event.data.text();
  }

  console.log('[Service Worker] Push msg ', msg);
  console.log('[Service Worker] Push had this data: ', event);

  const title = msg.title || '消息主题';
  const options = {
    body: msg.body || '消息内容',
    icon: msg.icon || 'https://www.daozhao.com/qrcode.jpg',
    badge: msg.badge || 'https://www.daozhao.com/owner.jpg',
    actions: [
      {
        action: msg.action || 'https://www.daozhao.com',
        title: msg.actionTitle || '道招网',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.', event);

  event.notification.close();
  let url;
  if (/http(s)?:\/\//.test(event.action)) {
    url = event.action;
  } else {
    url = 'https://www.daozhao.com';
  }
  event.waitUntil(self.clients.openWindow(url));
});

self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Sync Received.', event);
  console.log(`[Service Worker] Sync had this data: ${event.tag}`);
});

self.addEventListener('message', function (event) {
  console.log(' message event -> ', event);
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
