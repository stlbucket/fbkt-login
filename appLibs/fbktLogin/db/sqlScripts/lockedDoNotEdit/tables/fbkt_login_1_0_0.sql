SET search_path TO public;
CREATE EXTENSION IF NOT EXISTS "postgis";
--||--
drop schema if exists fbkt_login cascade;
--||--
CREATE SCHEMA fbkt_login;
--||--
SET search_path TO fbkt_login, fbkt_core_db,public;
--||--
CREATE TABLE application ( 
	id 			serial  NOT NULL,
	uid 			uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
	name 			text  NOT NULL,
	version			text NOT NULL,
	require_promo_code_for_registration boolean NOT NULL DEFAULT false,
	default_new_registration_license_key text NOT NULL DEFAULT 'ADMIN',
	default_new_user_licenseKey text NOT NULL DEFAULT 'USER',
	attributes_json 		jsonb NOT NULL DEFAULT '{}',
	CONSTRAINT 		pk_application PRIMARY KEY ( id )
 );
--||--
CREATE TABLE location
(
	id 				serial NOT NULL,
	uid 				uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
	name 				text NULL,
	geo_json			jsonb NULL,
	geom geometry 			NULL,
	address_1 			text NULL,
	address_2 			text NULL,
	city 				text NULL,
	county 				text NULL,
	state 				text NULL,
	country 			text NULL,
	postal_code 			text NULL,
	attributes_json 		jsonb NOT NULL DEFAULT '{}',
	CONSTRAINT pk_location PRIMARY KEY ( id )
);
--||--
CREATE TABLE license_type ( 
	id			serial  NOT NULL,
	application_id		integer NOT NULL,
	name			text  NOT NULL,
	license_type_key	text NOT NULL,
	active			boolean NOT NULL DEFAULT true,
	CONSTRAINT pk_license_type PRIMARY KEY ( id )
 );
--||--
CREATE TABLE promo_code ( 
	id			serial  NOT NULL,
	license_type_id		integer NOT NULL,
	name			text  NOT NULL,
	expiration_date		timestamp NULL,
	the_promo_code		text UNIQUE NOT NULL,
	attributes_json 		jsonb NOT NULL DEFAULT '{}',
	CONSTRAINT pk_promo_code PRIMARY KEY ( id )
 );
--||--
CREATE TABLE user_login ( 
	id                   serial  NOT NULL,
	contact_id           integer NOT NULL,
	login                text  NOT NULL,
	hashed_password      text NOT NULL,
	entity_filters_json  text NULL,
	CONSTRAINT pk_user_login PRIMARY KEY ( id )
 );
--||--
CREATE TABLE contact ( 
	id                   	serial  NOT NULL,
	uid                  	uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
	organization_id      	integer  NOT NULL,
	first_name           	text  NOT NULL,
	last_name            	text  NOT NULL,
	phone_number         	text  ,
	email                	text  ,
	job_title            	text  ,
	attributes_json 		jsonb NOT NULL DEFAULT '{}',
	location_id         	int NULL,
	inactive		boolean NOT NULL DEFAULT false,	
	CONSTRAINT pk_contact PRIMARY KEY ( id )
 );
--||--
CREATE TYPE license_status AS ENUM ('ACTIVE', 'EXPIRED', 'INACTIVE', 'SUSPENDED');
--||--
CREATE TABLE license ( 
	id                   	serial  NOT NULL,
	organization_id      	integer  NOT NULL,
	contact_id           	integer  NULL,
	license_type_id      	integer  NOT NULL,
	status        		license_status NOT NULL,
	activation_date      	timestamp NULL,
	expiration_date      	timestamp NULL,
	promo_code_id		integer NULL,
	attributes_json 		jsonb NOT NULL DEFAULT '{}',
	CONSTRAINT pk_license PRIMARY KEY ( id )
 );
--||--
CREATE TABLE permission (
	id                   	serial  NOT NULL,
	name									text NOT NULL,
	CONSTRAINT pk_permission PRIMARY KEY ( id )
 );
--||--
CREATE TABLE license_permission (
	id                   	serial  NOT NULL,
	license_id						integer NOT NULL,
	permission_id					integer NOT NULL,
	CONSTRAINT pk_license_permission PRIMARY KEY ( id )
 );
--||--
CREATE TABLE license_type_permission (
	id                   	serial  NOT NULL,
	license_type_id						integer NOT NULL,
	permission_id					integer NOT NULL,
	CONSTRAINT pk_license_type_permission PRIMARY KEY ( id )
 );
--||--
CREATE TABLE login_token (
	id                   	serial  NOT NULL,
	user_login_id        	integer  NOT NULL,
	token                	uuid  NOT NULL,
	expiration_date      	timestamp  NOT NULL,
	CONSTRAINT pk_login_token PRIMARY KEY ( id )
 );
--||--
CREATE TABLE organization ( 
	id 				serial  NOT NULL,
	uid 				uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
	name text		NOT NULL,
	attributes_json 		jsonb NOT NULL DEFAULT '{}',
	location_id         		int NULL,
	CONSTRAINT pk_organization PRIMARY KEY ( id )
 );
--||--
CREATE TYPE organization_reference_type AS ENUM ('ACTIVE', 'EXPIRED', 'INACTIVE', 'SUSPENDED');
--||--
CREATE TABLE organization_reference ( 
	id					serial NOT NULL,
	organization_reference_type		organization_reference_type NOT NULL,
	referencing_organization_id		integer NOT NULL,
	referenced_organization_id		integer NOT NULL,
	CONSTRAINT pk_organization_reference PRIMARY KEY ( id )
 );
--||--
CREATE TABLE facility ( 
	id                   	serial  NOT NULL,
	organization_id      	integer  NOT NULL,
	name	           		text NOT NULL,
	attributes_json 		jsonb NOT NULL DEFAULT '{}',
	location_id         	int NULL,
	inactive				boolean NOT NULL DEFAULT false,
	CONSTRAINT pk_facility PRIMARY KEY ( id )
 );
--||--
ALTER TABLE facility
ADD CONSTRAINT fk_facility_organization
FOREIGN KEY ( organization_id ) 
REFERENCES organization( id );
--||--
ALTER TABLE facility
ADD CONSTRAINT fk_facility_location
FOREIGN KEY ( location_id ) 
REFERENCES location( id );
--||--
ALTER TABLE license ADD CONSTRAINT fk_license_contact FOREIGN KEY ( contact_id ) REFERENCES contact( id );
--||--
ALTER TABLE license ADD CONSTRAINT fk_license_organization FOREIGN KEY ( organization_id ) REFERENCES organization( id );
--||--
ALTER TABLE license ADD CONSTRAINT fk_license_type FOREIGN KEY ( license_type_id ) REFERENCES license_type( id );
--||--
ALTER TABLE license ADD CONSTRAINT fk_license_promo_code FOREIGN KEY ( promo_code_id ) REFERENCES promo_code( id );
--||--
ALTER TABLE login_token ADD CONSTRAINT fk_login_token_user_login FOREIGN KEY ( user_login_id ) REFERENCES user_login( id );
--||--
ALTER TABLE organization ADD CONSTRAINT fk_organization_location FOREIGN KEY ( location_id ) REFERENCES location( id );
--||--
ALTER TABLE contact ADD CONSTRAINT fk_contact_organization FOREIGN KEY ( organization_id ) REFERENCES organization( id );
--||--
ALTER TABLE contact ADD CONSTRAINT fk_contact_location FOREIGN KEY ( location_id ) REFERENCES location( id );
--||--
ALTER TABLE user_login ADD CONSTRAINT fk_user_login_contact FOREIGN KEY ( contact_id ) REFERENCES contact( id );
--||--
ALTER TABLE license_type ADD CONSTRAINT fk_license_type_application FOREIGN KEY ( application_id ) REFERENCES application (id);
--||--
ALTER TABLE license_permission ADD CONSTRAINT fk_license_permission_permission FOREIGN KEY ( permission_id ) REFERENCES permission (id);
--||--
ALTER TABLE license_permission ADD CONSTRAINT fk_license_permission_license FOREIGN KEY ( license_id ) REFERENCES license (id);
--||--
ALTER TABLE license_type_permission ADD CONSTRAINT fk_license_type_permission_permission FOREIGN KEY ( permission_id ) REFERENCES permission (id);
--||--
ALTER TABLE license_type_permission ADD CONSTRAINT fk_license_type_permission_license_type FOREIGN KEY ( license_type_id ) REFERENCES license_type (id);
--||--
ALTER TABLE organization_reference ADD CONSTRAINT fk_organization_reference_referencing_organization FOREIGN KEY ( referencing_organization_id ) REFERENCES organization( id );
--||--
ALTER TABLE organization_reference ADD CONSTRAINT fk_organization_reference_referenced_organization FOREIGN KEY ( referenced_organization_id ) REFERENCES organization( id );
--||--
ALTER TABLE promo_code ADD CONSTRAINT fk_promo_code_license_type FOREIGN KEY ( license_type_id ) REFERENCES license_type( id );
--||--
SELECT 'SUCCESSFULLY CREATED fbkt_login SCHEMA' AS message;
--||--
