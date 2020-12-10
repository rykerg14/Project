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
	console.log(teamData['standing'])

	players = teamData['players']
	playerData = []
	for(i = 0; i < players.length; i++){
		playerData.push(await db.collection('players').findOne({name: players[i], function(err, result) {
    	if (err) throw err;
    	db.close();
	}}));
	}
	console.log(playerData[0]['stats'])
	res.render("teams", { title: teamData['name'], 
						pic1: playerData[0]['image'], 
						pic2: playerData[1]['image'], 
						pic3: playerData[2]['image'],
						name1: playerData[0]['name'],
						name2: playerData[1]['name'],
						name3: playerData[2]['name'],
						flag1: playerData[0]['fl_image'],
						flag2: playerData[1]['fl_image'],
						flag3: playerData[2]['fl_image'],
						teamName: teamData['name'],
						standing: teamData['standing'],
						stats1: playerData[0]['stats'],
						stats2: playerData[1]['stats'],
						stats3: playerData[2]['stats'],
						avg1: ((playerData[0]['stats'][0] + playerData[1]['stats'][0] + playerData[2]['stats'][0]) / 3).toFixed(1),
						avg2: ((playerData[0]['stats'][1] + playerData[1]['stats'][1] + playerData[2]['stats'][1]) / 3).toFixed(1),
						avg3: ((playerData[0]['stats'][2] + playerData[1]['stats'][2] + playerData[2]['stats'][2]) / 3).toFixed(1),
						avg4: ((playerData[0]['stats'][3] + playerData[1]['stats'][3] + playerData[2]['stats'][3]) / 3).toFixed(1)});
});

module.exports = router;
