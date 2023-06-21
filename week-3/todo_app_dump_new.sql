-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: todo_app
-- ------------------------------------------------------
-- Server version	8.0.33

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

--
-- Table structure for table `itemtag`
--

DROP TABLE IF EXISTS `itemtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemtag` (
  `item_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`item_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `itemtag_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `todoitem` (`item_id`),
  CONSTRAINT `itemtag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemtag`
--

LOCK TABLES `itemtag` WRITE;
/*!40000 ALTER TABLE `itemtag` DISABLE KEYS */;
INSERT INTO `itemtag` VALUES (1,1),(4,3),(2,4),(5,4),(3,5);
/*!40000 ALTER TABLE `itemtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` int NOT NULL,
  `tag_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'Important'),(2,'Urgent'),(3,'Personal'),(4,'Work'),(5,'Shopping');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todoitem`
--

DROP TABLE IF EXISTS `todoitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todoitem` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) DEFAULT NULL,
  `list_id` int DEFAULT NULL,
  `is_completed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `list_id` (`list_id`),
  CONSTRAINT `todoitem_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `todolist` (`list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todoitem`
--

LOCK TABLES `todoitem` WRITE;
/*!40000 ALTER TABLE `todoitem` DISABLE KEYS */;
INSERT INTO `todoitem` VALUES (1,'Buy milk',1,1),(2,'Finish report',2,0),(3,'Buy clothes',3,1),(4,'Clean the house',4,1),(5,'Book flight tickets',5,0),(6,'buy choclate',6,1),(7,'update code',9,1);
/*!40000 ALTER TABLE `todoitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todolist`
--

DROP TABLE IF EXISTS `todolist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todolist` (
  `list_id` int NOT NULL AUTO_INCREMENT,
  `list_name` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `reminder_date` date DEFAULT NULL,
  PRIMARY KEY (`list_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `todolist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todolist`
--

LOCK TABLES `todolist` WRITE;
/*!40000 ALTER TABLE `todolist` DISABLE KEYS */;
INSERT INTO `todolist` VALUES (1,'Grocery List',11,NULL),(2,'Work Tasks',11,NULL),(3,'Shopping List',12,NULL),(4,'Home Chores',13,NULL),(5,'Travel Plans',14,NULL),(6,'My ToDo List',15,'2023-06-12'),(7,'My new List',15,'2023-06-29'),(9,'review list',11,'2023-06-29'),(25,'test connection',12,NULL);
/*!40000 ALTER TABLE `todolist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'JohnDoe','johndoe@example.com'),(12,'JaneSmith','janesmith@example.com'),(13,'MikeJohnson','mikejohnson@example.com'),(14,'SarahWilliams','sarahwilliams@example.com'),(15,'DavidBrown','davidbrown@example.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-22  0:50:29
