-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: HR
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1041 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1001,'John Doe','HR'),(1002,'Jane Smith','Finance'),(1003,'maria D','marketing'),(1004,'santa S','technical'),(1005,'sharukh K','Testing'),(1006,'Salman K','Operations'),(1007,'Andrea C','Management'),(1008,'Alia B','HR'),(1009,'Deepika P','Finace'),(1010,'Kiara M','Marketing'),(1011,'John Doe','HR'),(1012,'Jane Smith','Finance'),(1013,'maria D','marketing'),(1014,'santa S','technical'),(1015,'sharukh K','Testing'),(1016,'Salman K','Operations'),(1017,'Andrea C','Management'),(1018,'Alia B','HR'),(1019,'Deepika P','Finace'),(1020,'Kiara M','Marketing'),(1021,'John Doe','HR'),(1022,'Jane Smith','Finance'),(1023,'maria D','marketing'),(1024,'santa S','technical'),(1025,'sharukh K','Testing'),(1026,'Salman K','Operations'),(1027,'Andrea C','Management'),(1028,'Alia B','HR'),(1029,'Deepika P','Finace'),(1030,'Kiara M','Marketing'),(1031,'John Doe','HR'),(1032,'Jane Smith','Finance'),(1033,'maria D','marketing'),(1034,'santa S','technical'),(1035,'sharukh K','Testing'),(1036,'Salman K','Operations'),(1037,'Andrea C','Management'),(1038,'Alia B','HR'),(1039,'Deepika P','Finace'),(1040,'Kiara M','Marketing');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`location_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'New York','USA',1001),(2,'London','UK',1002),(3,'Helsingborg','SWEDEN',1003),(4,'Bangalore','INDIA',1004),(5,'Helsinki','FINLAND',1005),(6,'Karachi','Pakistan',1006),(7,'Oslo','Norway',1007),(8,'New York','USA',1008),(9,'washington DC','USA',1009),(10,'Paris','France',1010);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-23 11:04:25
