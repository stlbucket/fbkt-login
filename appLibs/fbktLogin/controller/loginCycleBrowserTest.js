var token = null;
var calls = {};

var methods = {
	loginFail: function(next){
		if (typeof calls.loginFail !== 'object'){
			calls.loginFail = $.ajax({
				url: 'http://localhost:20831/FbktLogin/LoginUser',
				type: 'post',
				data: {
					login:'functionbucket@gmail.com',
					hashedPassword: '8GOMY1R45rv1f7Mo1pY6a9PnW41hOJUKFwO6TzFtMxQ='
				},
				error: function(error){
					console.log('login error', error);
					next();
				}
			})
		}
	},
	login: function(next){
		if (typeof calls.login !== 'object'){
			calls.login = $.ajax({
				url: 'http://localhost:20831/FbktLogin/LoginUser',
				type: 'post',
				data: {
					login:'functionbucket@gmail.com',
					hashedPassword: '8GOMY1R45rv1f7Mo1pY6a9PnW41hOJUKFwO6TzFtMxQ='
				},
				success: function(result){
					console.log('login result', result);
					token = result.token;
					next();
				}
			})
		}
	},
	currentUserInfo: function(next){
		$.ajax({
			url: 'http://localhost:20831/FbktLogin/CurrentUserInfo',
			type: 'get',
			beforeSend:      function(xhr){
				xhr.setRequestHeader ("Authorization", token);
			},
			success: function(result){
				console.log('token result', result);
				next();
			}
		});
	},
	tokenLogout: function(next){
		$.ajax({
			url: 'http://localhost:20831/FbktLogin/logoutToken',
			type: 'get',
			beforeSend:      function(xhr){
				xhr.setRequestHeader ("Authorization", token);
			},
			success: function(result){
				console.log('token result', result);
				next();
			}
		});
	},
	fbkt: function(next){
		$.ajax({
			url: 'http://localhost:20831/FbktCoreDb/Fbkt',
			type: 'get',
			beforeSend:      function(xhr){
				xhr.setRequestHeader ("Authorization", token);
			},
			success: function(result){
				console.log('fbkt result', result);
				next()
			}
		});
	},
};

var loginFail = function(){
	methods.loginFail(login);
};

var login = function(){
	methods.login(currentUserInfo);
};

var done = 0;
var currentUserInfo = function(){
	if (done === 0){
		done = 1;
		methods.currentUserInfo(fbkt);
	} else {
		methods.currentUserInfo();
	}
};

var fbkt = function(){
	methods.fbkt(tokenLogout);
};

var tokenLogout = function(){
	//methods.tokenLogout();
	methods.tokenLogout(currentUserInfo);
};

login();