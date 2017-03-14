"use strict";
const fbkt = require('fbkt');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'load location',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {},
    pipelineSteps: {
      'findExisting': callInfo => {
        return fbkt().dbTree.fbkt_login.table.location.findOne({
          name: callInfo.params.email
        });
      },
      'loadLocation': callInfo => {
        // fbkt().clog('LOAD LOCATION', callInfo.params, true);
        if (callInfo.params.existing) {
          return callInfo.params.existing;
        } else {
          const params = callInfo.params;
          return fbkt().dbTree.fbkt_login.table.location.save({
            params: {
              name: params.name,
              geoJson:  params.geoJson,
              address1: params.address1,
              address2: params.address2,
              city: params.city,
              state: params.state,
              postalCode: params.postalCode,
              county:  params.county,
              country: params.country
            }
          });
        }
      }
    }
  }, callInfo);
};