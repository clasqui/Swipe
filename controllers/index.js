
/*
 * GET home page.
 */

var BaseController = require('./Base');
var View = require('../views/Base');
var ObjectID = require('mongodb').ObjectID;
var Auth = require('./auth');
var User = new (require('../models/UserModel'));
var Thing = new (require('../models/ThingModel'));


module.exports = BaseController.extend({
	name: "Index",


	run: function(req, res, next){
		if (Auth.check(req)){

			cUser = req.session.user
			User.setDB(req.db);
			Thing.setDB(req.db);

			User.getUser(cUser, function(err, document){
				var email = document.email;
				var devices = document.devices;

				Thing.getFromUser(cUser, function(err, docs){

					if(Thing.howMany(cUser) >= 10) {
						var max = true;
					} else {
						var max = false;
					}

					req.session.save(function(){

						var v = new View(res, 'index');
						v.render({
							title: 'Your Things in the Cloud',
							things: docs,
							email: email,
							devices: devices,
							max: max

						});

					});


				});


			});



		} else {
			var v = new View(res, 'home-login');
			v.render();
		}
		

		 
	}
});