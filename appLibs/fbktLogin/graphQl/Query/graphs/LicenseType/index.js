"use strict";
const gql = require("graphql");

module.exports = new gql.GraphQLObjectType({
	name: 'LicenseType',
	fields: () => ({
		id: {
			type: gql.GraphQLID,
			resolve(licenseType){
				return licenseType.id
			}
		},
		applicationId: {
			type: gql.GraphQLInt
		},
    name: {
      type: gql.GraphQLString
    },
    licenseTypeKey: {
			type: gql.GraphQLString
		},
		active: {
			type: gql.GraphQLBoolean
		},
	})
});