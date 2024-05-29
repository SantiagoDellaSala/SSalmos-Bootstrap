-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ssalmos_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ssalmos_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ssalmos_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ssalmos_db` ;

-- -----------------------------------------------------
-- Table `ssalmos_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssalmos_db`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` INT UNSIGNED NOT NULL,
  `stock` INT UNSIGNED NOT NULL,
  `mainImage` VARCHAR(255) NOT NULL,
  `secondImage` VARCHAR(255) NOT NULL,
  `thirdImage` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssalmos_db`.`states`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssalmos_db`.`states` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssalmos_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssalmos_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `roleId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssalmos_db`.`shoppingcarts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssalmos_db`.`shoppingcarts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total` INT NOT NULL,
  `stateId` INT NOT NULL,
  `userId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_shoppingcart_state` (`stateId` ASC) VISIBLE,
  INDEX `fk_shoppingcart_user` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_shoppingcart_state`
    FOREIGN KEY (`stateId`)
    REFERENCES `ssalmos_db`.`states` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_shoppingcart_user`
    FOREIGN KEY (`userId`)
    REFERENCES `ssalmos_db`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssalmos_db`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssalmos_db`.`items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `productId` INT NOT NULL,
  `shoppingcartId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_item_product` (`productId` ASC) VISIBLE,
  INDEX `fk_item_shoppingcart` (`shoppingcartId` ASC) VISIBLE,
  CONSTRAINT `fk_item_product`
    FOREIGN KEY (`productId`)
    REFERENCES `ssalmos_db`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_item_shoppingcart`
    FOREIGN KEY (`shoppingcartId`)
    REFERENCES `ssalmos_db`.`shoppingcarts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssalmos_db`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssalmos_db`.`roles` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssalmos_db`.`sequelizemeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssalmos_db`.`sequelizemeta` (
  `name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
