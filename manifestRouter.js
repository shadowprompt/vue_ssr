const router = require('express').Router();
// const locale = require("locale");
router.get('/', (req, res) => {
  // const locales = new locale.Locales(req.headers["accept-language"])
  res.send({
    name: 'Daozhao',
    short_name: 'Daozhao',
    "start_url": "/?utm_source=pwa_homescreen",
    "display": "standalone",
    "background_color": "#ffffff",
    "description": "道招网 关注互联网|聚焦Web",
    "orientation": "portrait",
    "theme_color": "#df3473",
    "icons": [
      {
        "src": "/_res/icons/icon-72x72.png",
        "sizes": "72x72",
        "type": "image/png"
      },
      {
        "src": "/_res/icons/icon-96x96.png",
        "sizes": "96x96",
        "type": "image/png"
      },
      {
        "src": "/_res/icons/icon-128x128.png",
        "sizes": "128x128",
        "type": "image/png"
      },
      {
        "src": "/_res/icons/icon-144x144.png",
        "sizes": "144x144",
        "type": "image/png"
      },
      {
        "src": "/_res/icons/icon-152x152.png",
        "sizes": "152x152",
        "type": "image/png"
      },
      {
        "src": "/_res/icons/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/_res/icons/icon-384x384.png",
        "sizes": "384x384",
        "type": "image/png"
      },
      {
        "src": "/_res/icons/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "serviceworker": {
      "src": "/service-worker.js",
      "scope": "/",
      "update_via_cache": "none"
    },
    "gcm_sender_id": "197845115065"
  });
});

module.exports = router;
