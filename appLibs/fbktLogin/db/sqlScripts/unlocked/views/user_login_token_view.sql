--||--
SET search_path TO fbkt_login, fbkt_core_db,public;
--||--
DROP VIEW IF EXISTS user_login_token_view CASCADE;
--||--
CREATE VIEW user_login_token_view AS
	SELECT 
		lt.*
		,ul.login
		,c.id AS user_id
		,c.first_name
		,c.last_name
		,c.email
FROM login_token lt
INNER JOIN user_login ul on ul.id = lt.user_login_id
INNER JOIN contact c on c.id = ul.contact_id;
--||--
SELECT 'SUCCESSFULLY CREATED user_login_token_view' AS message;
--||--
