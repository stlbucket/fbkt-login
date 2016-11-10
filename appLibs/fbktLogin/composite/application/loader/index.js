"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');


module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin.loadApplication',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			loadApplication:	(callInfo)=>{
				const application = fbkt().config.getConfigValue('application', null);
				if (R.isNil(application)) 
					throw fbkt().FbktCustomError('FbktApplicationError', "fbktLogin requires config.application to be defined");
				
				return fbkt().loadComposite({
					params: {
            templateFilePath: `${__dirname}/template.hbs`,
            data:             application,
						executionMode:    'PROD',
						reportFileName:   './ignoreAllThis/applicationCompositeLoaderTemplateOutput.txt'
					}
				});
			}
		}
	}, callInfo || {});
};