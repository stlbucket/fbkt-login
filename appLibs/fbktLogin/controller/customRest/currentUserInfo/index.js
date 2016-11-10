var when = require('when');
var _ = require('lodash');
var fbkt = require('fbkt');

module.exports = {
	url:   '/FbktLogin/CurrentUserInfo',
	restEndpoints:  {
		getAll: {
			enabled:    true,
			auth:       'token',
			handler:	function(options){
				//console.log('OPTIONS', options);				
				//process.exit();
				var retval = _.mapKeys(options.user, function(value, key){
					return _.camelCase(key);
				});
				//if(retval.applicationName === "PGE Dam Monitor"){
				//	var pgeShim = require('../../../../../scripts/fbktLibs/appDamMonitor/shims/currentUserInfo_shim.js');
				//JDS - shim for PGE, might need to be rolled into user in some fashion. probably an fbkt path I can ref to get the lib
				//	retval._pgeUserCanEdit = pgeShim.getPGEUserCanEdit(retval);
				//}
				retval._pgeUserCanEdit=true;
				return when(retval);
			}
		}
	}
};