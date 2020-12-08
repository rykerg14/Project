var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/teams', function(req, res, next) {
  res.render('teams', { title: 'Team Page' });
});

router.post("/", function(req, res, next) {
  res.render("index", { title: 'RLCS Season 1'});
});

module.exports = router;
