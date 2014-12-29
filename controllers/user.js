var BaseController = require('./Base');
var View = require('../views/Base');
var User = new (require('../models/UserModel'))();
var Thing = new (require('../models/ThingModel'))();
var ObjectID = require('mongodb').ObjectID;


module.exports = BaseController.extend({
	name: "User",

	run: function(req, res, next){
		User.setDB(req.db);
		userID = req.session.user;
		User.getUser(userID, function(err, doc){
			var v = new View(res, 'account');
			v.render({
				email: doc.email,
				id: userID

			});

		});
		 
	},

	loginFromDevice: function(req, res, next) {
		User.setDB(req.db);
		userID = req.session.user;
		deviceUDID = req.body.udid;
		deviceName = req.body.devName;

		User.registerDevice(deviceUDID, deviceName, userID);

	},

	delete: function(req, res, next) {
		User.setDB(req.db);
		Thing.setDB(req.db);
		userID = req.session.user;

		//Delete Session
		req.session.destroy();

		//Delete user
		User.removeUserWithId(userID, function(status){
			if(status){
				Thing.removeFromUser(userID, function(status){
					if(status) {
						res.redirect('/?msg=deleted');
					} else {
						res.send('Error deleting user\'s things');
					}
				});
			}else{
				res.redirect('/?err=delete');
			}
		});

	}

});