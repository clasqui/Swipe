#!/bin/env node

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config')();
var MongoClient = require('mongodb').MongoClient;

// Controllers
var Index = require('./controllers/index');
var Login = require('./controllers/login');
var Logout = require('./controllers/logout');
var Thing = require('./controllers/thing');
var Signup = require('./controllers/signup');


var app = express();

// all environments
app.set('views', __dirname+'/templates');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser("Hulehule20CookiesSecret"));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if (config.mode === 'local') {
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

		// Routes for the WEB App

		app.all('/', attachDB, function(req, res, next){
			Index.run(req, res, next);
		});

		app.post('/login', attachDB, function(req, res, next){
			Login.run(req, res, next);
		});
		
		app.all('/logout', function(req, res, next){
			Logout.run(req, res, next);
		});

		app.post('/signup', attachDB, function(req, res, next){
			Signup.run(req, res, next);
		});

		app.post('/thing', attachDB, function(req, res, next){
			Thing.add(req, res, next);
		});

		app.get('/thing/:id', attachDB, function(req, res, next){
			Thing.run(req, res, next);
		});

		app.get('/thing', function(req, res, next){
			res.redirect('/');
		});

		// Routes for the API




		//Server Initialization
		http.createServer(app).listen(config.port, config.ip, function(){
  			console.log('Express server listening at ' + config.ip + ":" + config.port);
		});
	}
});
