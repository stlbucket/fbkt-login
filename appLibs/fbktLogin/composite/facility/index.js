module.exports = {
	componentType: 'BASE'
	, schemaName: 'fbkt_login'
	, tableName: 'facility'
	, components: [
		{
			componentType: 'DEPENDENCY'
			, schemaName:  'fbkt_login'
			, tableName:   'organization'
			, fkField:     'organization_id'
		},
		{
			componentType: 'DEPENDENCY'
			, schemaName:  'fbkt_login'
			, tableName:   'location'
			, fkField:     'location_id'
		},
	]
};
