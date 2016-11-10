const fbkt = require('fbkt');
const gql = require('graphql');
const AuthenticatedUser = require('./graphs/AuthenticatedUser');

module.exports = {
	type: AuthenticatedUser,
	args: {
		token: 							{
			type: new gql.GraphQLNonNull(gql.GraphQLString),
		},
	},
	resolve(contact, params){
		return fbkt().dbTree.fbkt_login.view.authenticated_user_view.findOne({
			params: params
		});
	}
};