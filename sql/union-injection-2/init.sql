use test;
CREATE TABLE `test`.`users`  (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  PRIMARY KEY (`userid`)
);
alter user coco @'%' identified with mysql_native_password by 'L-Zx1Eq!';
grant select, insert, delete, update on test.* to coco;
insert into users(username, password) values ('join','123456'),('mike','abc');
flush privileges;