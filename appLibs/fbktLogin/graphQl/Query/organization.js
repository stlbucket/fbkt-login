const fbkt = require('fbkt');
const gql = require('graphql');
const Organization = require('./graphs/Organization');


module.exports = {
	type: new gql.GraphQLList(Organization),
	args: {
		id: 				{type: gql.GraphQLInt},
		name:				{type:	gql.GraphQLString}
	},
	resolve(organization, params){
		return fbkt().dbTree.fbkt_login.table.organization.findAll({
			params: params
		});
	}
};