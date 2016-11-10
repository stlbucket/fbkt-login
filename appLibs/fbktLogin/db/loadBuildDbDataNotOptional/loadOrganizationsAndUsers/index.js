"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');

const loadOrganization = require('./loadOrganization');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin/db/loadBuildDbDataNotOptional/loadOrganizationsAndUsers',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {
			"loadedOrganizations":	"loadOrganizations"
		},
		pipelineSteps:  {
			"loadOrganizations": (callInfo)=>{
        fbkt().clog('LOAD ORGS', fbkt().config.organizationsAndUsers, true);
				return Promise.mapSeries(
          fbkt().config.organizationsAndUsers,
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