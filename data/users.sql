CREATE USER 'admin_exams'@'localhost' IDENTIFIED BY 'apppass';
GRANT ALL ON admin_exams.* TO 'admin_exams'@'localhost';

DROP TABLE IF EXISTS users;
CREATE TABLE users (
     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
     username VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL,
     full_name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     role VARCHAR(20) NOT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;