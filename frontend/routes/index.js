var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('routing to index from index using a GET request')
  res.render('index', { title: 'RLCS Season 1' });
});

router.post("/teams", function(req, res, next) {
  res.render("teams", { title: 'Team page'});
  console.log('routing to teams from index using a POST request')
  // res.render('index', { title: 'RL Championship Series' });

});

router.get('/teams', function (req, res) {
	console.log(req.query)
	console.log('routing to teams from index using a GET request')
	res.render('teams')
});

module.exports = router;
