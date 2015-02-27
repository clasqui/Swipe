var Model = require("./Base"),
	ObjectID = require('mongodb').ObjectID,
    bcrypt = require('bcrypt-nodejs'),
    model = new Model(),
    sessionCreator = new require("./uuid"); 

var UserModel = model.extend({
	
    // Signs a new user up
    // @callback: function(err, records)
    signUp: function(email, password, callback) {
        /*
         * @TODO: Write method
         *  - Send a verification email
         */

         var self = this;
         this.checkIfExists(email, function(exists){
            console.log(email+"   "+password);
            if(exists) {
                console.log("Exists");
                var err = true;
                return callback(err, null);
            } else {
                
                var salt = bcrypt.genSaltSync(10);
                var hashedPass = bcrypt.hashSync(password, salt);

                var doc = {
                    devices: [],
                    email: email,
                    password: hashedPass,
                    things: []
                }

                self.collection('users').insert(doc, function(err, records){
                    return callback(err, records);
                });
            }

         });

    },

    // Checks existance of a user with pecific email.
    // @callback: function(exists)
    checkIfExists: function(email, callback) {
        this.collection('users').findOne({email: email}, function(err, document) {

            if(document == null) {
                var exists = false;
                return callback(exists);
            } else {
                var exists = true;
                return callback(exists);
            }
        });
    },

    logIn: function(email, password, callback) {

        this.collection('users').findOne({email: email}, function(err, document){
                if(document){
                    bcrypt.compare(password, document.password, function(err, compare){
                        callback(err, compare, document);
                    });

                }else{
                    var err = "User not registered";
                    callback(err, null, null);
                }
            });

    },

    createSession: function(user, callback) {
        var uuid = sessionCreator();
        var doc = {
                    session: uuid,
                    user: user,
                }
        console.log(doc);

        this.db.collection('sessions').insert(doc, function(err, records){
            console.log(err);
            if(err) {
                console.log(err);
            }
            console.log("collection session insert");
            callback(err, records);
        });

    },

    deleteSession: function(userSession, callback) {
        this.db.collection('sessions').remove({session: userSession}, function(err, result){
            if (err) {
                console.log(err);
                callback(false, err)
            }
            if (result.result.n == 1) {
                console.log("ok");
                callback(true, null);
            } else {
                callback(false, null);
            }
        });

    },

    checkSession: function(userSession, callback) {
        this.db.collection('sessions').findOne({session: userSession}, function(err, document){
            console.log(err);
            if(document) {
                console.log(document);
                callback(true, document.user);
            } else {
                callback(false, null);
            }

        });
    },



    // Register a new device in the users collection to which send notifications
    registerDevice: function(udid, name, user){
        /*
         * @TODO: Write method
         *  - Get the token and name for the new device
         *  - Insert them to database
         *  - Search for the user and put the data to the devices[] array
         */

         console.log("udid: "+udid);
    },

    // Sends a notification to user's devices telling a thing has been added
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

    /*  
    // Not used actually, I only need a method for getting ONE user.
    getlist: function(callback, query) {
        this.collection('users').find(query || {}).toArray(callback);
    },
    */

    getUser: function(id, callback) {
        this.collection('users').findOne({_id: ObjectID(id)}, callback);
    },

    removeUser: function(email, callback) {
        this.collection('users').remove({email: email}, function(err, count){
            if(count == 1){
                return callback(true);
            }else {
                return callback(false);
            }
        });
    },

    removeUserWithId: function(id, callback) {
        this.collection('users').remove({_id: ObjectID(id)}, function(err, count){
            if(count == 1){
                return callback(true);
            }else {
                return callback(false);
            }
        });
    }
});
module.exports = UserModel;