var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('inspector', { title: 'Express' });
});

/* GET tool page */
router.get('/tool', function(req, res, next) {
    res.render('tool');
});

module.exports = router;
