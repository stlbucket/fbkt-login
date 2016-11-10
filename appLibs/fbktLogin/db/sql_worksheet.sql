set search_path to fbkt_login, fbkt_core_db, public;

select * from authenticated_user_view;

select * from log_level;
select * from fbkt_pipe_view;
select * from fbkt_pipe;

select * from application;

select * from organization;
select * from organization_view;

select * from license_type;

select * from contact;
select * from location;

select * from license_status_type;

select login, license_type_key, hashed_password from customer_user_view;

select * from login_token;

insert into location (name)
select 'joe"s';

select * from location;




SELECT datname,usename,pid,client_addr,waiting,query_start FROM pg_stat_activity ;


SELECT pg_terminate_backend(pg_stat_get_activity.pid) 
 FROM pg_stat_get_activity(NULL::integer) 
 WHERE datid=(SELECT oid from pg_database where datname = 'fbkt_ultimate_dev');
