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

/*GET resource curse page*/
router.get('/resource_curse/', function(req, res) {
  res.render('resource_curse', { title: 'Resource Curse' });
});

/*GET comparative advantage page*/
router.get('/comparative_advantage/', function(req, res) {
  res.render('comparative_advantage', { title: 'Comparative Advantage' });
});

module.exports = router;
