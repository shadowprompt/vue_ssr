const express = require('express');
const app = express();
const template = require('fs').readFileSync('./index.template.html', 'utf-8');
const path = require('path');
const resolve = (file) => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest, // （可选）客户端构建 manifest
});
function serve (path, cache){
  console.log('aaa -> ', resolve(path));
  return express.static(resolve(path), {
    //设置静态文件目录
    maxAge: 1000 * 60,
    setHeaders: function(res, path, stat) {
      res.set('x-timestamp', Date.now());
      res.set('Cache-Control', 'private,max-age=' + 1000 * 50);
    },
  });
}

app.use('/main.js', serve('./dist/main.js', true));
app.use('/manifest.js', serve('./dist', true));
app.use('/common.4d971b83c0b2f695a744.css', serve('./dist', true));
app.get('/favicon.ico', (req, res) => res.send(200));
// 在服务器处理函数中……
app.get('*', (req, res) => {
  const context = { url: req.url, title: 'ssr渲染' + Date.now() };
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log('err2 ', err);
      if (err.code === 404) {
        res.sendStatus(404).end('Page not found');
      } else {
        res.sendStatus(500).end('Internal Server Error');
      }
    } else {
      res.end(html);
    }
  });
});
const port = process.env.PORT || 8899;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
