var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/teams', function(req, res, next) {
  console.log('routing to teams from teams using a GET request')
  res.render('teams', { title: 'Team Page' });
});

router.post("/", function(req, res, next) {
  console.log('routing to index from teams using a POST request')
  res.render("index", { title: 'RLCS Season 1'});
});

module.exports = router;


