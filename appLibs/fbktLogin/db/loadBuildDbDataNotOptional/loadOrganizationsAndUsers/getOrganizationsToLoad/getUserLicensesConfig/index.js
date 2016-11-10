"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'config/getUserLicensesConfig',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {
			"globalLicenses":	"getGlobalLicenses",
			"appLicenses":		"getAppLicenses",
			"envLicenses":		"getEnvLicenses"
		},
		pipelineSteps:  {
			"getGlobalLicenses":	(callInfo)=>{
				return require('../../../../../../../config/licenses.js');
			},
			"getAppLicenses":	(callInfo)=>{
				const app = fbkt().config.app;
				return require('../../../../../../../config/'+app+'/licenses.js');			
			},
			"getEnvLicenses":	(callInfo)=>{
				const app = fbkt().config.app;
				const env = fbkt().config.env;
				return require('../../../../../../../config/'+app+'/'+env+'/licenses.js');
			},
			"getUserLicensesConfig": (callInfo)=>{
				const globalLicenses = callInfo.params.globalLicenses;
				const appLicenses = callInfo.params.appLicenses; 
				const envLicenses = callInfo.params.envLicenses; 

				return R.mergeWith(R.concat, R.mergeWith(R.concat, globalLicenses, appLicenses), envLicenses);
			}
		}
	}, callInfo || {});
};