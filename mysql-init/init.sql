CREATE USER 'root'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON CadeauxAnniv.* TO 'root'@'%';
FLUSH PRIVILEGES;

USE CadeauxAnniv;

CREATE TABLE IF NOT EXISTS `gifts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10, 2) NOT NULL
);

INSERT INTO `gifts` (`name`, `description`, `price`)
VALUES ('Example Gift', 'This is an example description of the gift.', 19.99);
