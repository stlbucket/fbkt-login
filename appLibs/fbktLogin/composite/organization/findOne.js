"use strict";
const fbkt = require('fbkt');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'FIND ONE',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {},
    pipelineSteps: {
      'FIND ONE': callInfo => {
        return fbkt().dbTree.fbkt_login.composite.organization.findOne({
          params: {
            id: 2
          }
        });
      }
    }
  }, callInfo);
};