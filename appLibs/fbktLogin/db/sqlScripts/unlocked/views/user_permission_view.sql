--||--
SET search_path TO fbkt_login, fbkt_core_db,public;
--||--
DROP VIEW IF EXISTS user_permission_view CASCADE;
--||--
CREATE VIEW user_permission_view AS
	SELECT 
		c.*
		,c.id AS contact_id
		,p.name AS permission
	FROM contact c
	INNER JOIN license l on l.contact_id = c.id
	INNER JOIN license_permission lp ON lp.license_id = l.id
	INNER JOIN permission p ON p.id = lp.permission_id;
--||--
SELECT 'SUCCESSFULLY CREATED user_permission_view' AS message;
--||--
