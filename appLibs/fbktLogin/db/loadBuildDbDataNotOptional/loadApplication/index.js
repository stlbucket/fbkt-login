"use strict";
const fbkt = require('fbkt');

const loadApplication = require('../../../actions/loadApplication');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin.loadDbDataNotOptional.loadApplication',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			loadApplication:	callInfo => {
        return loadApplication(callInfo)
          .then(result => {
            fbkt.clog('LOADED APPLICATION', result, true);
          });
      }
		}
	}, callInfo || {});
};