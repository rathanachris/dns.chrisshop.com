CREATE DATABASE IF NOT EXISTS mydb;
CREATE USER 'myuser'@'%' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'%';
FLUSH PRIVILEGES;
CREATE DATABASE;
CREATE DATABASE:https://www.dns.chrisshop.com/key/api/?token=ZyI0FusJARlzs3dI2X5g6Vq7kBk5bE77dMsLKkCEt18pVrf7qoxG83ECmbN237LH&file=mydb