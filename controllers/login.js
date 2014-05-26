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

	}

});