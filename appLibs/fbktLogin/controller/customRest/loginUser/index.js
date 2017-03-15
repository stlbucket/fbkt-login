var fbkt = require('fbkt');
var loginUser = require('../../../loginUser');


module.exports = {
	url:           '/FbktLogin/LoginUser',
	restEndpoints: {
		post: {
			enabled: true,
			auth:    'none',
			handler: function (callInfo) {
				// fbkt.clog('LOGIN USER', callInfo.params);
				return loginUser(callInfo)
					.catch((error)=> {
						// fbkt.clog('LOGIN ERROR', error);
						if (error.name === "FbktBadLoginOrPassword") return error.toString();
						throw error;
					});
			}
		}
	}
};