"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');


module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin/logoutToken',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			"logoutToken": (callInfo)=> {
				//fbkt().clog('LOGOUT TOKEN BEGIN', self.options);
				if (!callInfo.user.token){
					return new Error('BAD LOGIN TOKEN: '+JSON.stringify(callInfo));
				}

				return fbkt().sqlTemplateManager({
          templateFilePath: `${__dirname}/template.hbs`,
          templateData:		callInfo.user,
					executionMode: 		'PROD',
					reportFileName:		'./ignoreAllThis/logoutTokenTemplateOutput.txt',
					expectScalar:		true
				})
					.then(function(result){
						if (result && result.message === 'Successfully Logged Out')
							return 'Successfully Logged Out';
						else
							return 'Unable To Log Out';
					});
			}
		}
	}, callInfo || {});
};