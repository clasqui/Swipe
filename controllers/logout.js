var BaseController = require('./Base');
var User = new(require('../models/UserModel.js'))();


module.exports = BaseController.extend({

	name: 'Logout',

	run: function(req, res){

		if(req.session.swipe){
			req.session.destroy();
			res.redirect('/?msg=out');
		}else{
			res.redirect('/');
		}


	},

	runAPI: function(req, res){
		User.setDB(req.db);

		var session = req.body.session

		User.deleteSession(session, function(result, err) {
			if(err) {
				res.json(500, {status: false, message: err});
			}
			if (result) {
				User.removeDevice(req.body.device, req.session.user);
				res.json(200, {status: true, message: "Logged Out Successfully"});

			} else {
				res.json(400, {status: false, message: "No result"});
			}
		})

	}

});