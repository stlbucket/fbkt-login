"use strict";
const Promise = require('bluebird');
const fbkt = require('fbkt');
const loadLicenseTypePermission = require('../loadLicenseTypePermission');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'load licenseType',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {
      existing: 'findExisting',
      dbLicenseType: 'loadLicenseType'
    },
    pipelineSteps: {
      'findExisting': callInfo => {
        return fbkt().dbTree.fbkt_login.table.license_type.findOne({
          params: {
            applicationId: callInfo.params.applicationId,
            licenseTypeKey: callInfo.params.licenseTypeKey
          }
        });
      },
      'loadLicenseType': callInfo => {
        if (callInfo.params.existing) {
          return callInfo.params.existing;
        } else {
          return fbkt().dbTree.fbkt_login.table.license_type.save({
            params: {
              name: callInfo.params.name,
              applicationId: callInfo.params.applicationId,
              licenseTypeKey: callInfo.params.licenseTypeKey,
              active: true
            }
          });
        }
      },
      'loadLicenseTypePermisssions': callInfo => {
        const permissions = callInfo.params.permissions;
        return Promise.mapSeries(
          permissions,
          permission => {
            return loadLicenseTypePermission({
              params: {
                licenseTypeId:  callInfo.params.dbLicenseType.id,
                permission: permission
              }
            })
          }
        )
      }
    }
  }, callInfo);
};