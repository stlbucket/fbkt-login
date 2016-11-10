"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');
const graphqlHTTP = require('express-graphql');
const gql = require("graphql");

module.exports = new gql.GraphQLObjectType({
	name: 'AuthenticatedUser',
	fields: () => ({
		id: {
			type: gql.GraphQLID,
			resolve(authenticatedUser){
				return authenticatedUser.id
			}
		},
		firstName: {
			type: gql.GraphQLString
		},
		lastName: {
			type: gql.GraphQLString
		},
		email: {
			type: gql.GraphQLString
		},
		login: {
			type: gql.GraphQLString
		},
		token: {
			type: gql.GraphQLString
		},
		expirationDate: {
			type: gql.GraphQLString
		},
	})
});