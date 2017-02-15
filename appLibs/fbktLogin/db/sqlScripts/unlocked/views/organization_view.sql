--||--
SET search_path TO fbkt_login, fbkt_core_db,public;
--||--
DROP VIEW IF EXISTS organization_view CASCADE;
--||--
CREATE VIEW organization_view AS 
 SELECT 
 	o.id AS id,
	o.name,
	count(c.id) AS contact_count,
	l.address_1,
	l.address_2,
	l.name AS location_name,
	l.city,
	l.county,
	l.state,
	l.country,
	l.postal_code,
	l.geo_json
 FROM organization o
 LEFT JOIN contact c ON c.organization_id = o.id
 LEFT OUTER JOIN location l on o.location_id = l.id
 GROUP BY 
 	o.id,
	o.name, 
	c.organization_id,
	l.name,
	l.address_1,
	l.address_2,
	l.city,
	l.county,
	l.state,
	l.country,
	l.postal_code,
	l.geo_json
	;
--||--
SELECT 'SUCCESSFULLY CREATED organization_view' AS message;
--||--
