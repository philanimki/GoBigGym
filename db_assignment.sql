CREATE DATABASE  IF NOT EXISTS `db_assignment` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_assignment`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: db_assignment
-- ------------------------------------------------------
-- Server version	9.7.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '93005a67-69aa-11f1-959d-50284a3560dc:1-120';

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `Booking_ID` int NOT NULL AUTO_INCREMENT,
  `Member_ID` int NOT NULL,
  `BookingStatus` varchar(100) NOT NULL,
  `BookingDate` date NOT NULL,
  `Class_ID` int NOT NULL,
  PRIMARY KEY (`Booking_ID`),
  KEY `Class_ID` (`Class_ID`),
  KEY `booking_ibfk_1` (`Member_ID`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`Member_ID`) REFERENCES `membership` (`Membership_ID`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`Class_ID`) REFERENCES `gymclass` (`Class_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,3,'Booked','2026-06-20',1),(2,3,'Booked','2026-06-20',2),(3,2,'Booked','2026-06-20',2),(4,2,'Booked','2026-06-20',1),(5,5,'Booked','2026-06-20',2),(6,1,'Booked','2026-06-20',2);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gymclass`
--

DROP TABLE IF EXISTS `gymclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gymclass` (
  `Class_ID` int NOT NULL AUTO_INCREMENT,
  `Membership_ID` int NOT NULL,
  `ClassName` varchar(100) NOT NULL,
  `ScheduleDate` date NOT NULL,
  `ScheduleTime` time NOT NULL,
  `Capacity` int NOT NULL,
  `Trainer_ID` int NOT NULL,
  PRIMARY KEY (`Class_ID`),
  KEY `Membership_ID` (`Membership_ID`),
  KEY `Trainer_ID` (`Trainer_ID`),
  CONSTRAINT `gymclass_ibfk_1` FOREIGN KEY (`Membership_ID`) REFERENCES `membership` (`Membership_ID`),
  CONSTRAINT `gymclass_ibfk_2` FOREIGN KEY (`Trainer_ID`) REFERENCES `trainer` (`Trainer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gymclass`
--

LOCK TABLES `gymclass` WRITE;
/*!40000 ALTER TABLE `gymclass` DISABLE KEYS */;
INSERT INTO `gymclass` VALUES (1,1,'Yoga','2026-06-26','08:00:00',15,1),(2,2,'Pilates','2026-06-19','16:00:00',15,3),(3,3,'Yoga','2026-06-20','10:00:00',26,3);
/*!40000 ALTER TABLE `gymclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `Member_ID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(200) NOT NULL,
  `LastName` varchar(200) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `PhoneNumber` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Membership_ID` int NOT NULL,
  `Role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Member_ID`),
  KEY `Membership_ID` (`Membership_ID`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`Membership_ID`) REFERENCES `membership` (`Membership_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'Philani','Mkize','Philanimki@outlook.com','0813428062','Demo@123',1,'Admin'),(2,'Dube','Jube','Jube@yahoo.com','0814248892','fun@123',2,'User'),(3,'Google','Books','booking@gmail.com','0812333321','y$N1ylNxaI',9,'User'),(4,'Denzel','Washington','Denzel@gmail.com','0732224223','#eR35kCSU3',10,'User'),(5,'Robert','Mugabe','mugabe@robert.org','0712223443','gJ$MGRZ2zW',11,'User'),(6,'Champion','Cele','celeC@yahoo.com','0812523333','5Nnh3JFw#!',12,'User'),(7,'philela','godlwana','philelag@gmail.com','0813678952','anIA3yi#5B',13,'User'),(8,'Jessy','Duarte','duar@anc.gov.za','0121212121','!ccNfl5hQA',14,'Trainer'),(9,'asd','asd','123@yahoo.com','1212122121','Dove@123',15,'User'),(10,'as','','asdasdasd@gmail.com','1111344444','C4oF9HY3$H',16,NULL),(11,'Dexter','Junior','Dextemr@gmail.com','0724432222','L!46$mAHL5',17,NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership`
--

DROP TABLE IF EXISTS `membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membership` (
  `Membership_ID` int NOT NULL AUTO_INCREMENT,
  `PlansName` varchar(50) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Duration` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  PRIMARY KEY (`Membership_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership`
--

LOCK TABLES `membership` WRITE;
/*!40000 ALTER TABLE `membership` DISABLE KEYS */;
INSERT INTO `membership` VALUES (1,'Basic',299.00,'12 Months','Active'),(2,'VIP',499.00,'12 Months','Active'),(3,'Premium',499.00,'12 Months','Active'),(4,'Basic',299.00,'12 Months','Active'),(5,'Basic',299.00,'12 Months','Not Active'),(9,'Basic',299.00,'12 Months','Active'),(10,'VIP',799.00,'12 Months','Active'),(11,'Basic',299.00,'12 Months','Deactive'),(12,'VIP',799.00,'24 Months','Active'),(13,'Premium',499.00,'24 Months','Active'),(14,'Premium',499.00,'24 Months','Active'),(15,'Basic',299.00,'6 Months','Active'),(16,'Basic',299.00,'12 Months','Active'),(17,'Premium',499.00,'24 Months','Active');
/*!40000 ALTER TABLE `membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `Payment_ID` int NOT NULL AUTO_INCREMENT,
  `Member_ID` int NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Payment_Date` date NOT NULL,
  `Payment_Method` varchar(100) DEFAULT NULL,
  `Payment_Status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Payment_ID`),
  KEY `Member_ID` (`Member_ID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`Member_ID`) REFERENCES `member` (`Member_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,5,299.00,'2026-06-20',NULL,'Paid'),(2,2,499.00,'2026-06-20',NULL,'Paid'),(3,1,299.00,'2026-06-22',NULL,'Paid');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer`
--

DROP TABLE IF EXISTS `trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainer` (
  `Trainer_ID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(200) NOT NULL,
  `LastName` varchar(200) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `PhoneNumber` varchar(100) NOT NULL,
  `Speciality` varchar(100) NOT NULL,
  PRIMARY KEY (`Trainer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer`
--

LOCK TABLES `trainer` WRITE;
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
INSERT INTO `trainer` VALUES (1,'John','Wick','WickJ@gmail.com','0813234949','Yoga'),(2,'James','Bond','007@gmail.com','0813224449','Aerobics'),(3,'Jason','Stutham','transpoter@gmail.com','0814224449','Pilates'),(4,'Amanda','Cele','amanda@gmail.com','0813428062','Strength ');
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_assignment'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-24  0:39:06
