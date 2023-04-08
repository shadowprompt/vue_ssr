<template>
  <div class="subscribe-btn" :style="{display: this.display}" @click="this.handleInstallClick">安装</div>
</template>

<script>
  import {urlB64ToUint8Array, timeoutCallWithLaTrack} from './utils';
  // PUSH_PRIVATE_KEY in server config.js
  const applicationServerPublicKey = 'BGwZ7R1oOio1xs61Jgm34qguAKsU2w96XrSs22TpK-yK9goD0Qidfp7tpjDvG8T1Zu4vdKJp_Ev93U0iWPRmP9c';
  export default {
    name: 'PWA',
    data() {
      return {
        display: '',
      };
    },
    mounted() {
      this.init();
      this.register();
      this.PWAListenerRegister();
      this.start();
    },
    methods: {
      init() {
        this.swRegistration = null;
        this.newWorker = null;
        this.isSubscribed = false;
        this.deferredPrompt = null;
        this.subscribeAreaId = document.querySelector('#subscribe-area');
        this.lastIgnoreTs = parseInt(localStorage.getItem('_pwaIgnore') || '0');
      },
      handleInstallClick(e) {
        if (this.deferredPrompt !== null) {
          if (e.target.id === 'subscribe-area-close') {
            // 点击关闭的话，记录时间戳
            localStorage.setItem('_pwaIgnore', Date.now())
          } else {
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choiceResult) => {
              console.log(choiceResult.outcome);
            });
            this.deferredPrompt = null;
          }
          this.display = 'none';
        }
      },
      registerServiceWorker() {
        return navigator.serviceWorker.register('/_service-worker.js', {
          scope: '/',
        }).then(registration => {
          console.log('Service worker successfully registered.');
          return registration;
        })
      },
      start() {
        this.registerServiceWorker().then(swReg => {
          this.swRegistration = swReg;
          console.log('Service Worker Registered', swReg);
          swReg.addEventListener('updatefound', () => {
            console.log(' updatefound event-> ');
            // An updated service worker has appeared in reg.installing!
            this.newWorker = swReg.installing;
            this.newWorker.addEventListener('statechange', () => {
              // Has service worker state changed?
              if (this.newWorker.state === 'installed') {
                // There is a new service worker available, show the notification
                console.log(' installed-> ');
              }
            });
          });
          // 检测订阅情况
          this.getInitialSubscribeStatus();
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
      },
      getInitialSubscribeStatus() {
        this.swRegistration.pushManager.getSubscription().then((subscription) => {
          console.log('initializeSubscription ', subscription);
          this.isSubscribed = subscription !== null;
          // 如果已经订阅则存储subscription信息，否则尝试订阅
          if (this.isSubscribed) {
            console.log('User IS subscribed.');
            console.log('storing subscription');
            this.storeSubscription({
              subscribe: true,
              subscription,
            });
          } else {
            console.log('User IS NOT subscribed.');
            console.log('try to subscribing');
            this.subscribeUser();
          }
        });
      },
      doSubscription() {
        return timeoutCallWithLaTrack(15000, 'pwaTimeout', 'PWA:subscribe')(
          this.swRegistration.pushManager.subscribe.bind(this.swRegistration.pushManager), {
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey),
        });
      },
      storeSubscription({ subscription, subscribe }) {
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
      },
      subscribeUser() {
        this.doSubscription().then((subscription) => {
          console.log('User is subscribed.');
          this.storeSubscription({
            subscribe: true,
            subscription,
          });
          this.isSubscribed = true;
        }).catch((err) => {
          console.log('Failed to subscribe the user: ', err);
        });
      },
      unsubscribeUser() {
        let oldSubscription;
        this.doSubscription().then(function(subscription) {
          if (subscription) {
            oldSubscription = subscription;
            return subscription.unsubscribe();
          }
        }).catch(function(error) {
          console.log('Error unsubscribing', error);
        }).then(function(result) {
          console.log('User is unsubscribed.', result);

          this.storeSubscription({
            subscribe: false,
            subscription: oldSubscription,
          });
          this.isSubscribed = false;
        });
      },
      PWAListenerRegister() {
        window.addEventListener('beforeinstallprompt', (e) => {
          console.log('beforeinstallprompt event', e);
          // beforeinstallprompt event fired
          this.deferredPrompt = e;
          // 取消默认事件
          // 放弃自定义安装过程
          // e.preventDefault();
          // // 显示自定义的订阅区域 未忽略或距离上次忽略大于24小时
          // if ((this.lastIgnoreTs === 0) || (this.lastIgnoreTs - Date.now() > 86400000)) {
          //   this.subscribeAreaId.style.display = 'flex';
          //   console.log('Show custom install prompt');
          // } else {
          //   console.log('Ignore custom install prompt', this.lastIgnoreTs - Date.now());
          // }
          // return false;
        });
        // 用户选择了安装
        window.addEventListener('appinstalled', (event) => {
          console.log('appinstalled event', event);
          // 已经有权限了say Hello
          this.swRegistration && this.swRegistration.showNotification('Thanks for install Daozhao lite! ', {
            body: 'Study together! Enjoy together ! ',
            icon: 'https://www.daozhao.com/_res/icons/icon-384x384.png',
            badge: 'https://www.daozhao.com/_res/icon.png',
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
      },
      register() {
        document.querySelector('.share-wrap').addEventListener('click', () => {
          console.log('reload event -> ', this.newWorker);
          this.newWorker && this.newWorker.postMessage({ action: 'skipWaiting' });
        });
      }
    }
  }
</script>
