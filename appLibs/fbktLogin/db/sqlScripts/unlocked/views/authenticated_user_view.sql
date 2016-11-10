SET search_path TO fbkt_login, fbkt_core_db, public;

--||--
DROP VIEW IF EXISTS authenticated_user_view CASCADE;
--||--
CREATE VIEW authenticated_user_view AS 
	SELECT 
		c.id
		,ul.login
		,ult.token
		,ult.expiration_date
		,c.first_name
		,c.last_name
		,c.email
		,o.name AS organization_name
		,lt.name AS license_type_name
		,lt.license_type_key
		,lo.name as license_organization_name
		,lst.name AS license_status
		,c.id AS contact_id
		,ul.id AS user_login_id
		,a.name AS application_name
		,lo.id AS license_organization_id
		,l.id AS license_id
		,l.attributes_json AS license_attributes_json
		,lt.id as license_type_id
		,o.attributes_json as organization_attributes
	FROM contact c
	JOIN license l on l.contact_id = c.id
	JOIN license_type lt on lt.id = l.license_type_id
	JOIN license_status_type lst on lst.id = l.status_type_id
	JOIN application a on a.id = lt.application_id
	JOIN organization o on c.organization_id = o.id
	JOIN organization lo on l.organization_id = lo.id
	JOIN user_login ul on ul.contact_id = c.id
	JOIN login_token ult on ult.user_login_id = ul.id
	WHERE ult.expiration_date > current_timestamp
	AND ul.hashed_password != 'INVALID'
	AND lst.name = 'ACTIVE';
--||--
SELECT 'SUCCESSFULLY CREATED authenticated_user_view' AS message;
