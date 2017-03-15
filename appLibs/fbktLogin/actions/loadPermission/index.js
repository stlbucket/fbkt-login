"use strict";
const fbkt = require('fbkt');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'load permission',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {
      existing: 'findExisting'
    },
    pipelineSteps: {
      'findExisting': callInfo => {
        return fbkt().dbTree.fbkt_login.table.permission.findOne({
          params: {
            name: callInfo.params.name,
          }
        });
      },
      'loadPermission': callInfo => {
        if (callInfo.params.existing) {
          return callInfo.params.existing;
        } else {
          return fbkt().dbTree.fbkt_login.table.permission.save({
            params: {
              name: callInfo.params.name,
            }
          });
        }
      }
    }
  }, callInfo);
};