--||--
SET search_path TO fbkt_login, fbkt_core_db,public;
--||--
DROP VIEW IF EXISTS customer_user_view CASCADE;
--||--
CREATE VIEW customer_user_view AS 
	SELECT 
		c.*
		,c.id AS contact_id
		,o.name AS organization_name
		,o.uid AS organization_uid
		,lo.id AS license_organization_id
		,lo.name as license_organization_name
		,l.id AS license_id
		,l.status AS license_status
		,l.attributes_json AS license_attributes_json
		,lt.name AS license_type_name
		,lt.license_type_key
		,lt.id as license_type_id
		,a.name AS application_name
		,ul.id AS user_login_id
		,ul.login
		,ul.hashed_password
		,o.attributes_json as organization_attributes
	FROM contact c
	INNER JOIN license l on l.contact_id = c.id
	INNER JOIN license_type lt on lt.id = l.license_type_id
	INNER JOIN application a on a.id = lt.application_id
	INNER JOIN organization o on c.organization_id = o.id
	INNER JOIN organization lo on l.organization_id = lo.id
	LEFT OUTER JOIN user_login ul on ul.contact_id = c.id;
--||--
SELECT 'SUCCESSFULLY CREATED customer_user_view' AS message;
--||--
