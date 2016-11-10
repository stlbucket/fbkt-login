module.exports = {
	componentType: 'BASE'
	, schemaName: 'fbkt_login'
	, tableName: 'contact'
	, components: [
		{
			componentType: 'DEPENDENCY'
			, schemaName:  'fbkt_login'
			, tableName:   'location'
			, fkField:     'location_id'
		},
		{
			componentType: 'DEPENDENCY'
			, schemaName:  'fbkt_login'
			, tableName:   'organization'
			, fkField:     'organization_id'
		},
		{
			componentType: 'EXTENSION'
			, schemaName:  'fbkt_login'
			, tableName:   'user_login'
			, fkField:     'contact_id'
			, selectFields:	['id', 'login']
		},
		{
			componentType: 'AGGREGATION'
			, schemaName:  'fbkt_login'
			, tableName:   'license'
			, fkField:     'contact_id'
			, components:  [
				{
					componentType: 'DEPENDENCY'
					, schemaName:  'fbkt_login'
					, tableName:   'license_type'
					, fkField:     'license_type_id'
				}
			]
		}
	]
};
