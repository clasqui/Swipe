var Model = require("./Base"),
	ObjectID = require('mongodb').ObjectID,
	model = new Model();

var ThingModel = model.extend({
	// Inserts a new thing
	addThing: function(created, data, type, user, callback) {

		thingDoc = {
			created: created,
			data: data,
			type: type,
			user: ObjectID(user)
		}

		var self = this;


		self.collection('things').insert(thingDoc, callback);


	},
	// Updates a thing.  Which thing: {id}, How to replace. {query}
	update: function(query, id, callback) {
		this.collection('things').update({_id: ObjectID(id)}, query, {}, callback || function(){ });   
	},
	getlist: function(query, callback) {
		this.collection('things').find(query || {}).toArray(callback);
	},

	getOne: function(id, callback) {
		this.collection('things').findOne({_id: ObjectID(id)}, callback);
	},

	getFromUser: function(id, callback) {
		this.collection('things').find({user: ObjectID(id)}).toArray(callback);
	},

	remove: function(id, callback) {
		this.collection('things').remove({_id: ObjectID(id)}, function(err, count){
			if(count == 1){
				return callback(true);
			}else{
				return callback(false);
			}
		});
	},

	removeFromUser: function(userID, callback) {
		this.collection('things').remove({user: ObjectID(userID)}, function(err, count){
			if(count > 0){
				return callback(true);
			}else{
				return callback(false);
			}
		});
	},

	checkOwner: function(user, thing, callback) {
		this.getOne(thing, function(err, doc){
			if(doc.user == user){
				console.log("coincides");
				callback(true);
			} else {
				 console.log("not from this user..");
				 callback(false);
			}
		});
	},


	content: {
		user: "",
		created: "",
		data: "",
		id: ""
	}

});

module.exports = ThingModel;