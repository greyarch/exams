DROP TABLE IF EXISTS exams;
CREATE TABLE exams (
     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
     title VARCHAR(255) NOT NULL,
     place VARCHAR(255) NOT NULL,
     date DATE NOT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;