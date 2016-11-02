var router = require('express').Router();

router.get('/', function(req, res) {
  res.render('index/home');
});

module.exports = router;
