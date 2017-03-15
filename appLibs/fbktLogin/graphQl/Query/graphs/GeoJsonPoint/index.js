"use strict";
const gql = require("graphql");

module.exports = new gql.GraphQLObjectType({
  name: "GeoJsonPoint",
  fields: () => ({
    type: {
      type: gql.GraphQLString
    },
    coordinates: {
      type: new gql.GraphQLList(gql.GraphQLFloat)
    },
  })
});