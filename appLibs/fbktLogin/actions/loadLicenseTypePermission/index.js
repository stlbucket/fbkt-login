"use strict";
const fbkt = require('fbkt');
const loadPermission = require('../loadPermission');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'load licenseTypePermission',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {
      dbPermission: 'loadPermission',
      existing: 'findExisting'
    },
    pipelineSteps: {
      'loadPermission': callInfo => {
        return loadPermission({
          params: {
            name: callInfo.params.permission
          }
        });
      },
      'findExisting': callInfo => {
        return fbkt().dbTree.fbkt_login.table.license_type_permission.findOne({
          params: {
            licenseTypeId: callInfo.params.licenseTypeId,
            permissionId: callInfo.params.dbPermission.id
          }
        });
      },
      'loadLicenseTypePermission': callInfo => {
        if (callInfo.params.existing) {
          return callInfo.params.existing;
        } else {
          return fbkt().dbTree.fbkt_login.table.license_type_permission.save({
            params: {
              licenseTypeId: callInfo.params.licenseTypeId,
              permissionId: callInfo.params.dbPermission.id
            }
          });
        }
      }
    }
  }, callInfo);
};