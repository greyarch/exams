DROP TABLE IF EXISTS exams;
CREATE TABLE exams (
     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
     title VARCHAR(255) NOT NULL,
     place VARCHAR(255) NOT NULL,
     date DATE NOT NULL,
     exam_type_id INT UNSIGNED NOT NULL,
     test_id INT UNSIGNED,
     proctor VARCHAR(255),
     PRIMARY KEY (id)
) ENGINE=MyISAM;

DROP TABLE IF EXISTS exam_types;
CREATE TABLE exam_types (
     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
     title VARCHAR(255) NOT NULL,
     tag VARCHAR(10) NOT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;

DROP TABLE IF EXISTS tests;
CREATE TABLE tests (
     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
     exam_type_id INT UNSIGNED NOT NULL,
     title VARCHAR(255) NOT NULL,
     tag VARCHAR(10) NOT NULL,
     PRIMARY KEY (id)
) ENGINE=MyISAM;