const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const { LocalStorage } = require('node-localstorage');

const nodeStore = (scope) => new LocalStorage(path.resolve(__dirname, scope));

const localStorage = nodeStore('../localStorage/Daozhao');

function getCurrentVersion(version) {
  let lastVersion = '';
  if (version) {
    lastVersion = version;
  } else {
    const lastVersionStr = localStorage.getItem('pwaVersion') || `"3.0.0"`;
    lastVersion = JSON.parse(lastVersionStr);
  }
  return lastVersion;
}

router.get('/', (req, res) => {
  const str = fs.readFileSync(path.join(__dirname, './service-worker.template.js'), {
    encoding: 'utf-8'
  });
  const currentVersion = getCurrentVersion();
  const fullStr = `let cacheName = 'daozhao-v${currentVersion}';\n` + str;
  res.set('Content-Type', 'application/javascript; charset=UTF-8').status(200).end(fullStr);
  console.log('send /service-worker.js -> ', currentVersion);
});

module.exports = router;
