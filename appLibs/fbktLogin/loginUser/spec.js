"use strict";
const R = require('ramda');
const uuid = require('node-uuid');
const fbkt = require('fbkt');
const should = require('should');

const loginUser = require('./index');
const loginToken = require('../loginToken');
const logoutToken = require('../logoutToken');

describe(__filename, function () {

	it('fail login user', (done)=>{
		this.timeout(5000);
		const params = {
			login: 		"functionbucket@gmail.com",
			password:	fbkt().crypto.sha2encrypt('invalid')
		};

		loginUser({
			params: params
		})
			.then((result)=> {
				// fbkt().clog('LOGIN RESULT', result.message, true);
				done(result);
			})
			.catch((expectAnError)=> {
				R.is(Error, expectAnError).should.be.ok;
				expectAnError.name.should.equal('FbktBadLoginOrPassword');
				done();
			});
	});

	it('login a user with credentials', (done)=> {
		this.timeout(5000);
		const params = {
			login:    "functionbucket@gmail.com",
			password: fbkt().crypto.sha2encrypt('baddPwd')
		};
		let token = null;

		loginUser({
			params: params
		})
			.then((result)=> {
				fbkt().clog('LOGIN RESULT', result, true);
				done();
			});
	});

	it('login a user with credentials AND with the resulting token THEN logout THEN fail token login', (done)=>{
		this.timeout(5000);
		const params = {
			login: 		"functionbucket@gmail.com",
			password:	fbkt().crypto.sha2encrypt('baddPwd')
		};
		let token = null;

		loginUser({
			params: params
		})
			.then((result)=> {
				// fbkt().clog('LOGIN RESULT', result, true);
				result.id.should.be.ok;
				token = result.token;
				return loginToken({
					user:	{
						token: token
					}
				});
			})
			.then((tokenResult)=>{
				// fbkt().clog('TOKEN LOGIN RESULT', tokenResult, true);
				tokenResult.id.should.be.ok;
				return logoutToken({
					user:	{
						token: token
					}
				});
			})
			.then((logoutTokenResult)=>{
				// fbkt().clog('TOKEN LOGOUT RESULT', logoutTokenResult, true);
				logoutTokenResult.should.equal('Successfully Logged Out');
				return loginToken({
					user:	{
						token: token
					}
				});
			})
			.then((tokenShouldFailResult)=>{
				// fbkt().clog('TOKEN LOGIN SHOULD FAIL RESULT', tokenShouldFailResult, true);
				R.is(Error, tokenShouldFailResult).should.be.ok;
				tokenShouldFailResult.message.should.equal('BAD LOGIN TOKEN');
				done();
			})
			.catch((error)=> {
				done(error);
			});
	});


});