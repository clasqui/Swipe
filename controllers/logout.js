var BaseController = require('./Base');

module.exports = BaseController.extend({

	name: 'Logout',

	run: function(req, res){

		if(req.session.swipe){
			req.session.destroy();
			res.redirect('/?msg=out');
		}else{
			res.redirect('/');
		}


	}

});