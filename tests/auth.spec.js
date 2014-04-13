/*global describe, it, expect */

var Auth = require('../controllers/auth');

describe("Authorization", function(){

	it("should grant access", function(next) {

		var request  = {
			session: {
				swipe: true
			}
		};


		var value = Auth.check(request);

		expect(request.session.swipe).toBeDefined();
		expect(value).toBe(true);
		next();

	});


	it("should deny access", function(next) {
		
		var request  = {
			session: {
				swipe: false
			}
		};

		var value = Auth.check(request);
		expect(request.session.swipe).toBeDefined();
		expect(value).toBe(false);
		next();

	});

});