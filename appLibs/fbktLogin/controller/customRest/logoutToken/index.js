var fbkt = require('fbkt');
var logoutToken = require('../../../logoutToken');

module.exports = {
	url:           '/FbktLogin/LogoutToken',
	restEndpoints: {
		getAll: {
			enabled: true,
			auth:    'token',
			handler: function (callInfo) {
				return logoutToken(callInfo);
			}
		}
	}
};