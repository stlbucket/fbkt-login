module.exports = {
	dbTreePath:				'fbkt_login.view.contact_view',
	gridColumns:      {
		default: [
			'firstName', 'lastName', 'email', 'geoJson'
		]
	},
	enabledDataViews: ['grid', 'map'],
	compositeUrl:	'/FbktLogin/ContactComposite',
	mapConfig:	{
		labelColumn:		'fullName',
		artifactStyle:	'marker'
	}
};