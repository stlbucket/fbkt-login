"use strict";
const fbkt = require('fbkt');
const gql = require("graphql");
const LicenseType = require('../LicenseType');

module.exports = new gql.GraphQLObjectType({
	name: 'License',
	fields: () => ({
		id: {
			type: gql.GraphQLID,
			resolve(license){
				return license.id
			}
		},
    organizationId: {
      type: gql.GraphQLID
    },
    contactId: {
      type: gql.GraphQLID
    },
    licenseType: {
      type: LicenseType,
      resolve: (license) => {
        return fbkt().dbTree.fbkt_login.table.license_type.findOne({
          params: {
            id: license.licenseTypeId
          }
        })
      }
    },
    activationDate: {
      type: gql.GraphQLString
    },
    expirationDate: {
      type: gql.GraphQLString
    },
		status: {
			type: gql.GraphQLString
		},
	})
});