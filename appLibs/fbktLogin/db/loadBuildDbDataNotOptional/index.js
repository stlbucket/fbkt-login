"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');

const defaultApplication = require('./defaultApplication');
const defaultOrganizationsAndUsers = require('./defaultOrganizationsAndUsers');
const loadApplication = require('./loadApplication');
const loadOrganizationsAndUsers = require('./loadOrganizationsAndUsers');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin.loadBuildDbDataNotOptional',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			'loadApplication':	callInfo => {
        return loadApplication({
          params: {
            application:  defaultApplication
          }
        });
      },
			'loadOrganizationsAndUsers': callInfo => {
        return loadOrganizationsAndUsers({
          organizationsAndUsers:  defaultOrganizationsAndUsers
        })
      }
		}
	}, callInfo || {});
};