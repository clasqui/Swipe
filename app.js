
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./controllers');
var user = require('./controllers/user');
var Index = require('./controllers/index');
var http = require('http');
var path = require('path');
var config = require('./config')();
var MongoClient = require('mongodb').MongoClient;

var app = express();

// all environments
app.set('views', __dirname+'/templates');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if (config.mode == 'local') {
  app.use(express.errorHandler());
}

MongoClient.connect(config.mongodb, function(err, db){
	if(err){
		console.error("Could not connect to database");
	} else {
		var attachDB = function(req, res, next){
			req.db = db;
			next();
		};


		app.all('/', attachDB, function(req, res, next){
			Index.run(req, res, next);
		});
		
		app.get('/users', user.list);




		http.createServer(app).listen(config.port, function(){
  			console.log('Express server listening on port ' + config.port);
		});
	}
});
