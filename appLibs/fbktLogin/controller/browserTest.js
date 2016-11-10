clear();

axios.post('/FbktLogin/LoginUser',{
	login: 'functionbucket@gmail.com',
	password: 'D70sDrll26OQo+iArwEeK/3gEqR6wUEzTrsIcDuCMkA='
})
	.then((result)=>{
		const userInfo = result.data;
		console.log('USER INFO', userInfo);

		return axios.get('/FbktLogin/CurrentUserInfo', {
			headers:{
				"authorization":userInfo.token
			}
		});

	})
	.then((result)=>{
		const userInfo = result.data;
		console.log('CURRENT USER INFO', userInfo);

		return axios.get('/FbktLogin/LogoutToken', {
			headers:{
				"authorization":userInfo.token
			}
		});

	})
	.then((result)=>{
		const userInfo = result.data;
		console.log('LOGOUT TOKEN INFO', userInfo);
		return axios.get('/FbktLogin/CurrentUserInfo', {
			headers:{
				"authorization":userInfo.token
			}
		});

	})
	.then((result)=>{
		const userInfo = result.data;
		console.log('CURRENT USER INFO', userInfo);
	});
