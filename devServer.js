let Fbkt = require('fbkt');
let config = require('./config/dev');
const fbktpg = require('fbkt-pg');
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