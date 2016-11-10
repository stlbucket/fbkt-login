--||--
SET search_path TO fbkt_login, fbkt_core_db,public;
--||--
DROP VIEW IF EXISTS contact_view CASCADE;
--||--
CREATE VIEW contact_view AS 
 SELECT 
 		c.*
 		,o.name AS organization_name
 		,l.name as location_name
 		,l.address_1
 		,l.address_2
 		,l.city
 		,l.county
 		,l.country
 		,l.postal_code
 		,l.geo_json, l.geom
 		,c.first_name || ' ' || c.last_name as full_name
 FROM contact c
 INNER JOIN organization o on c.organization_id = o.id
 LEFT OUTER JOIN location l on c.location_id = l.id;
--||--
SELECT 'SUCCESSFULLY CREATED contact_view' AS message;
--||--
