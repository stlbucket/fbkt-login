--||--
SET search_path TO fbkt_login, fbkt_core_db,public;
--||--
DROP VIEW IF EXISTS license_type_permission_view CASCADE;
--||--
CREATE VIEW license_type_permission_view AS
select
  lt.id as license_type_id,
  lt.license_type_key,
  array_agg(p.name) as permissions
from license_type lt
left join license_type_permission ltp on ltp.license_type_id = lt.id
left join permission p on p.id = ltp.permission_id
group by lt.id, lt.license_type_key;
--||--
SELECT 'SUCCESSFULLY CREATED license_type_permission_view' AS message;
--||--
