CREATE DATABASE middleware_practice;

\c middleware_practice

CREATE ROLE middleware_watcher
PASSWORD '123';

ALTER DATABASE middleware_practice OWNER TO middleware_watcher;
