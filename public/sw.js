// Service Worker for PWA
const CACHE_NAME = 'weiz-nav-v1';
const RUNTIME_CACHE = 'weiz-nav-runtime';

// 需要预缓存的静态资源
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/logo.png',
];

// 安装事件 - 预缓存静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // 强制激活新的 Service Worker
  self.skipWaiting();
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
  // 立即控制所有页面
  self.clients.claim();
});

// Fetch 事件 - 网络优先，失败时使用缓存
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 跳过非 GET 请求
  if (request.method !== 'GET') {
    return;
  }

  // 跳过 Chrome 扩展请求
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // 对于 API 请求，使用网络优先策略
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 克隆响应并缓存
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // 网络失败时，尝试从缓存获取
          return caches.match(request);
        })
    );
    return;
  }

  // 对于静态资源，使用缓存优先策略
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        // 只缓存成功的响应
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // 克隆响应并缓存
        const responseClone = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });

        return response;
      });
    })
  );
});

// 消息事件 - 处理来自页面的消息
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
