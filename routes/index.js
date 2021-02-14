var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    console.log(`user #${req.session.user_id} is logged in`)
  } 
  res.render('index', { title: 'Express' });
});

module.exports = router;
