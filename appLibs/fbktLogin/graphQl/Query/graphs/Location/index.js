"use strict";
const gql = require("graphql");
const GeoJsonPoint = require('../GeoJsonPoint');

module.exports = new gql.GraphQLObjectType({
	name: 'Location',
	fields: () => ({
		id: {
			type: gql.GraphQLID,
			resolve(location){
				return location.id
			}
		},
		name: {
			type: gql.GraphQLString
		},
		geoJson: {
			type: GeoJsonPoint
		},
		address1: {
			type: gql.GraphQLString
		},
		address2: {
			type: gql.GraphQLString
		},
		city: {
			type: gql.GraphQLString
		},
		state: {
			type: gql.GraphQLString
		},
		postalCode: {
			type: gql.GraphQLString
		},
	})
});