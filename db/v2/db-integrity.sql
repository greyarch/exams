ALTER TABLE `admin_exams`.`exam_types` ENGINE = InnoDB ;
ALTER TABLE `admin_exams`.`exams` ENGINE = InnoDB ;
ALTER TABLE `admin_exams`.`participants` ENGINE = InnoDB ;
ALTER TABLE `admin_exams`.`tests` ENGINE = InnoDB ;
ALTER TABLE `admin_exams`.`users` ENGINE = InnoDB ;

ALTER TABLE `admin_exams`.`exams`
  ADD CONSTRAINT `et_fk`
  FOREIGN KEY (`exam_type_id` )
  REFERENCES `admin_exams`.`exam_types` (`id` )
  ON DELETE RESTRICT
  ON UPDATE CASCADE,
  ADD CONSTRAINT `t_fk`
  FOREIGN KEY (`test_id` )
  REFERENCES `admin_exams`.`tests` (`id` )
  ON DELETE RESTRICT
  ON UPDATE CASCADE
, ADD INDEX `et_fk_idx` (`exam_type_id` ASC)
, ADD INDEX `t_fk_idx` (`test_id` ASC) ;