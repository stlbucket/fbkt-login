"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const _ = require('lodash');
const fbkt = require('fbkt');


module.exports = (callInfo)=> {
	// fbkt.clog('LOGIN TOKEN', callInfo);
	return fbkt().FbktPipe({
		name:           'fbktLogin/loginToken/',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			"loginToken": (callInfo)=> {
				return fbkt().sqlTemplateManager({
					templateFilePath:	`${__dirname}/template.hbs`,
					templateData:			callInfo.user,
					executionMode: 		'PROD',
					reportFileName:		'./ignoreAllThis/loginTokenTemplateOutput.txt',
					expectScalar:			true
				})
					.then(function(authenticatedUser){
						//fbkt.clog('TOKEN AUTHENTICATED USER', authenticatedUser);
						if (!authenticatedUser) return new Error('BAD LOGIN TOKEN');
						else return _.mapKeys(authenticatedUser, function(value, key){
							return _.camelCase(key);
						});
					});
			}
		}
	}, callInfo || {});
};