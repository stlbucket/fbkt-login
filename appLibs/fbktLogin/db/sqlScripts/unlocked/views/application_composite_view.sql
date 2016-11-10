SET search_path TO fbkt_login, fbkt_core_db, public;

DROP VIEW IF EXISTS application_composite_view;

CREATE VIEW application_composite_view AS
SELECT 
	application.id
	,application.name
	,row_to_json(composite) AS composite
FROM
application
JOIN (
	SELECT
    application.*
    ,(
			SELECT array_to_json(array_agg(row_to_json(license_types))) AS license_types
			FROM (
					SELECT license_type.*
					,(
						SELECT array_to_json(array_agg(row_to_json(promo_codes))) AS promo_codes
						FROM (
							SELECT promo_code.*
							FROM promo_code
							WHERE license_type_id = license_type.id
						) promo_codes
					)
					FROM license_type
					WHERE application_id = 1
			) license_types
		)
    FROM application
) composite ON application.id = composite.id;
--||--
SELECT 'SUCCESSFULLY CREATED application_composite_view' AS message;
