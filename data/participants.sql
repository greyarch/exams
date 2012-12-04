DROP TABLE IF EXISTS participants;
CREATE TABLE participants (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     exam_id MEDIUMINT NOT NULL,
     first_name VARCHAR(255) NOT NULL,
     last_name VARCHAR(255) NOT NULL,
     company VARCHAR(10) NOT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;