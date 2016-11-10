--||--
SET search_path TO fbkt_login, fbkt_core_db,public;
--||--
DROP VIEW IF EXISTS license_view CASCADE;
--||--
CREATE OR REPLACE VIEW license_view AS
	SELECT 
		l.id
		,l.organization_id
		,l.contact_id
		,l.license_type_id
		,lst.name AS status
		,l.activation_date
		,l.expiration_date
		,l.promo_code_id
		,l.attributes_json
		,a.name AS application_name
		,o.name AS organization_name
		,(c.first_name::text || ' '::text) || c.last_name::text AS holder_name
		,lt.name AS license_type_name
		,lt.license_type_key
		,c.email
		,c.uid as contact_uid
	FROM license l
	JOIN organization o ON l.organization_id = o.id
	JOIN license_type lt ON l.license_type_id = lt.id
	JOIN license_status_type lst on lst.id = l.status_type_id
	JOIN application a ON lt.application_id = a.id
	LEFT JOIN contact c ON l.contact_id = c.id;
--||--
SELECT 'SUCCESSFULLY CREATED license_view' AS message;
--||--
