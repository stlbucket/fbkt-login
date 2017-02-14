"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');

const applicationCompositeLoader = require('./loader');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'fbktLogin.loadDbDataNotOptional.loadApplication',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			applicationCompositeLoader:	applicationCompositeLoader
		}
	}, callInfo || {});
};