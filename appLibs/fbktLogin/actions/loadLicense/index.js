"use strict";
const fbkt = require('fbkt');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'load license',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {
      licenseType: 'findLicenseType',
      existing: 'findExisting'
    },
    pipelineSteps: {
      'findLicenseType':  callInfo => {
        return fbkt().dbTree.fbkt_login.table.license_type.findOne({
          params: {
            licenseTypeKey: callInfo.params.licenseTypeKey
          }
        })
          .then(licenseType => {
            if (licenseType === null || licenseType === undefined) { throw new Error(`BAD LICENSE TYPE KEY: ${callInfo.params.licenseTypeKey}`)}
            else { return licenseType; }
          });
      },
      'findExisting': callInfo => {
        return fbkt().dbTree.fbkt_login.table.license.findAll({
          params: {
            contactId: callInfo.params.contactId
          }
        })
          .then(contactLicenses => {
            return contactLicenses.find(l => l.licenseTypeId === callInfo.params.licenseType.id)
          });
      },
      'loadLicense': callInfo => {
        if (callInfo.params.existing) {
          return callInfo.params.existing;
        } else {
          return fbkt().dbTree.fbkt_login.table.license.save({
            params: {
              contactId: callInfo.params.contactId,
              licenseTypeId: callInfo.params.licenseType.id,
              organizationId: callInfo.params.organizationId,
              status: 'ACTIVE'
            }
          });
        }
      }
    }
  }, callInfo);
};