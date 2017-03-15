"use strict";
const Promise = require('bluebird');
const graphql = require('graphql').graphql;
const fbkt = require('fbkt');
const loadLocation = require('../loadLocation');
const loadLicense = require('../loadLicense');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'load contact',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {
      dbContact:  'loadContact'
    },
    pipelineSteps: {
      'findExisting': callInfo => {
        return fbkt().dbTree.fbkt_login.table.contact.findOne({
          name: callInfo.params.email
        });
      },
      'loadContact': callInfo => {
        // fbkt().clog('LOAD CONTACT', callInfo.params, true);
        if (callInfo.params.existing) {
          return callInfo.params.existing;
        } else {
          return fbkt().dbTree.fbkt_login.table.contact.save({
            params: {
              organizationId: callInfo.params.organizationId,
              firstName: callInfo.params.firstName,
              lastName: callInfo.params.lastName,
              email: callInfo.params.email,
              phoneNumber: callInfo.params.phoneNumber,
              jobTitle: callInfo.params.jobTitle,
            }
          });
        }
      },
      'loadLocation': callInfo => {
        if (callInfo.params.location) {
          return loadLocation(callInfo.params.location)
            .then(dbLocation => {
              const dbContactToUpdate = Object.assign(callInfo.params.dbContact, {locationId: dbLocation.id});
              return fbkt().dbTree.fbkt_login.table.contact.save({
                params: dbContactToUpdate
              })
            })
        } else {
          return callInfo.params.dbContact;
        }
      },
      'loadLicense': callInfo => {
        if (callInfo.params.licenses) {
          return Promise.mapSeries(
            callInfo.params.licenses,
            license => {
              const licenseToLoad = Object.assign(license, {
                contactId: callInfo.params.dbContact.id,
                organizationId: callInfo.params.dbContact.organizationId
              });
              return loadLicense(licenseToLoad);
            }
          );
        }
      },
      'returnComposite': callInfo => {
        // fbkt().clog('DB CONTACT', callInfo, true);
        return graphql(fbkt().graphqlSchema, graphQlQuery);

      }
      // 'returnComposite': callInfo => {
      //   // fbkt().clog('DB CONTACT', callInfo, true);
      //   return fbkt().dbTree.fbkt_login.composite.contact.findOne({
      //     params: {
      //       id: callInfo.params.dbContact.id
      //     }
      //   })
      //     .then(composite => {
      //       // fbkt().clog('COMPOSITE', callInfo, true);
      //       // process.exit();
      //     })
      // }
    }
  }, callInfo);
};

const graphQlQuery = `
query {
  contact(id: 2){
    id,
    email,
    location {
      name,
      geoJson {
        type
        coordinates
      },
      city
    },
    licenses {
      licenseType {
        licenseTypeKey
      }
    }
  }
}`;