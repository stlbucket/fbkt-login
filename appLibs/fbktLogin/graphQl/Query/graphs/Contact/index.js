"use strict";
const fbkt = require('fbkt');
const gql = require("graphql");

const OrganizationInfo = require('./OrganizationInfo');
const Location = require('../Location');
const License = require('../License');

module.exports = new gql.GraphQLObjectType({
	name: 'Contact',
	fields: () => ({
		id: {
			type: gql.GraphQLInt,
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
    licenses: {
      type: new gql.GraphQLList(License),
      resolve: (contact) => {
        return fbkt().dbTree.fbkt_login.table.license.findAll({
          params: {
            contactId: contact.id
          }
        })
      }
    },
		organization:	{
			type:	OrganizationInfo,
			resolve: (contact)=>{
				return fbkt().dbTree.fbkt_login.view.organization_view.findOne({
					params:	{
						id:	contact.organizationId,
					}
				});
			}
		}
	})
});