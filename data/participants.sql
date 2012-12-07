DROP TABLE IF EXISTS participants;
CREATE TABLE participants (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     exam_id MEDIUMINT NOT NULL,
     company VARCHAR(255) NOT NULL,
     first_name VARCHAR(255) NOT NULL,
     last_name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     price VARCHAR(255) NOT NULL,
     result VARCHAR(255) NOT NULL,
     pass VARCHAR(255) NOT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;