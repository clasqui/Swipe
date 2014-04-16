var BaseController = require('./Base');

module.exports = BaseController.extend({

	name: 'Logout',

	run: function(req, res, next){

		if(req.session.swipe){
			req.session.destroy();
			res.redirect('/');
		}else{
			res.redirect('/');
		}

		next();


	}

});