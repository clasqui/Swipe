var Model = require("./Base"),
	ObjectID = require('mongodb').ObjectID,
    model = new Model();

var UserModel = model.extend({
	// Signs a new user up
    signUp: function(email, password) {
        /*
         * @TODO: Write method
         *  - Check if email is taken, return boolean.
         *  - Insert the new user to the DB
         *  - Send a verification email
         *
         */
    },

    registerDevice: function(udid, name, user){
        /*
         * @TODO: Write method
         *  - Get the token and name for te new device
         *  - Insert them to database
         *  - Search for the user and put the data to the devices[] array
         */
    },

    notify: function(user, thingName){
        /*
         * @TODO: Write method
         *  - Get the user's devices and tokens
         *  - Connect to redis database
         *  - Set a new entry with the push notification
         */
    },

    // Updates a thing.  Which thing: {id}, How to replace. {query}
    update: function(query, id, callback) {
        this.collection('users').update({_id: ObjectID(id)}, query, {}, callback || function(){ });   
    },

    /*  Not used actually, I only need a method for getting ONE user.
    getlist: function(callback, query) {
        this.collection('users').find(query || {}).toArray(callback);
    },
    */

    getUser: function(id, callback) {
        this.collection('users').findOne({_id: ObjectID(id)}, callback);
    },

    remove: function(id, callback) {
        this.collection('users').findAndModify({_id: ObjectID(id)}, [], {}, {remove: true}, callback);
    }
});
module.exports = UserModel;