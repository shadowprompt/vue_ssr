let swRegistration;
let isSubscribed = false;
const applicationServerPublicKey =
  'BGwZ7R1oOio1xs61Jgm34qguAKsU2w96XrSs22TpK-yK9goD0Qidfp7tpjDvG8T1Zu4vdKJp_Ev93U0iWPRmP9c';

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

if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((swReg) => {
        swRegistration = swReg;
        console.log('Service Worker Registered', swReg);
        start();
      })
      .catch((err) => {
        console.log('Service Worker Registered faile', err);
      });
  });
} else {
  console.warn('Push messaging is not supported');
}

function getInitialSubscribeStatus() {
  swRegistration.pushManager.getSubscription().then((subscription) => {
    console.log('initializeSubscription ', subscription);
    isSubscribed = subscription !== null;

    if (isSubscribed) {
      console.log('User IS subscribed.');
      storeSubscription({
        subscribe: true,
        subscription,
      });
    } else {
      console.log('User IS NOT subscribed.');
    }
  });
}

function start() {
  // 检测订阅情况
  getInitialSubscribeStatus();
  subscribeUser();
}

function doSubscription() {
  // maybe timeout because of the GFW. For example, google fcm push service
  return Promise.race([
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey),
    }),
    timeoutPromise(5000),
  ]);
}

function storeSubscription({ subscription, subscribe }) {
  fetch('https://www.daozhao.com.cn/push/subscribe', {
    method: 'post',
    body: JSON.stringify({
      subscription,
      subscribe,
    }),
  })
    .then((res) => {
      console.log('storeSubscription successful', res);
    })
    .catch((err) => {
      console.log('storeSubscription fail', err);
    });
}

function subscribeUser() {
  doSubscription()
    .then((subscription) => {
      console.log('User is subscribed.');
      storeSubscription({
        subscribe: true,
        subscription,
      });
      isSubscribed = true;
    })
    .catch((err) => {
      console.log('Failed to subscribe the user: ', err);
    });
}

function unsubscribeUser() {
  let oldSubscription;
  doSubscription()
    .then(function(subscription) {
      if (subscription) {
        oldSubscription = subscription;
        return subscription.unsubscribe();
      }
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
    })
    .then(function(result) {
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
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  // e.preventDefault();
});

window.addEventListener('appinstalled', (event) => {
  console.log('appinstalled event', event);
});
