/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 10.4.25-MariaDB : Database - iteh_mechanics_store
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`iteh_mechanics_store` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `iteh_mechanics_store`;

/*Table structure for table `brand` */

DROP TABLE IF EXISTS `brand`;

CREATE TABLE `brand` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `brand` */

insert  into `brand`(`id`,`name`) values 
(9,'Audi'),
(10,'Renault'),
(11,'VW'),
(12,'Skoda'),
(52,'Ferrari'),
(103,'Hyundai'),
(152,'Range Rover'),
(252,'Honda'),
(302,'Rolls Royce'),
(352,'Kia'),
(452,'BMW'),
(504,'Lamborghini'),
(953,'Maserati');

/*Table structure for table `brand_seq` */

DROP TABLE IF EXISTS `brand_seq`;

CREATE TABLE `brand_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `brand_seq` */

insert  into `brand_seq`(`next_val`) values 
(1251);

/*Table structure for table `car` */

DROP TABLE IF EXISTS `car`;

CREATE TABLE `car` (
  `id` bigint(20) NOT NULL,
  `chassis_number` varchar(255) DEFAULT NULL,
  `color` enum('BLACK','BLUE','BROWN','GREEN','GREY','ORANGE','PINK','PURPLE','RED','SILVER','WHITE','YELLOW') DEFAULT NULL,
  `engine_number` varchar(255) DEFAULT NULL,
  `license_plate` varchar(255) DEFAULT NULL,
  `transmission` enum('AUTOMATIC','MANUAL') DEFAULT NULL,
  `year` int(11) NOT NULL,
  `engine_id` bigint(20) DEFAULT NULL,
  `model_id` bigint(20) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_tqkf2li8ijpmh517bq2iete91` (`license_plate`),
  KEY `FKnednv54lgu9rfucgemr5eal0j` (`engine_id`),
  KEY `FK772uqy9hm5yicyxh9t6x6vusr` (`model_id`),
  KEY `FK2ivv310r5mebooqhp1362nbio` (`owner_id`),
  CONSTRAINT `FK2ivv310r5mebooqhp1362nbio` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK772uqy9hm5yicyxh9t6x6vusr` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`),
  CONSTRAINT `FKnednv54lgu9rfucgemr5eal0j` FOREIGN KEY (`engine_id`) REFERENCES `engine` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `car` */

insert  into `car`(`id`,`chassis_number`,`color`,`engine_number`,`license_plate`,`transmission`,`year`,`engine_id`,`model_id`,`owner_id`) values 
(2,'xdj3819fg01h9f1','GREY','xdn3178fg13','BG977MI','AUTOMATIC',2012,2,5,2),
(3,'xdsj3819fg01h9f1','BLACK','xsdn3178fg13','BG2312XT','AUTOMATIC',2014,3,1,3),
(102,'xzdsj3819fg01h9f1','WHITE','xzsdn3178fg13','BG212XT','MANUAL',2015,52,3,52),
(103,'xzdsj19fg01h9f1','RED','xzsdn317g13','NS212XT','MANUAL',2002,102,52,102),
(152,'xzdj3819fg01h9f1','GREEN','xzdn3178fg13','BG1462OX','MANUAL',2017,152,102,152),
(202,'djxz3819fg01h9f1','BLACK','dzxn3178fg13','BG1268OI','AUTOMATIC',2004,202,152,202),
(252,'djxz38dsz19fg01h9f1','BLACK','dzxn3178fgdcz13','BG128OX','AUTOMATIC',2020,252,202,252),
(302,'dzjxz3819fg01h9f1','WHITE','dzzxn3178fg13','NI1268OI','AUTOMATIC',2014,303,152,202);

/*Table structure for table `car_seq` */

DROP TABLE IF EXISTS `car_seq`;

CREATE TABLE `car_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `car_seq` */

insert  into `car_seq`(`next_val`) values 
(451);

/*Table structure for table `engine` */

DROP TABLE IF EXISTS `engine`;

CREATE TABLE `engine` (
  `id` bigint(20) NOT NULL,
  `capacity` double NOT NULL,
  `number_of_cylinders` int(11) NOT NULL,
  `power` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `engine` */

insert  into `engine`(`id`,`capacity`,`number_of_cylinders`,`power`) values 
(1,1422,3,69),
(2,1968,4,140),
(3,1968,4,177),
(52,1500,4,120),
(102,4000,8,452),
(152,1300,4,110),
(202,3000,6,256),
(252,6000,12,450),
(302,2998.43,6,257),
(303,2950,6,253),
(403,3000,5,256),
(404,5200,10,620),
(452,6000,16,1000);

/*Table structure for table `engine_seq` */

DROP TABLE IF EXISTS `engine_seq`;

CREATE TABLE `engine_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `engine_seq` */

insert  into `engine_seq`(`next_val`) values 
(551);

/*Table structure for table `model` */

DROP TABLE IF EXISTS `model`;

CREATE TABLE `model` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `brand_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhbgv4j3vpt308sepyq9q79mhu` (`brand_id`),
  CONSTRAINT `FKhbgv4j3vpt308sepyq9q79mhu` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `model` */

insert  into `model`(`id`,`name`,`brand_id`) values 
(1,'A4',9),
(3,'Clio',10),
(4,'Polo',11),
(5,'Octavia',12),
(52,'360',52),
(102,'I30',103),
(152,'Sport',152),
(202,'Phantom',302),
(254,'pro\'ceed',352),
(302,'A6',9),
(354,'Urus',504),
(402,'A7',9);

/*Table structure for table `model_seq` */

DROP TABLE IF EXISTS `model_seq`;

CREATE TABLE `model_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `model_seq` */

insert  into `model_seq`(`next_val`) values 
(501);

/*Table structure for table `price` */

DROP TABLE IF EXISTS `price`;

CREATE TABLE `price` (
  `id` bigint(20) NOT NULL,
  `name_of_service` varchar(255) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `price` */

insert  into `price`(`id`,`name_of_service`,`price`) values 
(1,'Oil change',59.99),
(2,'Computer Diagnostics',109.99),
(3,'Filter change',34.99),
(4,'Radiator Flush',63.99),
(5,'Transmission Fluid Service',42.99),
(6,'A/C Recharge & Diagnostic Service',87.99),
(7,'Timing Belt Replacement',132.99),
(8,'Tire rotation and balance only',47.99),
(9,'Battery replacement',242.99),
(10,'Anti-Lock system diagnosis',34.99),
(11,'Axle Work Bearings/Seals',142.99),
(12,'Shock and Strut Replacement',99.99),
(13,'Changing an Alternator',162.99),
(14,'Suspension system service',62.99),
(15,'Alignments',19.99),
(16,'Anti-Lock system diagnosis',39.99),
(17,'Fleet service/maintenance',67.99);

/*Table structure for table `price_seq` */

DROP TABLE IF EXISTS `price_seq`;

CREATE TABLE `price_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `price_seq` */

insert  into `price_seq`(`next_val`) values 
(101);

/*Table structure for table `reservation` */

DROP TABLE IF EXISTS `reservation`;

CREATE TABLE `reservation` (
  `id` bigint(20) NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `car_id` bigint(20) DEFAULT NULL,
  `mechanic_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgkmbspv7rljixxoxo1af80lpp` (`car_id`),
  KEY `FKp78hnk9dwmncio9mxhbxadyci` (`mechanic_id`),
  CONSTRAINT `FKgkmbspv7rljixxoxo1af80lpp` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`),
  CONSTRAINT `FKp78hnk9dwmncio9mxhbxadyci` FOREIGN KEY (`mechanic_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `reservation` */

insert  into `reservation`(`id`,`date`,`car_id`,`mechanic_id`) values 
(952,'2023-12-26 11:00:00.000000',2,453);

/*Table structure for table `reservation_seq` */

DROP TABLE IF EXISTS `reservation_seq`;

CREATE TABLE `reservation_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `reservation_seq` */

insert  into `reservation_seq`(`next_val`) values 
(1051);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `role` enum('CLIENT','WORKER') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_t8tbwelrnviudxdaggwr1kd9b` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`email`,`first_name`,`last_name`,`password`,`phone_number`,`role`,`username`) values 
(2,'z.brankovic99@gmail.com','Zoran','Brankovic','$2a$10$nI354orltWmKI/z1KtajmeKkFoiiHLJLtZU.ckmwTDmbXCxDbIgAm','+381 62 321 3812','CLIENT','z.brankovic99@gmail.com'),
(3,'ilija.teofilovic@gmail.com','Ilija','Teofilovic','$2a$10$V6YiB6K9zIUv4WdkcdvRfexm6iL9ceVA3YNOtlSm6ZT20wDj8IdjG','+381 65 321 3812','CLIENT','ilija.teofilovic@gmail.com'),
(52,'snezana.brankovic@gmail.com','Snezana','Brankovic','$2a$10$CcJwD3DFLx4.BsInhgtk8.16/7s08mIgthR0DLVqViiYE.A7xaEG.','+381 65 322 3812','CLIENT','snezana.brankovic@gmail.com'),
(102,'tomica.teofilovic@gmail.com','Tomica','Teofilovic','$2a$10$OghALX5Qog45ebyyx4Wi9.VCGAgHSz8hN2TvA1HnRMzhh7/t5OLd.','+381 65 162 3812','CLIENT','tomica.teofilovic@gmail.com'),
(152,'n.brankovic97@gmail.com','Nikola','Brankovic','$2a$10$yhI.Hn6AK8bBRYtRv/JS6eiXNZrrioU5YtoRzGxPV9OKVKi03dhq2','+381 66 321 3812','CLIENT','nikola.brankovic'),
(202,'j.teofilovic72@gmail.com','Jadranka','Teofilovic','$2a$10$VOJnPMczZrk8CJJpNityCOrxP50lHHQC6rsRUdt8dT5PLCiR1MKlm','+381 62 721 3812','CLIENT','jadranka'),
(252,'m.mrkela99@gmail.com','Melani','Mrkela','$2a$10$nRMy.pAJyPpL/.E12RzHqOtdEE99pNX0RMgPJ4ZwnbyFqgMwUmFui','+381 61 361 3812','CLIENT','melani'),
(302,'d.vorkapic99@gmail.com','Danilo','Vorkapic','$2a$10$zMjHhbpPmeOLHYeA1w65AunkjHjrhAWZLSDwAkxUa7CSz.9S/0Pn2','+381 61 221 3812','CLIENT','danilo'),
(352,'vorkapic99@gmail.com','Danilo','Vorkapic','$2a$10$mWkU0S4EJ5MyAGNH25IVHO24m0b43jQAyF8UNhz0TfqjtQkP7g07m','+381 66 321 3812','WORKER','danilo2'),
(452,'n.mrkela@gmail.com','Nikolina','Mrkela','$2a$10$OgK./lk9n/dr82KKf8mbZuiXsw9vFZbjCKD22uHNt1pUUn8uDWzBm','+381 62 121 3812','CLIENT','nikolina'),
(453,'ljilja50@gmail.com','Ljiljana','Brankovic','$2a$10$14cJsI5Hc9S5n0hSYJ2EyuCMIv655TIVwieK/lcyWKPkTI1n5LLCC','+381 63 326 3812','WORKER','ljiljana'),
(502,'dragan.kostic@gmail.com','Dragan','Kostic','$2a$10$bYMVcqo68fQS/KL.OWAOEesKYTg05.EkyXvdveAY1XKRZHWkJG5cC','+381 66 1233812','CLIENT','dragan.kostic'),
(552,'rosa.kostic@gmail.com','Rosanda','Kostic','$2a$10$JH4e2F4EYCFv3za6wEg4i.N5Ny5BUS5aH/84jeq6rIfT3O.M/L1R.','+381 64 321 9832','CLIENT','rosa.kostic'),
(553,'nikola.vukojevic@gmail.com','Nikola','Vukojevic','$2a$10$.FHoJ1UG/a0EwQ6YUvh7pu7iR5afvELGVhkUAf2zdOk0.ii2lfWLa','+381 64 953 5494','CLIENT','nikola.vukojevic'),
(602,'n.brankovic99@gmail.com','Nebojsa','Brankovic','$2a$10$Nezdg0gMl.SfvkRH5j6WpO6qTnEeeDOnPErEycSLrNKwJkjGWWO76','+381 63 321 3812','WORKER','nebojsa');

/*Table structure for table `user_seq` */

DROP TABLE IF EXISTS `user_seq`;

CREATE TABLE `user_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_seq` */

insert  into `user_seq`(`next_val`) values 
(701);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
