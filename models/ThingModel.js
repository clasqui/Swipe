var Model = require("./Base"),
	ObjectID = require('mongodb').ObjectID,
    model = new Model();

var ThingModel = model.extend({
	// Inserts a new thing
    insert: function(data, callback) {
        this.collection('things').insert(data, {}, callback || function(){ });
    },
    // Updates a thing.  Which thing: {id}, How to replace. {query}
    update: function(query, id, callback) {
        this.collection('things').update({_id: ObjectID(id)}, query, {}, callback || function(){ });   
    },
    getlist: function(callback, query) {
        this.collection('things').find(query || {}).toArray(callback);
    },

    getFromUser: function(id, callback) {
    	this.collection('things').find({user: ObjectID(id)}).toArray(callback);
    },

    howMany: function(id) {

    	this.collection('things').find({user: ObjectID(id)}).toArray(function(err, docs){
    		if(err){
    			throw err;
    		}
    		return docs.length;
    	});

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