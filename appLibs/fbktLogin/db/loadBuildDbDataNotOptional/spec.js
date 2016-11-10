"use strict";
var uuid = require('node-uuid');
var fbkt = require('fbkt');
var should = require('should');

const pipeDef = require('./index');

describe(__filename, function () {

	it.skip('fbktLogin build db data', function (done) {
		this.timeout(5000);

		const testId = uuid.v4();
		const user = {login: "who@cares.com"};
		const params = {
		};
		
		pipeDef({
			user:   user,
			params: params
		})
			.then((result)=>{
				// fbkt().clog('PIPE RESULT', result, true);
				done();
			})
			.catch((error)=>{
				done(error);
			});
	});


});