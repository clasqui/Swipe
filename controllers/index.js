
/*
 * GET home page.
 */

var BaseController = require('./Base');
var View = require('../views/Base');

module.exports = BaseController.extend({
	name: "Index",
	run: function(req, res, next){
		var v = new View(res, 'index');

		req.db.collection('users', function(err, collection){
			if (err){
				console.log("there was an error:"+err);
				process.exit(1);
			}
			collection.findOne({uid: 1}, function(err, document){
				if (err){
					console.log("there was an error:"+err);
					process.exit(1);
				}
				v.render({
					title: 'Your Things in the Cloud',
					content: document.email

				});



			});

		}) 
	}
})