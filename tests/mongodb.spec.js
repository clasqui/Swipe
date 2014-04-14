/*global describe, it, expect */

describe("MongoDB", function() {
	it("is there a server running", function(next) {
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect('mongodb://127.0.0.1:27017/swipe', function(err, db) {
			expect(err).toBe(null);
			expect(db).toBeDefined();
			next();
		});
	});
	it("should populate db", function(next) {
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect('mongodb://127.0.0.1:27017/swipe', function(err, db) {
			
			db.collection('users', function(err, collection){
				expect(err).toBe(null);
				expect(collection).toBeDefined();
				var doc = {
					key: 'testing',
					value1: 1320,
					value2: ['Marc', 'Clasca', 'Ramirez']
				};

				collection.save(doc, function(err){
					expect(err).toBe(null);
					next();
				});
			});

		});
	});

	it("should get values", function(next) {
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect('mongodb://127.0.0.1:27017/swipe', function(err, db) {
			
			db.collection('users', function(err, collection){
				

				collection.findOne({key: 'testing'}, function(err, document){
					expect(err).toBe(null);

					expect(document.value1).toBe(1320);
					var cognom = document.value2[1];
					expect(cognom).toBe('Clasca');
					next();

				});
			});

		});
	});


	it("should delete document", function(next) {
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect('mongodb://127.0.0.1:27017/swipe', function(err, db) {
			
			db.collection('users', function(err, collection){
				

				collection.remove({key:'testing'}, function(err, numberOfRemovedDocs) {
					expect(err).toBe(null);
					expect(numberOfRemovedDocs).toBe(1);
					next();
				});

			});

		});
	});



});