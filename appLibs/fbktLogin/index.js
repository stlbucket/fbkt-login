module.exports = {
  packageName: 'FbktLogin',
  libRelativePath: function () {
    return __dirname;
  },
  application:  require('./db/loadBuildDbDataNotOptional/defaultApplication'),
  dbOrganizationsAndUsers:  require('./db/loadBuildDbDataNotOptional/defaultOrganizationsAndUsers'),
  schema: 'fbkt_login',
  graphQl: require('./graphQl'),
  dbScripts: [
    `${__dirname}/db/sqlScripts/lockedDoNotEdit/tables/fbkt_login_1_0_0.sql`,
  ],
  dbPatches: [
    // these were brought from legacy - they need to be evaluated  
    `${__dirname}/db/sqlScripts/unlocked/views/organization_view.sql`,
    `${__dirname}/db/sqlScripts/unlocked/views/contact_view.sql`,
    `${__dirname}/db/sqlScripts/unlocked/views/customer_user_view.sql`,
    `${__dirname}/db/sqlScripts/unlocked/views/user_login_token_view.sql`,
    `${__dirname}/db/sqlScripts/unlocked/views/user_permission_view.sql`,
    `${__dirname}/db/sqlScripts/unlocked/views/license_type_permission_view.sql`,

    // these are new
    `${__dirname}/db/sqlScripts/unlocked/views/authenticated_user_view.sql`,

    `${__dirname}/db/sqlScripts/unlocked/functions/fn_update_location_geo.sql`,
    `${__dirname}/db/sqlScripts/unlocked/triggers/trg_insert_location.sql`
  ],
  customRestControllers: [
    require('./controller/customRest/loginUser'),
    require('./controller/customRest/currentUserInfo'),
    require('./controller/customRest/logoutToken'),
  ],
  loadBuildDbDataNotOptional: require('./db/loadBuildDbDataNotOptional'),
  fbktLoginToken: require('./loginToken'),
  fbktLoginUser: require('./loginUser'),
  logoutToken: require('./logoutToken'),
};