var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', { title: 'RLCS Season 1' });
});

router.post("/teams", function(req, res, next) {
  res.render("teams", { title: 'Team page'});
=======
  res.render('index', { title: 'RL Championship Series' });
>>>>>>> 4f46d16e94d7ae19cd52b021d2acbaea6a00cd0e
});

module.exports = router;
