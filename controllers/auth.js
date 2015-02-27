var Thing = new(require('../models/ThingModel.js'))();
var User = new(require('../models/UserModel.js'))();

module.exports = {


	check: function(req) {
    	return (
        	req.session && 
        	req.session.swipe && 
        	req.session.swipe === true
    	);

	},

	middleware: function(req, res, next) {
		var value = (
        	req.session && 
        	req.session.swipe && 
        	req.session.swipe === true
    	);

		if(value) {
			next();
		} else {
			res.redirect('/?msg=notLogged');
		}

	},

	owner: function(req, res, next) {
		var thing = req.params.id;
		var user = req.session.user;
		Thing.setDB(req.db);
		Thing.checkOwner(user, thing, function(result){
			if(result){
				next();
			} else {
				res.redirect('/?err=not_own');
			}
		});

	},

	
	APIToken: function(req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		var token = req.params.token
		if (token == "UBEC") {
			next();
		} else {
			res.json(403, {status: false, message: "Bad Token"});
		}
	},

	userSession: function(req, res, next) {
		User.setDB(req.db);
		var session = req.body.session;
		if (session == "" || session == null) {
			res.json(401, {status: false, message: "Not Logged"});
		}
		console.log(session);
		User.checkSession(session, function(status, user){
			console.log(status);
			if(status) {
				req.session.user = user;
				next();
			} else {
				res.json(401, {status: false, message: "Bad Session"});
			}

		});

	}

};