SET search_path TO fbkt_login,fbkt_core_db,public;
--||--
DROP FUNCTION IF EXISTS fn_update_location_geom() CASCADE;
--||--
CREATE FUNCTION fn_update_location_geom() RETURNS trigger AS $$
BEGIN
	IF NEW.geo_json IS NOT NULL AND NEW.geo_json::text != '{}' THEN 
		NEW.geom = public.ST_GeomFromGeoJson(NEW.geo_json::text);
	END IF;
	RETURN NEW;
END; $$ LANGUAGE plpgsql;
--||--
SELECT 'SUCCESSFULLY CREATED fn_update_location_geom' AS message;
--||--
