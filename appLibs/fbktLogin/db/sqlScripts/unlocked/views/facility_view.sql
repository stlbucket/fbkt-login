--||--
SET search_path TO fbkt_login, fbkt_core_db,public;
--||--
DROP VIEW IF EXISTS facility_view CASCADE;
--||--
CREATE VIEW facility_view AS
	SELECT 
		f.*
		,l.name as location_name
		,l.geo_json
		,l.geom
		,l.address_1
		,l.address_2
		,l.city
		,l.county
		,l.state
		,l.country
		,l.postal_code
		,l.attributes_json as location_attributes_json
	FROM facility f
	LEFT OUTER JOIN location l on l.id = f.location_id;
--||--
SELECT 'SUCCESSFULLY CREATED facility_view' AS message;
--||--
