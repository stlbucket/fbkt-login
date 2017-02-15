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
				const application = callInfo.params.application;
				if (R.isNil(application))
					throw fbkt().FbktCustomError('FbktApplicationError', "fbktLogin requires application to be defined");

        fbkt().clog('LOADING APPLICATION', application, true);
        return fbkt().loadComposite({
					params: {
            templateFilePath: `${__dirname}/template.hbs`,
            data:             application,
						executionMode:    'REPORTIT',
						reportFileName:   './ignoreAllThis/applicationCompositeLoaderTemplateOutput.txt'
					}
				});
			}
		}
	}, callInfo || {});
};