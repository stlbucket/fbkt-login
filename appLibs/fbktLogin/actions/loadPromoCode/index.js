"use strict";
const Promise = require('bluebird');
const fbkt = require('fbkt');

module.exports = callInfo => {
  return fbkt().FbktPipe({
    name: 'load promoCode',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {
      existing: 'findExisting',
      dbPromoCode: 'loadPromoCode'
    },
    pipelineSteps: {
      'findExisting': callInfo => {
        return fbkt().dbTree.fbkt_login.table.promo_code.findOne({
          params: {
            thePromoCode: callInfo.params.thePromoCode
          }
        });
      },
      'loadPromoCode': callInfo => {
        if (callInfo.params.existing) {
          return callInfo.params.existing;
        } else {
          return fbkt().dbTree.fbkt_login.table.promo_code.save({
            params: {
              licenseTypeId:  callInfo.params.licenseTypeId,
              name: callInfo.params.name,
              thePromoCode: callInfo.params.thePromoCode,
              expirationDate: callInfo.params.expirationDate
            }
          });
        }
      },
    }
  }, callInfo);
};