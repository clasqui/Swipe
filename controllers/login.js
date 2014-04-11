var BaseController = require('./Base');

module.exports = BaseController.extend({

	name: 'Login',

	run: function(req, res, next){
		var post = req.body;
		req.db.collection('users', function(err, collection){

			collection.findOne({email: post.email, password: post.password}, function(err, document){
				if(document){
					req.session.swipe = true;
					req.session.user = document._id;
					res.redirect('/');
				}else{
					res.send('Bad user/pass');
				}
			});

		});

	}



})