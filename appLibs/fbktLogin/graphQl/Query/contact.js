const fbkt = require('fbkt');
const gql = require('graphql');
const Contact = require('./graphs/Contact');


module.exports = {
	type: new gql.GraphQLList(Contact),
	args: {
		id: 							{type: gql.GraphQLInt},
    organizationId:   {type: gql.GraphQLInt},
		firstName:				{type:	gql.GraphQLString},
		lastName:					{type:	gql.GraphQLString},
		email:						{type:	gql.GraphQLString},
		phoneNumber:			{type:	gql.GraphQLString},
		jobTitle:					{type:	gql.GraphQLString},
		inactive:					{type:	gql.GraphQLBoolean}
	},
	resolve(contact, params){
		return fbkt().dbTree.fbkt_login.table.contact.findAll({
			params: params,
		});
	}
};