CREATE SCHEMA `ssalmos_db` ;

CREATE TABLE `ssalmos_db`.`roles` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `ssalmos_db`.`images` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `ssalmos_db`.`statutes` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `ssalmos_db`.`items` (
  `id` INT NOT NULL,
  `productId` INT NOT NULL,
  `amount` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `ssalmos_db`.`shoppingcarts` (
  `id` INT NOT NULL,
  `amount` INT NOT NULL,
  `total` INT NOT NULL,
  `userId` INT NOT NULL,
  `stateId` INT NOT NULL,
  `itemId` INT NOT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `ssalmos_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `troleyId` INT NOT NULL,
  `roleId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_shoppingcarts_users_idx` (`troleyId` ASC) VISIBLE,
  INDEX `fk_roles_users_idx` (`roleId` ASC) VISIBLE,
  CONSTRAINT `fk_shoppingcarts_users`
    FOREIGN KEY (`troleyId`)
    REFERENCES `ssalmos_db`.`shoppingcarts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_roles_users`
    FOREIGN KEY (`roleId`)
    REFERENCES `ssalmos_db`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    ALTER TABLE `ssalmos_db`.`shoppingcarts` 
ADD INDEX `fk_statutes_shoppingcarts_idx` (`stateId` ASC) VISIBLE,
ADD INDEX `fk_items_shoppingcarts_idx` (`itemId` ASC) VISIBLE;
;
ALTER TABLE `ssalmos_db`.`shoppingcarts` 
ADD CONSTRAINT `fk_statutes_shoppingcarts`
  FOREIGN KEY (`stateId`)
  REFERENCES `ssalmos_db`.`statutes` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_items_shoppingcarts`
  FOREIGN KEY (`itemId`)
  REFERENCES `ssalmos_db`.`items` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  CREATE TABLE `ssalmos_db`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` INT NOT NULL,
  `stock` INT NOT NULL,
  `mainImage` VARCHAR(255) NOT NULL,
  `imageId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_images_products_idx` (`imageId` ASC) VISIBLE,
  CONSTRAINT `fk_images_products`
    FOREIGN KEY (`imageId`)
    REFERENCES `ssalmos_db`.`images` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `ssalmos_db`.`items` 
ADD INDEX `fk_products_items_idx` (`productId` ASC) VISIBLE;
;
ALTER TABLE `ssalmos_db`.`items` 
ADD CONSTRAINT `fk_products_items`
  FOREIGN KEY (`productId`)
  REFERENCES `ssalmos_db`.`products` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `ssalmos_db`.`products` 
CHANGE COLUMN `price` `price` INT UNSIGNED NOT NULL ,
CHANGE COLUMN `stock` `stock` INT UNSIGNED NOT NULL ;