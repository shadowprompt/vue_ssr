<template>
  <div>Firebase</div>
</template>

<script>
import { initializeApp, No } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDhir92GL9JjSVO15BG9fPgc2vyMD22BqM',
  authDomain: 'daozhao-com.firebaseapp.com',
  projectId: 'daozhao-com',
  storageBucket: 'daozhao-com.appspot.com',
  messagingSenderId: '197845115065',
  appId: '1:197845115065:web:4ed4a2c20c14eca8e3bb68',
  measurementId: 'G-SMEQ3NYMCB',
  vapidKey: 'BGwZ7R1oOio1xs61Jgm34qguAKsU2w96XrSs22TpK-yK9goD0Qidfp7tpjDvG8T1Zu4vdKJp_Ev93U0iWPRmP9c'
};
//


  export default {
    name: 'Firebase',
    mounted() {
      // // Initialize Firebase
      if (typeof window !== 'undefined') {
        const fiberApp = initializeApp(firebaseConfig);
        const messaging = getMessaging(fiberApp);
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            // navigator.serviceWorker.register('/_res/firebase-messaging-sw.js')
            console.log('Notification permission granted.');
            getToken(messaging, {vapidKey: 'BGwZ7R1oOio1xs61Jgm34qguAKsU2w96XrSs22TpK-yK9goD0Qidfp7tpjDvG8T1Zu4vdKJp_Ev93U0iWPRmP9c'}).then((currentToken) => {
              if (currentToken) {
                console.log('currentToken -> ', currentToken);
              } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
              }
            }).catch((err) => {
              console.log('An error occurred while retrieving token. ', err);
            });
          }
        })
      }
    }
  }
</script>
