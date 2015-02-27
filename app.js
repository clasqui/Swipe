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
var Auth = require('./controllers/auth');
var Account = require('./controllers/user');


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
app.use(express.static(__dirname + '/public'));

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

		app.get('/thing/:id', attachDB, Auth.middleware, Auth.owner, function(req, res, next){
			Thing.run(req, res, next);
		});

		app.get('/thing/:id/delete', attachDB, Auth.middleware, Auth.owner, function(req, res, next){
			Thing.delete(req, res, next);
		});

		app.get('/thing', function(req, res, next){
			res.redirect('/');
		});

		app.get('/account', attachDB, Auth.middleware, function(req, res, next){
			Account.run(req, res, next);
		});

		app.get('/account/delete', attachDB, Auth.middleware, function(req, res, next){
			Account.delete(req, res, next);
		});


		// Routes for the API
		
		app.get('/api/:token/authorize', Auth.APIToken, function(req, res, next) {
			res.json(200, {status: true, message: "Swipe API v1.0.0 beta"});

		});
		

		app.post('/api/:token/login', Auth.APIToken, attachDB, function(req, res, next){
			Login.runAPI(req, res, next);
		});

		app.post('/api/:token/logout', Auth.APIToken, attachDB, function(req, res, next){
			Logout.runAPI(req, res, next);
		});

		app.post('/api/:token/identify', Auth.APIToken, attachDB, Auth.userSession, function(req, res, next){

			res.json(200, {status: true, message: req.session.user});

		});

		app.post('/api/:token/things', attachDB, Auth.APIToken, Auth.userSession, function(req, res, next) {
			Thing.list(req, res, next);
		});

		//Server Initialization
		http.createServer(app).listen(config.port, config.ip, function(){
  			console.log('Express server listening at ' + config.ip + ":" + config.port);
		});
	}
});
