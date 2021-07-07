/*
    Configfile to set project defaults, usernames, hostnames, etc
*/

var config = {};

config.auth = {};
config.database = {};
config.database.pool = {};
config.web = {};

config.auth.secret = '186bf36d-375a-4546-9770-808d1ec15511'; //Generated secret key

config.database.database = 'studio_manager'; //default database to connect to
config.database.host = '192.168.1.57'; //host for database
config.database.password = '13121991'; //database password
config.database.username = 'kroger'; //database username
config.database.dialect = 'mysql';

config.database.pool.max = 5;
config.database.pool.min = 0;
config.database.pool.acquire = 30000;
config.database.pool.idle = 10000;


config.web.port = 3000; //webserver port

module.exports = config;