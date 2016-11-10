"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');

const getOrganizationsToLoad = require('./getOrganizationsToLoad');
const loadOrganization = require('./loadOrganization');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin/db/loadBuildDbDataNotOptional/loadOrganizationsAndUsers',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {
			"organizationsToLoad":	"getOrganizationsToLoad",
			"loadedOrganizations":	"loadOrganizations"
		},
		pipelineSteps:  {
			"getOrganizationsToLoad": getOrganizationsToLoad,
			"loadOrganizations": (callInfo)=>{
				fbkt().clog('LOADING ORGANIZATIONS', callInfo.params.organizationsToLoad, true);
				return Promise.mapSeries(
					callInfo.params.organizationsToLoad,
					(organization)=>{
						return loadOrganization({params:	{ organization:	organization}});
					}
				);
			},
			// "report":	(callInfo)=>{
			// 	fbkt().clog('LOADED ORGS', callInfo.params.loadedOrganizations, true); process.exit();
			// }
		}
	}, callInfo || {});
};