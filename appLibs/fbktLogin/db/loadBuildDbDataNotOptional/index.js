"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');

const loadApplication = require('./loadApplication');
const loadOrganizationsAndUsers = require('./loadOrganizationsAndUsers');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin.loadBuildDbDataNotOptional',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			loadApplication:						loadApplication,
			loadOrganizationsAndUsers:	loadOrganizationsAndUsers
		}
	}, callInfo || {});
};