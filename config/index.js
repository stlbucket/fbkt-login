module.exports = {
  port: process.env.PORT || 20831,
  appRouteFilter: process.env.APP_ROUTE_FILTER,
  restErrorMode: process.env.REST_ERROR_MODE,
  defaultEntityControllerAuth: process.env.DEFAULT_ENTITY_CONTROLLER_AUTH,
  apiVersion: process.env.API_VERSION,
  enableGraphIql: process.env.ENABLE_GRAPH_IQL,
  dbApplicationLib: process.env.DB_APPLICATION_LIB,
  dbOrganizationsAndUsersLibs:  process.env.DB_ORGANIZATIONS_AND_USERS_LIBS.split(','),
  dbAccess: {
    client: process.env.DB_CLIENT,
    connection: process.env.DB_CONNECTION,
    debug: process.env.DB_DEBUG === 'true',
  }
};