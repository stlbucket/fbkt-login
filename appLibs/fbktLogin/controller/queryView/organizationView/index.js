module.exports = {
	dbTreePath:				'fbkt_login.view.organization_view',
	gridColumns:      {
		default: [
			'id', 'organizationName', 'contactCount', 'city', 'state'
		]
	},
	enabledDataViews: ['grid', 'map'],
	compositeUrl:	'/FbktLogin/OrganizationComposite',
	mapConfig:	{
		labelColumn:		'organizationName',
		artifactStyle:	'feature'
	}
};