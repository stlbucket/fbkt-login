"use strict";
var uuid = require('node-uuid');
var fbkt = require('fbkt');
var should = require('should');
var Promise = require('bluebird');

const target = require('./index');

describe(__filename, function () {

	it('getUserLicensesConfig', function (done) {
		
		target({
			params:	{
				app:	'fbktUltimate',
				env:	'dev'
			}
		})
			.then(function (result) {
				// fbkt().clog('USER LICENSES CONFIG', result, true);
				done();
			});

	});


});