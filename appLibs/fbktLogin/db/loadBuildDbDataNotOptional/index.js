"use strict";
const fbkt = require('fbkt');
const colors = require('colors');
const R = require('ramda');

const defaultApplication = require('./defaultApplication');
const defaultOrganizationsAndUsers = require('./defaultOrganizationsAndUsers');

const loadApplication = require('./loadApplication');
const loadOrganizationsAndUsers = require('./loadOrganizationsAndUsers');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin.loadBuildDbDataNotOptional',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {
      'application':  'findApplication',
      'organizationsAndUsers': 'findOrganizationsAndUsers'
    },
		pipelineSteps:  {
      'findApplication':  callInfo => {

        const dbApplicationLib = fbkt().config.dbApplicationLib;
        const application = fbkt()._appLibs[dbApplicationLib].application;

        if (dbApplicationLib && !application) {
          console.log(colors.red(`NO APPLICATION SPECIFIED IN DB APPLICATION LIB: ${dbApplicationLib}`))
          process.exit();
        }

        return application || defaultApplication;
      },
      'findOrganizationsAndUsers':  callInfo => {
        const dbOrganizationsAndUsersLibs = fbkt().config.dbOrganizationsAndUsersLibs;

        return dbOrganizationsAndUsersLibs.reduce(
          (all, lib) => {
            const appLib = fbkt()._appLibs[lib];
            if (R.isNil(appLib)) {
              console.log(colors.red(`INVALID ORGANIZATIONS AND USERS LIB SPECIFIED: ${lib}`));
              process.exit();
            }

            if (R.isNil(appLib.dbOrganizationsAndUsers)){
              console.log(colors.red(`NO ORGANIZATIONS AND USERS SPECIFIED IN LIB: ${lib}`));
              process.exit();
            }
            return Object.assign(all, lib.dbOrganizationsAndUsers)
          },
          defaultOrganizationsAndUsers
        );
      },
			'loadApplication':	callInfo => {
        return loadApplication({
          params: {
            application:  callInfo.params.application
          }
        });
      },
			'loadOrganizationsAndUsers': callInfo => {
        return loadOrganizationsAndUsers({
          organizationsAndUsers:  callInfo.params.organizationsAndUsers
        })
      }
		}
	}, callInfo || {});
};