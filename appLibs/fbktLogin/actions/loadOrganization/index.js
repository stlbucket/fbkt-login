"use strict";
const Promise = require('bluebird');
const graphql = require('graphql').graphql;
const fbkt = require('fbkt');
const loadContact = require('../loadContact');
const loadLocation = require('../loadLocation');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'load organization',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {
      existing: 'findExisting',
      dbOrganization: 'loadOrganization',
    },
    pipelineSteps: {
      'findExisting': callInfo => {
        return fbkt().dbTree.fbkt_login.table.organization.findOne({
          params: {
            name: callInfo.params.name
          }
        });
      },
      'loadOrganization': callInfo => {
        if (callInfo.params.existing) {
          return callInfo.params.existing;
        } else {
          return fbkt().dbTree.fbkt_login.table.organization.save({
            params: {
              name: callInfo.params.name
            }
          });
        }
      },
      'loadOrganizationContacts': callInfo => {
        const contacts = callInfo.params.contacts;
        return Promise.mapSeries(
          contacts,
          contact => {
            const contactToLoad = Object.assign(contact, {organizationId: callInfo.params.dbOrganization.id});
            // fbkt.clog('contactToLoad', contactToLoad, true); process.exit();
            return loadContact({
              params: contactToLoad
            });
          }
        );
      },
      'loadLocation': callInfo => {
        // fbkt.clog('loadLocation', callInfo, true); process.exit();

        if (callInfo.params.location) {
          return loadLocation(callInfo.params.location)
            .then(dbLocation => {
              const dbOrganizationToUpdate = Object.assign(callInfo.params.dbOrganization, {locationId: dbLocation.id});
              return fbkt().dbTree.fbkt_login.table.organization.save({
                params: dbOrganizationToUpdate
              });
            });
        } else {
          return callInfo.params.dbOrganization;
        }
      },
      'returnGraph': callInfo => {
        const graphQlQuery = `
query {
  organization(id: ${callInfo.params.dbOrganization.id}) {
    id,
    name,
    contacts {
      id,
      email,
      licenses {
        licenseType {
          licenseTypeKey
        }
      }
      location {
        name,
        geoJson {
          coordinates
        }
      }
    }
  }
}
`;

        return fbkt.queryGraphql(graphQlQuery)
          .then(result => {
            return result.organization[0];
          });
      }
    }
  }, callInfo);
};


