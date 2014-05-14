var Model = require("./Base"),
	ObjectID = require('mongodb').ObjectID,
	model = new Model();

var ThingModel = model.extend({
	// Inserts a new thing
	addThing: function(title, data, type, user, callback) {

		thingDoc = {
			name: title,
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

	getFromUser: function(id, callback) {
		this.collection('things').find({user: ObjectID(id)}).toArray(callback);
	},

	remove: function(id, callback) {
		this.collection('things').findAndModify({_id: ObjectID(id)}, [], {}, {remove: true}, callback);
	},


	content: {
		user: "",
		name: "",
		data: "",
		id: ""
	}

});

module.exports = ThingModel;