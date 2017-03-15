"use strict";
const fbkt = require('fbkt');
const gql = require("graphql");

const LicenseType = require('../LicenseType');

module.exports = new gql.GraphQLObjectType({
	name: 'Application',
	fields: () => ({
		id: {
			type: gql.GraphQLID,
			resolve(application){
				return application.id
			}
		},
    name: {
      type: gql.GraphQLString
    },
    version: {
      type: gql.GraphQLString
    },
    licenseTypes:	{
			type: new gql.GraphQLList(LicenseType),
			resolve:	(application)=>{
				return fbkt().dbTree.fbkt_login.table.license_type.findAll({
					params:	{
						applicationId: application.id
					}
				});
			}
		},
	})
});