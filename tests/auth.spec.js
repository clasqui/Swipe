var Auth = require('../controllers/auth');

describe("Authorization", function(){

	it("should grant access", function(next) {

		var request  = {
        	method: 'GET',
       		url: '/',
        	params: {},
        	session: {
        		swipe: true
        	}
    	};


		var value = Auth.authorize(request);

		expect(request.session.swipe).toBeDefined();
		expect(value).toBe(true);

	});


	it("should deny access", function(next) {
		
		var request  = {
        	method: 'GET',
       		url: '/',
        	params: {},
        	session: {
        		swipe: false
        	}
    	};

		var value = Auth.authorize(request);
		expect(request.session.swipe).toBeDefined();
		expect(value).toBe(false);

	});

});