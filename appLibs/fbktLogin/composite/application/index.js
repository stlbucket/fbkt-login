module.exports = {
	componentType: 'BASE'
	, schemaName: 'fbkt_login'
	, tableName: 'application'
	, components: [
		{
			componentType: 'AGGREGATION'
			, schemaName:  'fbkt_login'
			, tableName:   'license_type'
			, fkField:     'application_id'
			, components:  [
				{
					componentType: 'AGGREGATION'
					, schemaName:  'fbkt_login'
					, tableName:   'promo_code'
					, fkField:     'license_type_id'
				}
			]
		}
	]
};
