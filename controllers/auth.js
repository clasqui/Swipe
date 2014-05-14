module.exports = {


	check: function(req) {
    return (
        req.session && 
        req.session.swipe && 
        req.session.swipe === true
    );

	},

	middleware: function(req, res, next) {
		var value = this.check(req);

		if(value) {
			next()
		} else {
			res.redirect('/');
		}

	}
};