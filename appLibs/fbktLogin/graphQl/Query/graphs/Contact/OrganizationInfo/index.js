"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');
const graphqlHTTP = require('express-graphql');
const gql = require("graphql");

module.exports = new gql.GraphQLObjectType({
	name: 'OrganizationInfo',
	fields: () => ({
		id: {
			type: gql.GraphQLID,
			resolve(organization){
				return organization.id
			}
		},
		name: {
			type: gql.GraphQLString
		},
	})
});