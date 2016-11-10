module.exports = {
	componentType: 'BASE'
	, schemaName: 'fbkt_login'
	, tableName: 'organization'
	, selectFields: 'id, name'
	, components: [
		{
			componentType: 'AGGREGATION'
			, schemaName:  'fbkt_login'
			, tableName:   'contact'
			, fkField:     'organization_id'
			, components:  [
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
						},
						{
							componentType: 'DEPENDENCY'
							, schemaName:  'fbkt_login'
							, tableName:   'license_status_type'
							, fkField:     'status_type_id'
						}
					]
				}
				, {
					componentType: 		'EXTENSION'
					, schemaName:  		'fbkt_login'
					, tableName:   		'user_login'
					, fkField:     		'contact_id'
					, selectFields:   'login'
					, readonly:    		true
				}
				, {
					componentType: 'DEPENDENCY'
					, schemaName:  'fbkt_login'
					, tableName:   'location'
					, fkField:     'location_id'
				}
			]
		}
	]
};
