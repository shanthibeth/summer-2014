var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*GET externality page*/
router.get('/externality/', function(req, res) {
  res.render('externality', { title: 'Externality' });
});


module.exports = router;
