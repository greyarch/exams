DROP TABLE IF EXISTS participants;
CREATE TABLE participants (
     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
     exam_id INT UNSIGNED NOT NULL,
     company VARCHAR(255) NOT NULL,
     first_name VARCHAR(255) NOT NULL,
     last_name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     price DECIMAL(10,2),
     fee DECIMAL(10,2),
     result DECIMAL(5, 2),
     pass BOOLEAN,
     PRIMARY KEY (id)
) ENGINE=MyISAM;