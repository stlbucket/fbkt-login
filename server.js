const Fbkt = require('fbkt');
const fbktpg = require('fbkt-pg');
const config = require('./config');
const appLibs = require('./appLibs');

const serverLibs = {
  dbAccess:		fbktpg.dbAccess,
  coreDb:			fbktpg.coreDb,
  dbManager:	fbktpg.dbManager,
  pgRestApi:	fbktpg.pgRestApi,
  fbktLogin:	appLibs.fbktLogin
};

const fbkt = Fbkt(config, serverLibs);

fbkt.runServer();