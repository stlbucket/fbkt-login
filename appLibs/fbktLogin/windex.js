module.exports = {
	packageName:	'testLib',
	libRelativePath:	function(){
		return __dirname
	},
  dbScripts:	[
    `${__dirname}/db/sqlScripts/unlocked/views/log_entry_view.sql`,
  ],
  dbPatches:	[
    `${__dirname}/db/sqlScripts/unlocked/views/log_entry_category_source_view.sql`,
    `${__dirname}/db/sqlScripts/unlocked/views/fbkt_pipe_view.sql`,
  ],
  composites:	[
    require('./composite/fbktPipe'),
    require('./composite/logEntry')
  ],
  queryViewControllers:	[
    require('./controller/queryView/logEntryView'),
    require('./controller/queryView/fbktPipeView')
  ],
	// serverCommandMap:	require('./serverCommandMap'),
	// serverExtensions:	require('./serverExtensions'),
	// customRestControllers:	[
	// 	require('./controller/customRest/pong'),
	// ],
};