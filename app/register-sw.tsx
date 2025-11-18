'use client';

import { useEffect } from 'react';

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker 注册成功:', registration.scope);

            // 检查更新
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // 新的 Service Worker 已安装，提示用户刷新
                    if (confirm('发现新版本，是否立即更新？')) {
                      newWorker.postMessage({ type: 'SKIP_WAITING' });
                      window.location.reload();
                    }
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.error('Service Worker 注册失败:', error);
          });

        // 监听 Service Worker 控制器变化
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });
      });
    }
  }, []);

  return null;
}
