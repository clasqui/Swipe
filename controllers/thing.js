var BaseController = require('./Base');
var View = require('../views/Base');
var Auth = require('./auth');
var User = new (require('../models/UserModel'))();
var Thing = new (require('../models/ThingModel'))();
var ObjectID = require('mongodb').ObjectID;


module.exports = BaseController.extend({
	name: "Thing",


	add: function(req, res, next){
		if (Auth.check(req)){

			var post = req.body;
			var cUser = req.session.user;
			Thing.setDB(req.db);
			User.setDB(req.db);


			Thing.getFromUser(cUser, function(err, docs){

				if(docs.length >= 10) {
					res.send('You have reached the limit of things.  Delete some.');
				} else {

					Thing.addThing(new Date(), post.data, post.type, cUser, function(err, records){
						if(err){
							throw err;
						}

						var newThing = records.ops[0];


						var v = new View(res, 'newthing');
						v.render({
							created: newThing.created,
							data: newThing.data,
							type: newThing.type

						});

					});


				}


			});



		} else {
			res.redirect('/?msg=notLogged');
		}
		

		 
	},

	delete: function(req, res, next){
		Thing.setDB(req.db);
		thingID = req.params.id;
		Thing.remove(thingID, function(result){
			if(result){
				res.redirect('/?msg=deleted');
			} else {
				res.redirect('/?err=notDeleted')
			}
		});
	},


	run: function(req, res, next){
		if (Auth.check(req)){

			var post = req.body;
			var cUser = req.session.user;
			Thing.setDB(req.db);
			User.setDB(req.db);
			var thingKey = req.params.id;

			// Check if thing exists

			if(thingKey.match(/^[0-9a-fA-F]{24}$/)){



				Thing.getlist({_id: new ObjectID(thingKey)}, function(err, docs){


					if(docs.length != 1){

						var v = new View(res, 'not-found');
						v.render();

					}else{

						var v = new View(res, 'thing');
						v.render({
							created: docs[0].created,
							type: docs[0].type,
							data: docs[0].data,
							id: docs[0]._id
						});

					}


				});

			}else{


				var v = new View(res, 'not-found');
				v.render();

			}



		} else {
			res.redirect('/?msg=notLogged');
		}
		

		 
	},

	listAPI: function(req, res, next) {
		//List all the things from a user, mostly used by the API
		Thing.setDB(req.db);
		var cUser = req.session.user;
		Thing.getFromUser(cUser, function(err, docs){
			if(err) {
				res.json(500, {status: false, message:err});
			}
			console.log(docs);
			if(docs.length == 0) {
				res.json(200, {status: true, message: null});
			}
			
			res.json(200, {status: true, message: docs});

		});
		
	}

});