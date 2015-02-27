var BaseController = require('./Base');
var User = new(require('../models/UserModel'));

module.exports = BaseController.extend({
	name: 'Login',

	run: function(req, res){
		var post = req.body;
		
		User.setDB(req.db);

		User.logIn(post.email, post.password, function(err, compare, document){
			if(compare) {
				req.session.swipe = true;
                req.session.user = document._id;
                res.redirect('/');
			} else {
				if(err){
					res.send(err);
				}
				res.redirect('/?msg=credentials');
			}

		});

	},

	runAPI: function(req, res){
		var post = req.body;
		
		User.setDB(req.db);
		console.log("username: "+post.email+" password: "+post.password);
		User.logIn(post.email, post.password, function(err, compare, document){
			if(compare) {

                userID = document._id;
				deviceUDID = req.body.udid;
				deviceName = req.body.devName;

				User.registerDevice(deviceUDID, deviceName, userID);

				User.createSession(userID, function(err, records) {
					console.log(records.ops);
					if(err) {
						console.log(err);
						res.json(500, {status: false, message: "Error creating session"});
					} else {
						res.json(200, {status: true, message: records.ops[0].session});					
					}
				});

			} else {
				if(err){
					console.log(err);
					res.json(500, {status: false, message: err});
				}
				console.log("Bad Credentials");
				res.json(200, {status: false, message: "Bad Credentials"});
			}

		});

	}

});