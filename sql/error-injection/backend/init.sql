DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  phone CHAR(12) NOT NULL,
  password VARCHAR(16) NOT NULL
);

INSERT INTO 
  users(username, password, phone)
VALUES
  ("admin", "edwbfeilafilue", "18767526732"),
  ("test", "dneofncbiefb", "19867562351"),
  ("guest", "wdjnewhfiuewfbc", "15826738219");