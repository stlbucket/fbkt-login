"use strict";
const Promise = require('bluebird');
const graphql = require('graphql').graphql;
const fbkt = require('fbkt');
const loadLicenseType = require('../loadLicenseType');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'load application',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {
      existing: 'findExisting',
      dbApplication: 'loadApplication',
    },
    pipelineSteps: {
      'findExisting': callInfo => {
        fbkt().clog('LOAD APPLICATION', callInfo, true);

        return fbkt().dbTree.fbkt_login.table.application.findOne({
          params: {
            name: callInfo.params.name
          }
        });
      },
      'loadApplication': callInfo => {
        if (callInfo.params.existing) {
          return callInfo.params.existing;
        } else {
          return fbkt().dbTree.fbkt_login.table.application.save({
            params: {
              name: callInfo.params.name,
              version: callInfo.params.version
            }
          });
        }
      },
      'loadLicenseTypes': callInfo => {
        const licenseTypes = callInfo.params.licenseTypes;
        return Promise.mapSeries(
          licenseTypes,
          licenseType => {
            const licenseTypeToLoad = Object.assign(licenseType, {applicationId: callInfo.params.dbApplication.id});
            // fbkt().clog('contactToLoad', contactToLoad, true); process.exit();
            return loadLicenseType({
              params: licenseTypeToLoad
            });
          }
        );
      },
      // 'loadLocation': callInfo => {
      //   // fbkt().clog('loadLocation', callInfo, true); process.exit();
      //
      //   if (callInfo.params.location) {
      //     return loadLocation(callInfo.params.location)
      //       .then(dbLocation => {
      //         const dbApplicationToUpdate = Object.assign(callInfo.params.dbApplication, {locationId: dbLocation.id});
      //         return fbkt().dbTree.fbkt_login.table.application.save({
      //           params: dbApplicationToUpdate
      //         });
      //       });
      //   } else {
      //     return callInfo.params.dbApplication;
      //   }
      // },
      'returnGraph': callInfo => {
        const graphQlQuery = `
query {
  application {
    name,
    version,
    licenseTypes {
      name,
      licenseTypeKey,
      permissions
    }
  }
}
`;

        return fbkt.queryGraphql(graphQlQuery);
      }
    }
  }, callInfo);
};


