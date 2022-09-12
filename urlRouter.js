const router = require('express').Router();
// getter and setter
router.get('/', (req, res) => {
  // 批量设置
  const { url = '' } = req.query;
  if (url) {
    return res.redirect(decodeURIComponent(url));
  }

  res.send('url empty');
});

module.exports = router;
