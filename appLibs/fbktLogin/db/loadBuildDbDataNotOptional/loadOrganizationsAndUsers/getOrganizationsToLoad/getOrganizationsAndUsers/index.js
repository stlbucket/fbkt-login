"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');


module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'UNNAMED FBKT PIPE',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			"getOrganizationsAndUsers": (callInfo)=>{
				try {
					return require('../../../../../../../config/organizationsAndUsers.js');
				} catch (err){
					process.exit();
				}
			},
		}
	}, callInfo || {});
};