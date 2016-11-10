"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');
const _ = require('lodash');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin/loginUser',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			"loginUser": (callInfo)=> {
				const templateData = { 
					login:					callInfo.params.login,
					hashedPassword: fbkt().crypto.sha3encrypt(callInfo.params.password) 
				};

				return fbkt().sqlTemplateManager({
					params: {
            templateFilePath: `${__dirname}/template.hbs`,
            templateData:     templateData,
						executionMode:    'PROD',
						reportFileName:   './ignoreAllThis/loginUserTemplateOutput.txt',
						expectScalar:     true
					}
				})
					.then(function(authenticatedUser){
						// console.log('LOGIN USER authenticatedUser', authenticatedUser);
						if (!authenticatedUser) throw fbkt().FbktCustomError('FbktBadLoginOrPassword', 'BAD LOGIN OR PASSWORD');
						else return _.mapKeys(authenticatedUser, function(value, key){
							return _.camelCase(key);
						});
					});
			}
		}
	}, callInfo);
};