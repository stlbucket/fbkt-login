"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');


module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin/db/loadBuildDbDataNotOptional/loadOrganizationsAndUsers/loadOrganization',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps: {
			"loadOrganization": (callInfo)=> {
				return fbkt().loadComposite({ 
					params: {
            templateFilePath: `${__dirname}/template.hbs`,
            templateData:     callInfo.params.organization,
						executionMode:    'REPORTIT',
						reportFileName:   './ignoreAllThis/organizationCompositeLoaderTemplateOutput.txt'
					}
				});
			}
		}
	}, callInfo || {});
};