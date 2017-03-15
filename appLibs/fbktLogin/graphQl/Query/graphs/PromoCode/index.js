"use strict";
const Promise = require('bluebird');
const fbkt = require('fbkt');
const gql = require("graphql");

module.exports = new gql.GraphQLObjectType({
	name: 'PromoCode',
	fields: () => ({
		id: {
			type: gql.GraphQLID,
			resolve(promoCode){
				return promoCode.id
			}
		},
		licenseTypeId: {
			type: gql.GraphQLInt
		},
    name: {
      type: gql.GraphQLString
    },
    thePromoCode: {
			type: gql.GraphQLString
		}
	})
});