module.exports = {
	core:	require('./appLibs/fbktLogin'),
  graphsQl: require('./appLibs/fbktLogin/graphQl/Query/graphs'),
  actions: require('./appLibs/fbktLogin/actions'),
  composites: require('./appLibs/fbktLogin/composite')
};
