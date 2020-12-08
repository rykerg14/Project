var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'RLCS Season 1' });
});

router.post("/teams", function(req, res, next) {
  res.render("teams", { title: 'Team page'});

  res.render('index', { title: 'RL Championship Series' });

});

module.exports = router;
