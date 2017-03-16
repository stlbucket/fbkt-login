"use strict";
const Promise      = require('bluebird');
const graphql      = require('graphql').graphql;
const fbkt         = require('fbkt');
const loadLocation = require('../loadLocation');
const loadLicense  = require('../loadLicense');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'load contact',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {
      existing: 'findExisting',
      useOrganizationId: 'findOrCreateOrganizationId',
      dbContact: 'loadContact'
    },
    pipelineSteps: {
      'findExisting': callInfo => {
        return fbkt().dbTree.fbkt_login.table.contact.findOne({
          params: {
            email: callInfo.params.email
          }
        });
      },
      'findOrCreateOrganizationId': callInfo => {
        if (callInfo.params.existing || callInfo.params.organizationId) {
          return callInfo.params.organizationId;
        } else {
          if (!(callInfo.params.organizationName)) {
            throw new Error('CANNOT LOAD CONTACT WITH OUT ORGANIZATION ID OR NAME')
          }
          else {
            return fbkt().dbTree.fbkt_login.table.organization.findOne({
              params: {
                name: callInfo.params.organizationName
              }
            })
              .then(organization => {
                if (organization) {
                  return organization;
                } else {
                  return fbkt().dbTree.fbkt_login.table.organization.save({
                    params: {
                      name: callInfo.params.organizationName
                    }
                  })
                }
              })
              .then(dbOrganization => {
                return dbOrganization.id;
              });
          }
        }
      },
      'loadContact': callInfo => {
        // fbkt.clog('LOAD CONTACT', callInfo.params, true);
        if (callInfo.params.existing) {
          return callInfo.params.existing;
        } else {
          return fbkt().dbTree.fbkt_login.table.contact.save({
            params: {
              organizationId: callInfo.params.useOrganizationId,
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
      'queryGraphql': callInfo => {
        const graphQlQuery = `
query {
  contact(id: ${callInfo.params.dbContact.id}){
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
        return fbkt.queryGraphql(graphQlQuery)
          .then(result => {
            return result.contact[0];
          });
      }
    }
  }, callInfo);
};

