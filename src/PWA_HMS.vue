<template>
</template>

<script>
  import agconnect from '@hw-agconnect/api';
  import '@hw-agconnect/auth';
  import '@hw-agconnect/instance';
  import {timeoutCallWithLaTrack} from './utils'

  var agConnectConfig =
    {
      'agcgw': {
        'backurl': 'connect-dra.hispace.hicloud.com',
        'url': 'connect-dra.dbankcloud.cn',
        'websocketbackurl': 'connect-ws-dra.hispace.dbankcloud.com',
        'websocketurl': 'connect-ws-dra.hispace.dbankcloud.cn'
      },
      'agcgw_all': {
        'CN': 'connect-drcn.dbankcloud.cn',
        'CN_back': 'connect-drcn.hispace.hicloud.com',
        'DE': 'connect-dre.dbankcloud.cn',
        'DE_back': 'connect-dre.hispace.hicloud.com',
        'RU': 'connect-drru.hispace.dbankcloud.ru',
        'RU_back': 'connect-drru.hispace.dbankcloud.cn',
        'SG': 'connect-dra.dbankcloud.cn',
        'SG_back': 'connect-dra.hispace.hicloud.com'
      },
      'websocketgw_all': {
        'CN': 'connect-ws-drcn.hispace.dbankcloud.cn',
        'CN_back': 'connect-ws-drcn.hispace.dbankcloud.com',
        'DE': 'connect-ws-dre.hispace.dbankcloud.cn',
        'DE_back': 'connect-ws-dre.hispace.dbankcloud.com',
        'RU': 'connect-ws-drru.hispace.dbankcloud.ru',
        'RU_back': 'connect-ws-drru.hispace.dbankcloud.cn',
        'SG': 'connect-ws-dra.hispace.dbankcloud.cn',
        'SG_back': 'connect-ws-dra.hispace.dbankcloud.com'
      },
      'client': {
        'cp_id': '260086000068364856',
        'product_id': '9105385871708200535',
        'client_id': '222311772965569536',
        'client_secret': '5990B381FB8C6AD02AC313866FA0702C5B9308E8025D89987452115C9B294EA2',
        'project_id': '9105385871708200535',
        'app_id': '172249065902419800',
        'api_key': 'CgB6e3x9F7SXLqPbYFmFfhS4a9OpRArJ6iHyzRlQJXiRBZCJ1blxKGtLh2pUUG9IrS71N5JfiQfUHXMuxQ/i1JOc'
      },
      'oauth_client': {
        'client_id': '108022787',
        'client_type': 7
      },
      'app_info': {
        'app_id': '172249065902419800'
      },
      'service': {
        'analytics': {
          'collector_url': 'datacollector-dra.dt.hicloud.com,datacollector-dra.dt.dbankcloud.cn',
          'collector_url_ru': 'datacollector-drru.dt.dbankcloud.ru,datacollector-drru.dt.hicloud.com',
          'collector_url_sg': 'datacollector-dra.dt.hicloud.com,datacollector-dra.dt.dbankcloud.cn',
          'collector_url_de': 'datacollector-dre.dt.hicloud.com,datacollector-dre.dt.dbankcloud.cn',
          'collector_url_cn': 'datacollector-drcn.dt.hicloud.com,datacollector-drcn.dt.dbankcloud.cn',
          'resource_id': 'p1',
          'channel_id': ''
        },
        'edukit': {
          'edu_url': 'edukit.edu.cloud.huawei.com.cn',
          'dh_url': 'edukit.edu.cloud.huawei.com.cn'
        },
        'search': {
          'url': 'https://search-dra.cloud.huawei.com'
        },
        'cloudstorage': {
          'storage_url_sg_back': 'https://agc-storage-dra.cloud.huawei.asia',
          'storage_url_ru_back': 'https://agc-storage-drru.cloud.huawei.ru',
          'storage_url_ru': 'https://agc-storage-drru.cloud.huawei.ru',
          'storage_url_de_back': 'https://agc-storage-dre.cloud.huawei.eu',
          'storage_url_de': 'https://ops-dre.agcstorage.link',
          'storage_url': 'https://agc-storage-drcn.platform.dbankcloud.cn',
          'storage_url_sg': 'https://ops-dra.agcstorage.link',
          'storage_url_cn_back': 'https://agc-storage-drcn.cloud.huawei.com.cn',
          'storage_url_cn': 'https://agc-storage-drcn.platform.dbankcloud.cn',
          'default_storage': ''
        },
        'ml': {
          'mlservice_url': 'ml-api-dra.ai.dbankcloud.com,ml-api-dra.ai.dbankcloud.cn'
        }
      },
      'region': 'SG',
      'configuration_version': '3.0'
    };

  export default {
    name: 'PWA_HMS',
    mounted() {
      // this.init();
      // this.messageRegister();
    },
    methods: {
      init() {
        // Initialize HMS
        agconnect.instance().configInstance(agConnectConfig);
        agconnect.instance().setApiKey('Z1h2Akj70gQ7Bnzt5fHx1e68NqiuWRYMLS9btcwR')
        agconnect.instance().setClientSecret('5990B381FB8C6AD02AC313866FA0702C5B9308E8025D89987452115C9B294EA2')
        agconnect.instance().setClientId('222311772965569536')
        console.log('instance', agconnect.instance())
        console.log('agconnect.instance initialized')
      },
      getToken(messaging) {
        timeoutCallWithLaTrack(15000, 'pwaTimeout', 'HMS:getToken')(messaging.getToken.bind(messaging)).then((token) => {
          if (token) {
            console.log('HMS:webPush token: ', token);
            this.storeToken(token);
          } else {
            console.log('No Instance ID token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });
      },
      storeToken(token) {
        fetch('https://gateway.daozhao.com.cn/HMS_webPush/storePushToken', {
          method: 'post',
          body: JSON.stringify({
            pushToken: token,
            id: 'id_' + Date.now() + '_' + parseInt(Math.random() * 10000),
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log('store pushToken successful', res);
        }).catch((err) => {
          console.log('store pushToken fail', err);
        });
      },
      messageRegister() {
        const hms = window.hms;
        if (!hms) {
          return;
        }
        // Your web app's hms configuration
        const hmsConfig = {
          'apiKey': 'Z1h2Akj70gQ7Bnzt5fHx1e68NqiuWRYMLS9btcwR',
          'projectId': '9105385871708200535',
          'appId': '108022787',
          'countryCode': 'SG'
        };
        hms.initializeApp(hmsConfig);

        const messaging = hms.messaging();
        messaging.usePublicVapidKey('BGwZ7R1oOio1xs61Jgm34qguAKsU2w96XrSs22TpK-yK9goD0Qidfp7tpjDvG8T1Zu4vdKJp_Ev93U0iWPRmP9c');

        messaging.onMessage(this.onMessage);

        this.requestPermission(messaging);
      },
      requestPermission(messaging) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('granted');
            this.getToken(messaging)
          } else {
            console.log('denied ' + permission);
          }
        })
      },
      onMessage(payload) {
        console.log('Message received. ', payload);
      },
    }
  }
</script>
