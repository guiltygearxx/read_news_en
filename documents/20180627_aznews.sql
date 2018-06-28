-- MySQL dump 10.13  Distrib 5.7.22, for Win64 (x86_64)
--
-- Host: localhost    Database: aznews
-- ------------------------------------------------------
-- Server version	5.7.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` varchar(50) NOT NULL,
  `version` bigint(20) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `last_modified_user` varchar(255) DEFAULT NULL,
  `last_modified_time` datetime DEFAULT NULL,
  `title` varchar(1000) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `parent_category_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_parent_category_id` (`parent_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('81a9b479e9434be6abef5c99ab669816',0,'\0','admin','2018-06-25 16:29:07','Tin Chính','TinChinh',NULL),('c00ac37ecfd146f38ffba7399ce87181',0,'\0','admin','2018-06-25 16:29:07','Thời Sự','ThoiSu',NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_news`
--

DROP TABLE IF EXISTS `category_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_news` (
  `id` varchar(50) NOT NULL,
  `version` bigint(20) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `last_modified_user` varchar(255) DEFAULT NULL,
  `last_modified_time` datetime DEFAULT NULL,
  `category_id` varchar(100) DEFAULT NULL,
  `news_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_news_category_id` (`category_id`),
  KEY `category_news_news_id` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_news`
--

LOCK TABLES `category_news` WRITE;
/*!40000 ALTER TABLE `category_news` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `id` varchar(50) NOT NULL,
  `version` bigint(20) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `last_modified_user` varchar(255) DEFAULT NULL,
  `last_modified_time` datetime DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `reference_id` varchar(50) DEFAULT NULL,
  `reference_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `image_reference_id` (`reference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` varchar(50) NOT NULL,
  `version` bigint(20) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `last_modified_user` varchar(255) DEFAULT NULL,
  `last_modified_time` datetime DEFAULT NULL,
  `title` varchar(1000) DEFAULT NULL,
  `link` varchar(1000) DEFAULT NULL,
  `pub_date` datetime DEFAULT NULL,
  `guid` varchar(1000) DEFAULT NULL,
  `description` text,
  `rss_source_group_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_guid` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_rss_source`
--

DROP TABLE IF EXISTS `news_rss_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_rss_source` (
  `id` varchar(50) NOT NULL,
  `version` bigint(20) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `last_modified_user` varchar(255) DEFAULT NULL,
  `last_modified_time` datetime DEFAULT NULL,
  `rss_source_id` varchar(100) DEFAULT NULL,
  `news_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_rss_source_rss_source_id` (`rss_source_id`),
  KEY `news_rss_source_news_id` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_rss_source`
--

LOCK TABLES `news_rss_source` WRITE;
/*!40000 ALTER TABLE `news_rss_source` DISABLE KEYS */;
/*!40000 ALTER TABLE `news_rss_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rss_config`
--

DROP TABLE IF EXISTS `rss_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rss_config` (
  `id` varchar(50) NOT NULL,
  `version` bigint(20) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `last_modified_user` varchar(255) DEFAULT NULL,
  `last_modified_time` datetime DEFAULT NULL,
  `rss_url` varchar(1000) DEFAULT NULL,
  `config_json` text,
  `rss_source_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rss_config`
--

LOCK TABLES `rss_config` WRITE;
/*!40000 ALTER TABLE `rss_config` DISABLE KEYS */;
INSERT INTO `rss_config` VALUES ('39a80ceda7884e98b3ebe33c2769944e',0,'\0','admin','2018-06-23 04:20:17','http://feeds.foxnews.com/foxnews/latest?format=xml','{\"title\":{\"path\":\"title\"},\"description\":{\"path\":\"description\"},\"link\":{\"path\":\"link\"},\"image\":{\"path\":\"image\",\"config\":{\"url\":{\"path\":\"url\"},\"title\":{\"path\":\"title\"},\"link\":{\"path\":\"link\"}}},\"items\":{\"path\":\"item\",\"config\":{\"title\":{\"path\":\"title\"},\"link\":{\"path\":\"link\"},\"pubDate\":{\"path\":\"pubDate\"},\"guid\":{\"path\":\"guid\"},\"description\":{\"path\":\"description\"},\"thumbnails\":{\"path\":\"group.content\",\"config\":{\"type\":{\"path\":\"@medium\"},\"width\":{\"path\":\"@width\"},\"height\":{\"path\":\"@height\"},\"url\":{\"path\":\"@url\"}}}}}}','8414a41e4cc14eacb6e027ea58b9722c'),('6c97d34186964350ae78125e4498ef44',0,'\0','admin','2018-06-23 04:20:17','http://rss.cnn.com/rss/edition.rss','{\"title\":{\"path\":\"title\"},\"description\":{\"path\":\"description\"},\"link\":{\"path\":\"link\"},\"image\":{\"path\":\"image\",\"config\":{\"url\":{\"path\":\"url\"},\"title\":{\"path\":\"title\"},\"link\":{\"path\":\"link\"}}},\"items\":{\"path\":\"item\",\"config\":{\"title\":{\"path\":\"title\"},\"link\":{\"path\":\"link\"},\"pubDate\":{\"path\":\"pubDate\"},\"guid\":{\"path\":\"guid\"},\"description\":{\"path\":\"description\"},\"thumbnails\":{\"path\":\"group.content\",\"config\":{\"type\":{\"path\":\"@medium\"},\"width\":{\"path\":\"@width\"},\"height\":{\"path\":\"@height\"},\"url\":{\"path\":\"@url\"}}}}}}\r\n','67695949d9db459c8f884dde310465be');
/*!40000 ALTER TABLE `rss_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rss_source`
--

DROP TABLE IF EXISTS `rss_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rss_source` (
  `id` varchar(50) NOT NULL,
  `version` bigint(20) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `last_modified_user` varchar(255) DEFAULT NULL,
  `last_modified_time` datetime DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `category_id` varchar(100) DEFAULT NULL,
  `rss_url` varchar(1000) DEFAULT NULL,
  `rss_source_group_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rss_source`
--

LOCK TABLES `rss_source` WRITE;
/*!40000 ALTER TABLE `rss_source` DISABLE KEYS */;
INSERT INTO `rss_source` VALUES ('67695949d9db459c8f884dde310465be',0,'\0','admin','2018-06-25 16:24:57','rss.cnn.com','c00ac37ecfd146f38ffba7399ce87181','http://rss.cnn.com/rss/edition.rss','3b87dc649e2e4407aa106374af6ecf35'),('8414a41e4cc14eacb6e027ea58b9722c',0,'\0','admin','2018-06-25 16:24:57','feeds.foxnews.com','81a9b479e9434be6abef5c99ab669816','http://feeds.foxnews.com/foxnews/latest?format=xml','c323727065c94eac9dc72f26cd6a3b74');
/*!40000 ALTER TABLE `rss_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rss_source_group`
--

DROP TABLE IF EXISTS `rss_source_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rss_source_group` (
  `id` varchar(50) NOT NULL,
  `version` bigint(20) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `last_modified_user` varchar(255) DEFAULT NULL,
  `last_modified_time` datetime DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rss_source_group`
--

LOCK TABLES `rss_source_group` WRITE;
/*!40000 ALTER TABLE `rss_source_group` DISABLE KEYS */;
INSERT INTO `rss_source_group` VALUES ('3b87dc649e2e4407aa106374af6ecf35',0,'\0','admin','2018-06-27 13:33:55','CNN.com'),('c323727065c94eac9dc72f26cd6a3b74',0,'\0','admin','2018-06-27 13:33:55','FOX News');
/*!40000 ALTER TABLE `rss_source_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_news`
--

DROP TABLE IF EXISTS `v_news`;
/*!50001 DROP VIEW IF EXISTS `v_news`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_news` AS SELECT 
 1 AS `id`,
 1 AS `news_id`,
 1 AS `is_deleted`,
 1 AS `last_modified_user`,
 1 AS `last_modified_time`,
 1 AS `title`,
 1 AS `link`,
 1 AS `pub_date`,
 1 AS `guid`,
 1 AS `description`,
 1 AS `rss_source_group_id`,
 1 AS `category_id`,
 1 AS `rss_source_group_title`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_news`
--

/*!50001 DROP VIEW IF EXISTS `v_news`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_news` AS select `cns`.`id` AS `id`,`ns`.`id` AS `news_id`,`ns`.`is_deleted` AS `is_deleted`,`ns`.`last_modified_user` AS `last_modified_user`,`ns`.`last_modified_time` AS `last_modified_time`,`ns`.`title` AS `title`,`ns`.`link` AS `link`,`ns`.`pub_date` AS `pub_date`,`ns`.`guid` AS `guid`,`ns`.`description` AS `description`,`ns`.`rss_source_group_id` AS `rss_source_group_id`,`cns`.`category_id` AS `category_id`,`rsg`.`title` AS `rss_source_group_title` from ((`category_news` `cns` join `news` `ns` on(((`ns`.`id` = `cns`.`news_id`) and (`ns`.`is_deleted` = FALSE)))) join `rss_source_group` `rsg` on(((`rsg`.`id` = `ns`.`rss_source_group_id`) and (`rsg`.`is_deleted` = FALSE)))) where (`cns`.`is_deleted` = FALSE) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-27 21:02:33
