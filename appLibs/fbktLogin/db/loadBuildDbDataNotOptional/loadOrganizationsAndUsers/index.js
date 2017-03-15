"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');

const loadOrganization = require('../../../actions/loadOrganization');

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
        fbkt.clog('LOAD ORGS', callInfo.params.organizationsAndUsers, true);
				return Promise.mapSeries(
          callInfo.params.organizationsAndUsers,
					(organization)=>{
						return loadOrganization({params:	organization});
					}
				);
			},
			"report":	(callInfo)=>{
				fbkt.clog('LOADED ORGS', callInfo.params.loadedOrganizations, true);
			}
		}
	}, callInfo || {});
};