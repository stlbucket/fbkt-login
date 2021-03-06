"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');
const graphqlHTTP = require('express-graphql');
const gql = require("graphql");

const Contact = require('../Contact');
const Location = require('../Location');

module.exports = new gql.GraphQLObjectType({
	name: 'Organization',
	fields: () => ({
		id: {
			type: gql.GraphQLInt,
			resolve(organization){
				return organization.id
			}
		},
		name: {
			type: gql.GraphQLString
		},
		contacts:	{
			type: new gql.GraphQLList(Contact),
			resolve:	(organization)=>{
				return fbkt().dbTree.fbkt_login.table.contact.findAll({
					params:	{
						organizationId: organization.id
					}
				});
			}
		},
		location: {
			type:	Location,
			resolve: (organization)=>{
				return fbkt().dbTree.fbkt_login.table.location.findOne({
					params:	{
						id:	organization.locationId,
					}
				});
			}
		}
	})
});