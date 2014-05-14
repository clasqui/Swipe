/*global describe, it, expect */

var User = new (require("../models/UserModel"));
var MongoClient = require('mongodb').MongoClient;

var EMAIL = "tests@email.com"
var PASS = "testsPass"

describe("User model", function() {


	var LOGGED_USER;
	it("should sign up a new user", function(next) {
		MongoClient.connect('mongodb://127.0.0.1:27017/swipe', function(err, db) {
			User.setDB(db);
		User.signUp(EMAIL, PASS, function(err, records){
			expect(err).toBe(null);
			expect(records).toBeDefined();
			var inserted_email = records[0].email;
			expect(inserted_email).toEqual(EMAIL);
			next();
		});
		});
		
	});

	it("should check email existance", function() {
		
		MongoClient.connect('mongodb://127.0.0.1:27017/swipe', function(err, db) {
			User.setDB(db);
		User.checkIfExists(EMAIL, function(exists){
			expect(exists).toBeTruthy();
		});

		User.checkIfExists("anotherfalse@email.com", function(exists){
			expect(exists).toBeFalsy();
		});
		});

	});

	it("should login a user", function() {
		MongoClient.connect('mongodb://127.0.0.1:27017/swipe', function(err, db) {
			User.setDB(db);
		User.logIn(EMAIL, PASS, function(err, compare, document){
			expect(compare).toBeTruthy();
		});
		User.logIn("ksjdghskudg", PASS, function(err, compare){
			expect(err).toEqual("User not registered");
			expect(compare).toBeNull();
		});
		});

	}); 

	it("should delete a user", function(next) {
		MongoClient.connect('mongodb://127.0.0.1:27017/swipe', function(err, db) {
			User.setDB(db);
		User.removeUser(EMAIL, function(status){
			expect(status).toBe(true);
			next();
		});

		User.removeUser("lkefoi2g02io2envj02", function(status){
			expect(status).toBe(false);
		});
		});

	});

});