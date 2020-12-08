var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var teamsRouter = require('./routes/teams');

var app = express();

var teamsJSON = undefined
var playersJSON = undefined

const { MongoClient } = require("mongodb");
// Connection URI
const uri =
  "mongodb+srv://admin:sunless@rocketleague.39ina.mongodb.net/rocketleague?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, {useUnifiedTopology: true});
async function run() {
  try {
    // Connect the client to the server
	await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    var db = client.db('rldb')

	db.collection('players').find().toArray(function(err, docs) {
    	playersJSON = docs;
	});
	db.collection('teams').find().toArray(function(err, docs) {
    	teamsJSON = docs;
	});
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/teams', teamsRouter);

app.get('/teams', function (req, res) {
	res.render('teams')
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
