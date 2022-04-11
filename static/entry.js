// fetch('/manifest')
//   .then((res) => res.json())
//   .then((data) => {
//     console.log('data', data);
//     const stringManifest = JSON.stringify(data);
//     const blob = new Blob([stringManifest], {
//       type: 'application/json',
//     });
//     const manifestURL = URL.createObjectURL(blob);
//     const manifestDom = document.querySelector('#manifest');
//     if (manifestDom) {
//       manifestDom.setAttribute('href', manifestURL);
//     }
//   })
//   .catch((err) => console.log('err', err));
if ('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window) {
  document.addEventListener('DOMContentLoaded', function () {
    let swRegistration;
    let newWorker;
    let isSubscribed = false;
    let deferredPrompt = null;
    let lastIgnoreTs = parseInt(localStorage.getItem('_pwaIgnore') || '0');
    // PUSH_PRIVATE_KEY in server config.js
    const applicationServerPublicKey = 'BGwZ7R1oOio1xs61Jgm34qguAKsU2w96XrSs22TpK-yK9goD0Qidfp7tpjDvG8T1Zu4vdKJp_Ev93U0iWPRmP9c';

    const subscribeAreaId = document.querySelector('#subscribe-area');

    subscribeAreaId.addEventListener('click', (e) => {
      if (deferredPrompt !== null) {
        if (e.target.id === 'subscribe-area-close') {
          // 点击关闭的话，记录时间戳
          localStorage.setItem('_pwaIgnore', Date.now())
        } else {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            console.log(choiceResult.outcome);
          });
          deferredPrompt = null;
        }
        subscribeAreaId.style.display = 'none';
      }
    })

    function registerServiceWorker() {
      return navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
      }).then(registration => {
        console.log('Service worker successfully registered.');
        return registration;
      })
    }
    // 启动
    function start() {
      registerServiceWorker().then(swReg => {
        swRegistration = swReg;
        console.log('Service Worker Registered', swReg);
        swReg.addEventListener('updatefound', () => {
          console.log(' updatefound event-> ');
          // An updated service worker has appeared in reg.installing!
          newWorker = swReg.installing;
          newWorker.addEventListener('statechange', () => {
            // Has service worker state changed?
            if (newWorker.state === 'installed') {
              // There is a new service worker available, show the notification
              console.log(' installed-> ');
            }
          });
        });
        // 检测订阅情况
        getInitialSubscribeStatus();
        // 如果未用户曾选择过是否接收通知，会通知用户选择
        Notification.requestPermission(result => {
          if (result === 'granted') {
            console.log('Access granted! :)')
          } else if (result === 'denied') {
            console.log('Access denied! :(')
          } else {
            console.log('Request ignored! :/')
          }
        })
      }).catch((err) => {
        console.log('Service Worker Registered failed', err);
      });
    }

    function getInitialSubscribeStatus() {
      swRegistration.pushManager.getSubscription().then((subscription) => {
        console.log('initializeSubscription ', subscription);
        isSubscribed = subscription !== null;
        // 如果已经订阅则存储subscription信息，否则尝试订阅
        if (isSubscribed) {
          console.log('User IS subscribed.');
          console.log('storing subscription');
          storeSubscription({
            subscribe: true,
            subscription,
          });
        } else {
          console.log('User IS NOT subscribed.');
          console.log('try to subscribing');
          subscribeUser();
        }
      });
    }

    function doSubscription() {
      // maybe timeout because of the GFW. For example, google fcm push service
      return Promise.race([
        swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey),
        }),
        timeoutPromise(30000),
      ]);
    }

    function storeSubscription({ subscription, subscribe }) {
      fetch('https://public.daozhao.com.cn/daozhao/push/subscribe', {
        method: 'post',
        body: JSON.stringify({
          subscription,
          subscribe,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log('storeSubscription successful', res);
      }).catch((err) => {
        console.log('storeSubscription fail', err);
      });
    }

    function subscribeUser() {
      doSubscription().then((subscription) => {
        console.log('User is subscribed.');
        storeSubscription({
          subscribe: true,
          subscription,
        });
        isSubscribed = true;
      }).catch((err) => {
        console.log('Failed to subscribe the user: ', err);
      });
    }

    function unsubscribeUser() {
      let oldSubscription;
      doSubscription().then(function(subscription) {
        if (subscription) {
          oldSubscription = subscription;
          return subscription.unsubscribe();
        }
      }).catch(function(error) {
        console.log('Error unsubscribing', error);
      }).then(function(result) {
        console.log('User is unsubscribed.', result);

        storeSubscription({
          subscribe: false,
          subscription: oldSubscription,
        });
        isSubscribed = false;
      });
    }

    function urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    function timeoutPromise(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(`Timeout after ${ms} ms`);
        }, ms);
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt event', e);
      // beforeinstallprompt event fired
      deferredPrompt = e;
      // 取消默认事件
      // 放弃自定义安装过程
      // e.preventDefault();
      // // 显示自定义的订阅区域 未忽略或距离上次忽略大于24小时
      // if ((lastIgnoreTs === 0) || (lastIgnoreTs - Date.now() > 86400000)) {
      //   subscribeAreaId.style.display = 'flex';
      //   console.log('Show custom install prompt');
      // } else {
      //   console.log('Ignore custom install prompt', lastIgnoreTs - Date.now());
      // }
      // return false;
    });
    // 用户选择了安装
    window.addEventListener('appinstalled', (event) => {
      console.log('appinstalled event', event);
      // 已经有权限了say Hello
      swRegistration && swRegistration.showNotification('Thanks for install Daozhao lite! ', {
        body: 'Study together! Enjoy together ! ',
        icon: 'https://www.daozhao.com/res/icons/icon-384.png',
        badge: 'https://www.daozhao.com/res/icons/icon-384.png',
        actions: [
          {
            action: 'https://www.daozhao.com',
            title: 'Daozhao',
          },
        ],
      }).then(res => {
        console.log('Said hello to Daozhao lite -> ');
      });
    });

    start();

    document.querySelector('.share-wrap').addEventListener('click', () => {
      console.log('reload event -> ', newWorker);
      newWorker && newWorker.postMessage({ action: 'skipWaiting' });
    });
  })
} else {
  console.log('Not support all PWA requirements');
}
