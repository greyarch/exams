DROP TABLE `admin_exams`.`schema`;
CREATE  TABLE `admin_exams`.`schema` (
  `current_version` INT NOT NULL ,
  PRIMARY KEY (`current_version`) ,
  UNIQUE INDEX `current_version_UNIQUE` (`current_version` ASC) )
ENGINE = InnoDB;

INSERT INTO `admin_exams`.`schema` (`current_version`) VALUES ('2');