module.exports = {


	check: function(req) {
    return (
        req.session && 
        req.session.swipe && 
        req.session.swipe === true
    );

	}
};