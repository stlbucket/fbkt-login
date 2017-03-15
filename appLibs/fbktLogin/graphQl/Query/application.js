const fbkt = require('fbkt');
const gql = require('graphql');
const Application = require('./graphs/Application');


module.exports = {
	type: Application,
	args: {
		id: 				{type: gql.GraphQLInt},
		name:				{type:	gql.GraphQLString}
	},
	resolve(application, params){
		return fbkt().dbTree.fbkt_login.table.application.findOne({
			params: params
		});
	}
};