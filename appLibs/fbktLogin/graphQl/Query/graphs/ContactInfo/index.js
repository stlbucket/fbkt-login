"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');
const graphqlHTTP = require('express-graphql');
const gql = require("graphql");
const Location = require('../Location');


module.exports = new gql.GraphQLObjectType({
	name: 'ContactInfo',
	fields: () => ({
		id: {
			type: gql.GraphQLID,
			resolve(contact){
				return contact.id
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
		jobTitle: {
			type: gql.GraphQLString
		},
		phoneNumber: {
			type: gql.GraphQLString
		},
		inactive: {
			type: gql.GraphQLBoolean
		},
		location: {
			type:	Location,
			resolve: (contact)=>{
				return fbkt().dbTree.fbkt_login.table.location.findOne({
					params:	{
						id:	contact.locationId,
					}
				});
			}
		},
	})
});