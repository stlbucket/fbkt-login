const Fbkt = require('fbkt');
const fbktpg = require('fbkt-pg');
const config = require('./config');
const appLibs = require('./appLibs');

const serverLibs = {
  dbAccess:		fbktpg.dbAccess,
  coreDb:			fbktpg.coreDb,
  dbManager:	fbktpg.dbManager,
  pgRestApi:	fbktpg.pgRestApi,
  appLibOne:	appLibs.fkbtLogin
};

const fbkt = Fbkt(config, serverLibs);

fbkt.runServer();