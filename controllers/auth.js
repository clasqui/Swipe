module.exports = {


	authorize: function(req) {
    return (
        req.session && 
        req.session.swipe && 
        req.session.swipe === true
    );

  	}

}