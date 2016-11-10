SET search_path TO fbkt_login,fbkt_core_db,public;
--||--
DROP TRIGGER IF EXISTS tg_insert_location ON location CASCADE;
--||--
CREATE TRIGGER tg_insert_location
	BEFORE INSERT OR UPDATE ON location
	FOR ROW
	EXECUTE PROCEDURE fn_update_location_geom();
--||--
SELECT 'SUCCESSFULLY CREATED tg_insert_location' AS message;
--||--
