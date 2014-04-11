
/*
 * GET home page.
 */

var BaseController = require('./Base');
var View = require('../views/Base');
var ObjectID = require('mongodb').ObjectID;


module.exports = BaseController.extend({
	name: "Index",


	authorize: function(req) {
    return (
        req.session && 
        req.session.swipe && 
        req.session.swipe === true
    );

  	},

	run: function(req, res, next){
		if (this.authorize(req)){


		req.db.collection('users', function(err, collection){
			if (err){
				console.log("there was an error:"+err);
				process.exit(1);
			}
			collection.findOne({_id: ObjectID(req.session.user)}, function(err, document){
				if (err){
					console.log("there was an error:"+err);
					process.exit(1);
				}

				req.session.save(function(err){

				var v = new View(res, 'index');
				v.render({
	
					title: 'Your Things in the Cloud',
					content: document.email

				});


				});


			});

		})

		} else {
			var v = new View(res, 'home-login');
			v.render({
				title: "Welcome to Swipe"
			});
		}
		

		 
	}
})