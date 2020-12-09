var express = require('express');
const { MongoClient } = require("mongodb");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('routing to index from index using a GET request');
  res.render('index', { title: 'RLCS Season 1' });
});

router.post("/teams", function(req, res, next) {
  res.render("teams", { title: 'Team page'});
  console.log('routing to teams from index using a POST request');
  // res.render('index', { title: 'RL Championship Series' });

});

router.get('/teams', async (req, res) => {
	console.log('routing to teams from index using a GET request');
	const db = req.app.locals.db;

	const teamData = await db.collection('teams').findOne({name: req.query['name'], function(err, result) {
    	if (err) throw err;
    	db.close();
	}});
	console.log(teamData)

	players = teamData['players']
	playerData = []
	for(i = 0; i < players.length; i++){
		playerData.push(await db.collection('players').findOne({name: players[i], function(err, result) {
    	if (err) throw err;
    	db.close();
	}}));
	}
	console.log(playerData[0]['name'])
	res.render("teams", { title: teamData['name'], 
						name1: playerData[0]['name'],
						name2: playerData[1]['name'],
						name3: playerData[2]['name'],
						realname1: playerData[0]['real_name'],
						realname2: playerData[1]['real_name'],
						realname3: playerData[2]['real_name'],
						pic1: playerData[0]['image'], 
						pic2: playerData[1]['image'], 
						pic3: playerData[2]['image'],
						flag1: playerData[0]['fl_image'],
					    flag2: playerData[1]['fl_image'],
				        flag3: playerData[2]['fl_image']});
});

module.exports = router;
