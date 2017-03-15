"use strict";
const Promise = require('bluebird');
const fbkt = require('fbkt');
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
    permissions: {
      type: new gql.GraphQLList(gql.GraphQLString),
      resolve: (licenseType) => {
        return fbkt().dbTree.fbkt_login.view.license_type_permission_view.findOne({
          params: {
            licenseTypeId: licenseType.id
          }
        })
          .then(result => {
            return result.permissions.filter(p => typeof p === 'string');
          })
      }
    }
	})
});