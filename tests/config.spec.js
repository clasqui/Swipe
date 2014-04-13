/*global describe, it, expect */

describe("Configuration setup", function() {
	it("should load local configurations", function(next) {
		var config = require('../config')('local');
		expect(config.mode).toBeDefined();
		expect(config.mode).toBe('local');
		next();
	});
	it("should load staging configurations", function(next) {
		var config = require('../config')('staging');
		expect(config.mode).toBeDefined();
		expect(config.mode).toBe('staging');
		next();
	});
	it("should load production configurations", function(next) {
		var config = require('../config')();
		expect(config.mode).toBeDefined();
		expect(config.mode).toBe('production');
		next();
	});
});