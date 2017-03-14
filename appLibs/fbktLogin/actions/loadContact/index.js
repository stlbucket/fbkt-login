"use strict";
const fbkt = require('fbkt');
const loadLocation = require('../loadLocation');

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
              const dbContactUpdate = Object.assign(callInfo.params.dbContact, {locationId: dbLocation.id});
              return fbkt().dbTree.fbkt_login.table.contact.save({
                params: dbContactUpdate
              })
            })
        } else {
          return callInfo.params.dbContact;
        }
      },
      'returnComposite': callInfo => {
        fbkt().clog('DB CONTACT', callInfo, true);
        return fbkt().dbTree.fbkt_login.composite.contact.findOne({
          params: {
            id: callInfo.params.dbContact.id
          }
        })
          .then(composite => {
            fbkt().clog('COMPOSITE', callInfo, true);
            // process.exit();
          })
      }
    }
  }, callInfo);
};