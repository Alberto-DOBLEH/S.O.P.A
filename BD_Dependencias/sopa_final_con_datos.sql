CREATE DATABASE  IF NOT EXISTS `sopa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sopa`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: sopa
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id_carrito` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `estatus` char(1) NOT NULL,
  PRIMARY KEY (`id_carrito`),
  KEY `carrito_usuario_idx` (`id_usuario`),
  KEY `carrito_producto_idx` (`id_producto`),
  CONSTRAINT `carrito_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `carrito_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (3,1,44,3,'P'),(4,1,30,1,'P'),(5,1,1,13,'P'),(6,1,73,2,'P'),(7,1,4,5,'P'),(29,1,100,1,'P'),(30,1,74,1,'P'),(36,1,66,1,'A');
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles_ventas`
--

DROP TABLE IF EXISTS `detalles_ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_ventas` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `id_venta` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `precio_unitario` float DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `detalles_ventas_idx` (`id_venta`),
  KEY `detalles_producto_idx` (`id_producto`),
  CONSTRAINT `detalles_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `detalles_ventas` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_ventas`
--

LOCK TABLES `detalles_ventas` WRITE;
/*!40000 ALTER TABLE `detalles_ventas` DISABLE KEYS */;
INSERT INTO `detalles_ventas` VALUES (1,1,44,2,5168.73),(2,2,30,1,5433.44),(3,3,30,1,5433.44),(4,4,1,1,3004.73),(5,4,73,1,5518.87),(6,4,4,1,2793.81),(7,5,100,1,5368.43),(8,5,74,1,4502.49);
/*!40000 ALTER TABLE `detalles_ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones` (
  `id_direccion` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `calle` varchar(100) NOT NULL,
  `no_ext` varchar(5) NOT NULL,
  `no_interior` varchar(5) DEFAULT NULL,
  `ciudad` varchar(100) NOT NULL,
  `codigo_postal` varchar(7) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  PRIMARY KEY (`id_direccion`),
  KEY `direcciones_usuarios_idx` (`id_usuario`),
  CONSTRAINT `direcciones_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (5,1,'Galeana','1918','','Los Mochis','81271','México','Sinaloa');
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `id_favoritos` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_favoritos`),
  KEY `favoritos_usuario_idx` (`id_usuario`),
  KEY `favoritos_producto_idx` (`id_producto`),
  CONSTRAINT `favoritos_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `favoritos_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `color` varchar(45) NOT NULL,
  `precio` float NOT NULL,
  `precio_original` float NOT NULL,
  `descuento` int NOT NULL,
  `reseñas` float NOT NULL,
  `conteo_reseñas` int NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `stock` int NOT NULL,
  `conteo_vendidos` int NOT NULL,
  `nuevo_usado` char(1) NOT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Smartphone Samsung Galaxy A54 1','Perfecto para el hogar o la oficina, fácil de usar y configurar.','HP','Belleza','Blanco',3004.73,7154.12,58,3.5,833,'https://fakestoreapi.com/img/10.jpg',78,302,'N'),(2,'Laptop Lenovo IdeaPad 3 2','Ofrece una experiencia de usuario fluida y confiable.','Lenovo','Moda Mujer','Blanco',4299.9,4999.88,14,1.7,710,'https://fakestoreapi.com/img/5.jpg',65,198,'U'),(3,'Reloj Fossil Mujer Acero 3','Tecnología avanzada en un diseño práctico y duradero.','Revlon','Moda Hombre','Café',6051.5,7859.09,23,2.9,550,'https://fakestoreapi.com/img/6.jpg',71,85,'U'),(4,'Smartwatch Apple Watch SE 4','Equipado con funciones inteligentes para facilitar la vida diaria.','Adidas','Moda Hombre','Rojo',2793.81,6497.23,57,3.5,886,'https://fakestoreapi.com/img/12.jpg',1,248,'N'),(5,'Tablet Huawei MediaPad T10 5','Ideal para uso diario con excelente relación calidad-precio.','Sony','Deportes','Amarillo',6943.47,19287.4,64,3.6,418,'https://fakestoreapi.com/img/16.jpg',53,363,'U'),(6,'Plancha de Cabello Revlon 6','Equipado con funciones inteligentes para facilitar la vida diaria.','LG','Moda Hombre','Blanco',8235.6,11438.3,28,2.2,281,'https://fakestoreapi.com/img/8.jpg',68,147,'N'),(7,'Vestido Casual Mujer 7','Alta capacidad de almacenamiento y velocidad mejorada.','LG','Belleza','Rosa',9571.46,11129.6,14,3.3,274,'https://fakestoreapi.com/img/18.jpg',46,277,'N'),(8,'Silla Gamer Cougar Armor 8','Ofrece una experiencia de usuario fluida y confiable.','LG','Belleza','Azul',17224.8,19798.6,13,3.9,669,'https://fakestoreapi.com/img/8.jpg',38,447,'N'),(9,'Zapatos Adidas Running 9','Alta capacidad de almacenamiento y velocidad mejorada.','LG','Moda Mujer','Gris',15383.9,17285.3,11,2.8,120,'https://fakestoreapi.com/img/8.jpg',26,415,'U'),(10,'Batidora de Mano Oster 10','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','Revlon','Computación','Amarillo',2962.97,3569.84,17,4.1,833,'https://fakestoreapi.com/img/7.jpg',7,291,'U'),(11,'Monitor LG 24\'\' Full HD 11','Ideal para uso diario con excelente relación calidad-precio.','Puma','Moda Mujer','Café',6439.11,10913.7,41,4.9,299,'https://fakestoreapi.com/img/10.jpg',73,136,'N'),(12,'Cámara Sony Alpha 6400 12','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','Lenovo','Deportes','Amarillo',11959.8,18399.7,35,4.5,129,'https://fakestoreapi.com/img/5.jpg',31,74,'U'),(13,'Impresora HP DeskJet 4155e 13','Fabricado con materiales resistentes y de alta durabilidad.','Sony','Deportes','Amarillo',6561.94,9942.34,34,3.5,384,'https://fakestoreapi.com/img/15.jpg',9,324,'N'),(14,'Mochila Puma Negra 14','Perfecto para el hogar o la oficina, fácil de usar y configurar.','HP','Belleza','Verde',7412.4,13985.7,47,2.8,499,'https://fakestoreapi.com/img/11.jpg',74,1,'N'),(15,'Freidora de Aire 4L Oster 15','Diseño ergonómico que favorece la postura y la comodidad.','LG','Computación','Gris',5455.07,17047.1,68,2.6,991,'https://fakestoreapi.com/img/14.jpg',27,253,'U'),(16,'Collar Plata 925 Corazón 16','Diseño ergonómico que favorece la postura y la comodidad.','Nike','Deportes','Verde',5841.18,6953.78,16,3.3,496,'https://fakestoreapi.com/img/11.jpg',87,390,'N'),(17,'Smart TV Samsung 43\'\' 17','Diseño ergonómico que favorece la postura y la comodidad.','Samsung','Electrónica','Rosa',496.59,620.74,20,2.8,0,'https://fakestoreapi.com/img/14.jpg',25,352,'N'),(18,'Auriculares JBL Tune 510BT 18','Equipado con funciones inteligentes para facilitar la vida diaria.','Adidas','Moda Hombre','Verde',1154.95,2138.8,46,2,380,'https://fakestoreapi.com/img/6.jpg',6,202,'U'),(19,'Pantalón Deportivo Nike 19','Equipado con funciones inteligentes para facilitar la vida diaria.','Sony','Hogar','Blanco',14162.8,14162.8,0,1.9,79,'https://fakestoreapi.com/img/5.jpg',75,115,'U'),(20,'Camisa Manga Larga Hombre 20','Perfecto para el hogar o la oficina, fácil de usar y configurar.','Samsung','Electrónica','Gris',7542.64,16397.1,54,3.8,489,'https://fakestoreapi.com/img/3.jpg',29,196,'N'),(21,'Silla Oficina Ergonómica 21','Estilo elegante, ligero y funcional para todos los días.','Apple','Electrónica','Gris',4675.4,7540.97,38,1.5,792,'https://fakestoreapi.com/img/5.jpg',82,346,'N'),(22,'Set de Sartenes T-Fal 22','Ofrece una experiencia de usuario fluida y confiable.','Apple','Belleza','Café',368.89,466.95,21,2.8,739,'https://fakestoreapi.com/img/7.jpg',80,383,'N'),(23,'Licuadora Oster 3 velocidades 23','Alta capacidad de almacenamiento y velocidad mejorada.','HP','Belleza','Rosa',15344.7,17241.3,11,4.6,143,'https://fakestoreapi.com/img/4.jpg',75,373,'U'),(24,'Router TP-Link Archer C6 24','Estilo elegante, ligero y funcional para todos los días.','Nike','Hogar','Gris',10960.1,15884.2,31,2.1,86,'https://fakestoreapi.com/img/8.jpg',70,307,'U'),(25,'Teclado Mecánico Redragon 25','Equipado con funciones inteligentes para facilitar la vida diaria.','Samsung','Deportes','Verde',1521.55,4347.28,65,1.8,401,'https://fakestoreapi.com/img/10.jpg',82,27,'N'),(26,'Mouse Inalámbrico Logitech 26','Diseño ergonómico que favorece la postura y la comodidad.','LG','Hogar','Blanco',4594.87,5049.31,9,3.1,12,'https://fakestoreapi.com/img/12.jpg',40,67,'U'),(27,'Parlante Bluetooth Sony 27','Tecnología avanzada en un diseño práctico y duradero.','Revlon','Hogar','Gris',8629.31,11063.2,22,4.1,977,'https://fakestoreapi.com/img/3.jpg',2,300,'N'),(28,'Lavadora Samsung 16kg 28','Ofrece una experiencia de usuario fluida y confiable.','Samsung','Moda Mujer','Azul',1008.67,1084.59,7,4.8,407,'https://fakestoreapi.com/img/17.jpg',36,321,'U'),(29,'Refrigerador LG Inverter 29','Ideal para uso diario con excelente relación calidad-precio.','HP','Computación','Amarillo',615.63,1923.83,68,3.2,156,'https://fakestoreapi.com/img/9.jpg',10,158,'N'),(30,'Secadora de Cabello Conair 30','Estilo elegante, ligero y funcional para todos los días.','Puma','Moda Hombre','Rojo',5433.44,10866.9,50,3.3,781,'https://fakestoreapi.com/img/3.jpg',39,357,'U'),(31,'Base para Laptop con ventilador 31','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','Sony','Electrónica','Azul',899.28,1998.39,55,1.5,626,'https://fakestoreapi.com/img/20.jpg',7,158,'N'),(32,'Escritorio de Oficina Blanco 32','Fabricado con materiales resistentes y de alta durabilidad.','Apple','Electrónica','Rojo',11295.6,14119.5,20,3,355,'https://fakestoreapi.com/img/17.jpg',66,400,'U'),(33,'Cafetera Nespresso Essenza 33','Alta capacidad de almacenamiento y velocidad mejorada.','Lenovo','Moda Mujer','Rojo',9946.59,15070.6,34,3.9,120,'https://fakestoreapi.com/img/1.jpg',42,413,'U'),(34,'Set de Toallas Algodón 34','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','Adidas','Belleza','Blanco',4986.9,5480.11,9,3,523,'https://fakestoreapi.com/img/12.jpg',7,255,'N'),(35,'Zapatos de Vestir Hombre 35','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','Nike','Moda Hombre','Verde',13359.7,15534.6,14,1.9,521,'https://fakestoreapi.com/img/1.jpg',5,439,'N'),(36,'Bolso de Mano Mujer 36','Tecnología avanzada en un diseño práctico y duradero.','Sony','Electrónica','Rosa',6050.98,7470.34,19,1.7,983,'https://fakestoreapi.com/img/2.jpg',70,411,'U'),(37,'Pulsera Fitness Xiaomi 37','Ofrece una experiencia de usuario fluida y confiable.','Sony','Moda Mujer','Azul',5100.15,8500.25,40,2.1,79,'https://fakestoreapi.com/img/19.jpg',47,61,'N'),(38,'Impresora Epson EcoTank L3250 38','Fabricado con materiales resistentes y de alta durabilidad.','Lenovo','Moda Hombre','Morado',9620.59,19633.8,51,1.3,476,'https://fakestoreapi.com/img/10.jpg',99,432,'U'),(39,'Cámara Web Full HD Logitech 39','Ofrece una experiencia de usuario fluida y confiable.','Nike','Electrónica','Morado',4927.89,9297.9,47,1.8,577,'https://fakestoreapi.com/img/10.jpg',94,318,'N'),(40,'Monitor Curvo Samsung 40','Estilo elegante, ligero y funcional para todos los días.','LG','Moda Mujer','Café',14584.2,19445.6,25,3.9,559,'https://fakestoreapi.com/img/8.jpg',19,3,'U'),(41,'Mueble Organizador 5 Cajones 41','Perfecto para el hogar o la oficina, fácil de usar y configurar.','Samsung','Moda Hombre','Morado',7053.3,7124.55,1,4.8,1,'https://fakestoreapi.com/img/13.jpg',94,372,'U'),(42,'Alfombra Decorativa 2x2m 42','Diseño ergonómico que favorece la postura y la comodidad.','Apple','Moda Hombre','Morado',9243.67,19667.4,53,3,61,'https://fakestoreapi.com/img/5.jpg',91,143,'N'),(43,'Colchón Matrimonial Memory Foam 43','Estilo elegante, ligero y funcional para todos los días.','Samsung','Moda Hombre','Morado',4471.73,8437.22,47,2.8,765,'https://fakestoreapi.com/img/3.jpg',74,48,'N'),(44,'Lámpara LED Escritorio 44','Ofrece una experiencia de usuario fluida y confiable.','HP','Electrónica','Café',5168.73,11486.1,55,3.6,133,'https://fakestoreapi.com/img/8.jpg',37,133,'U'),(45,'Auriculares Gamer HyperX 45','Estilo elegante, ligero y funcional para todos los días.','HP','Computación','Gris',4333.39,6565.74,34,1.9,966,'https://fakestoreapi.com/img/7.jpg',17,399,'N'),(46,'Silla Reclinable Moderna 46','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','Lenovo','Electrónica','Rojo',5493.88,9156.46,40,2.6,548,'https://fakestoreapi.com/img/12.jpg',98,106,'U'),(47,'Reloj Inteligente Amazfit 47','Estilo elegante, ligero y funcional para todos los días.','Adidas','Hogar','Verde',15213.6,17093.9,11,1.6,702,'https://fakestoreapi.com/img/10.jpg',90,356,'N'),(48,'Lentes de Sol RayBan 48','Estilo elegante, ligero y funcional para todos los días.','Sony','Deportes','Gris',2223.17,3221.98,31,4.9,405,'https://fakestoreapi.com/img/17.jpg',6,346,'U'),(49,'Bicicleta Urbana Rodado 26 49','Ofrece una experiencia de usuario fluida y confiable.','Adidas','Deportes','Rojo',447.04,912.32,51,4.4,569,'https://fakestoreapi.com/img/18.jpg',31,48,'U'),(50,'Zapatillas Nike Air Max 50','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','Apple','Deportes','Rojo',2504.15,2692.63,7,4.3,227,'https://fakestoreapi.com/img/5.jpg',25,421,'U'),(51,'Smartphone Samsung Galaxy A54 51','Fabricado con materiales resistentes y de alta durabilidad.','Nike','Computación','Blanco',7887.09,11771.8,33,4.7,76,'https://fakestoreapi.com/img/1.jpg',8,101,'U'),(52,'Laptop Lenovo IdeaPad 3 52','Ideal para uso diario con excelente relación calidad-precio.','Lenovo','Electrónica','Gris',1112.65,2713.79,59,1.2,946,'https://fakestoreapi.com/img/19.jpg',55,420,'U'),(53,'Reloj Fossil Mujer Acero 53','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','LG','Electrónica','Amarillo',10732.2,13759.3,22,2.4,930,'https://fakestoreapi.com/img/6.jpg',35,143,'U'),(54,'Smartwatch Apple Watch SE 54','Ideal para uso diario con excelente relación calidad-precio.','Lenovo','Electrónica','Café',8623.47,12497.8,31,3.6,510,'https://fakestoreapi.com/img/14.jpg',70,245,'N'),(55,'Tablet Huawei MediaPad T10 55','Ofrece una experiencia de usuario fluida y confiable.','Apple','Moda Mujer','Amarillo',2252.66,3003.55,25,3.6,816,'https://fakestoreapi.com/img/17.jpg',31,322,'N'),(56,'Plancha de Cabello Revlon 56','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','HP','Deportes','Gris',3704.92,9749.78,62,2.4,579,'https://fakestoreapi.com/img/17.jpg',41,198,'U'),(57,'Vestido Casual Mujer 57','Tecnología avanzada en un diseño práctico y duradero.','Lenovo','Electrónica','Gris',11701.3,12063.2,3,4.6,797,'https://fakestoreapi.com/img/9.jpg',7,414,'U'),(58,'Silla Gamer Cougar Armor 58','Perfecto para el hogar o la oficina, fácil de usar y configurar.','Puma','Moda Mujer','Café',15993.8,19992.2,20,1.4,672,'https://fakestoreapi.com/img/8.jpg',34,273,'N'),(59,'Zapatos Adidas Running 59','Diseño ergonómico que favorece la postura y la comodidad.','Sony','Belleza','Amarillo',5685.93,7289.65,22,1.7,606,'https://fakestoreapi.com/img/11.jpg',94,357,'U'),(60,'Batidora de Mano Oster 60','Tecnología avanzada en un diseño práctico y duradero.','Revlon','Electrónica','Gris',15552.9,18966.9,18,3.3,192,'https://fakestoreapi.com/img/16.jpg',69,158,'N'),(61,'Monitor LG 24\'\' Full HD 61','Diseño ergonómico que favorece la postura y la comodidad.','LG','Electrónica','Blanco',1012.69,1406.51,28,1.1,489,'https://fakestoreapi.com/img/1.jpg',42,469,'N'),(62,'Cámara Sony Alpha 6400 62','Tecnología avanzada en un diseño práctico y duradero.','Lenovo','Moda Mujer','Rojo',10856,18400,41,1.2,151,'https://fakestoreapi.com/img/19.jpg',90,469,'N'),(63,'Impresora HP DeskJet 4155e 63','Ofrece una experiencia de usuario fluida y confiable.','Apple','Deportes','Morado',15702.2,17255.2,9,2.5,964,'https://fakestoreapi.com/img/13.jpg',75,51,'U'),(64,'Mochila Puma Negra 64','Diseño ergonómico que favorece la postura y la comodidad.','Adidas','Moda Mujer','Rojo',8786.01,19524.5,55,4.2,983,'https://fakestoreapi.com/img/16.jpg',83,162,'N'),(65,'Freidora de Aire 4L Oster 65','Alta capacidad de almacenamiento y velocidad mejorada.','Puma','Computación','Café',11378.7,15803.7,28,3.7,834,'https://fakestoreapi.com/img/6.jpg',48,157,'U'),(66,'Collar Plata 925 Corazón 66','Estilo elegante, ligero y funcional para todos los días.','Lenovo','Moda Hombre','Negro',9495.57,18991.1,50,4.4,789,'https://fakestoreapi.com/img/19.jpg',4,93,'U'),(67,'Smart TV Samsung 43\'\' 67','Perfecto para el hogar o la oficina, fácil de usar y configurar.','Revlon','Moda Hombre','Café',869.86,2350.97,63,1.6,763,'https://fakestoreapi.com/img/3.jpg',30,177,'U'),(68,'Auriculares JBL Tune 510BT 68','Alta capacidad de almacenamiento y velocidad mejorada.','Lenovo','Computación','Blanco',9562.31,16486.7,42,2.8,271,'https://fakestoreapi.com/img/7.jpg',31,354,'N'),(69,'Pantalón Deportivo Nike 69','Tecnología avanzada en un diseño práctico y duradero.','Nike','Moda Mujer','Blanco',13622.6,14492.2,6,2.5,750,'https://fakestoreapi.com/img/14.jpg',21,452,'U'),(70,'Camisa Manga Larga Hombre 70','Tecnología avanzada en un diseño práctico y duradero.','LG','Hogar','Gris',9729.87,11056.7,12,4.3,807,'https://fakestoreapi.com/img/19.jpg',83,388,'N'),(71,'Silla Oficina Ergonómica 71','Alta capacidad de almacenamiento y velocidad mejorada.','Lenovo','Hogar','Blanco',15402.4,16044.1,4,2.2,326,'https://fakestoreapi.com/img/9.jpg',13,37,'U'),(72,'Set de Sartenes T-Fal 72','Alta capacidad de almacenamiento y velocidad mejorada.','Lenovo','Hogar','Rojo',4416.03,14720.1,70,4.8,95,'https://fakestoreapi.com/img/11.jpg',76,314,'U'),(73,'Licuadora Oster 3 velocidades 73','Ideal para uso diario con excelente relación calidad-precio.','Samsung','Hogar','Rojo',5518.87,12264.2,55,1.6,103,'https://fakestoreapi.com/img/11.jpg',26,498,'N'),(74,'Router TP-Link Archer C6 74','Equipado con funciones inteligentes para facilitar la vida diaria.','HP','Computación','Morado',4502.49,14524.2,69,2.1,288,'https://fakestoreapi.com/img/10.jpg',30,49,'N'),(75,'Teclado Mecánico Redragon 75','Perfecto para el hogar o la oficina, fácil de usar y configurar.','HP','Belleza','Morado',13644.6,16845.1,19,1.2,3,'https://fakestoreapi.com/img/14.jpg',11,150,'U'),(76,'Mouse Inalámbrico Logitech 76','Estilo elegante, ligero y funcional para todos los días.','Sony','Electrónica','Negro',2757.49,4376.97,37,4.9,484,'https://fakestoreapi.com/img/4.jpg',39,401,'U'),(77,'Parlante Bluetooth Sony 77','Equipado con funciones inteligentes para facilitar la vida diaria.','LG','Hogar','Verde',649.57,2095.4,69,2.6,379,'https://fakestoreapi.com/img/13.jpg',47,95,'U'),(78,'Lavadora Samsung 16kg 78','Alta capacidad de almacenamiento y velocidad mejorada.','Samsung','Moda Mujer','Rosa',6812.38,9461.64,28,4.3,577,'https://fakestoreapi.com/img/2.jpg',19,385,'N'),(79,'Refrigerador LG Inverter 79','Alta capacidad de almacenamiento y velocidad mejorada.','Apple','Computación','Gris',7786.15,16221.2,52,4.9,603,'https://fakestoreapi.com/img/8.jpg',70,31,'U'),(80,'Secadora de Cabello Conair 80','Ideal para uso diario con excelente relación calidad-precio.','Puma','Hogar','Morado',5534.1,13835.2,60,3.3,241,'https://fakestoreapi.com/img/16.jpg',38,40,'U'),(81,'Base para Laptop con ventilador 81','Perfecto para el hogar o la oficina, fácil de usar y configurar.','Samsung','Belleza','Café',14792,18039,18,1.5,775,'https://fakestoreapi.com/img/15.jpg',22,485,'N'),(82,'Escritorio de Oficina Blanco 82','Perfecto para el hogar o la oficina, fácil de usar y configurar.','Sony','Deportes','Azul',1281.5,2785.86,54,1.3,699,'https://fakestoreapi.com/img/14.jpg',25,421,'N'),(83,'Cafetera Nespresso Essenza 83','Fabricado con materiales resistentes y de alta durabilidad.','Revlon','Moda Mujer','Gris',16783.4,18242.8,8,1.3,569,'https://fakestoreapi.com/img/13.jpg',70,166,'U'),(84,'Set de Toallas Algodón 84','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','Puma','Hogar','Negro',5370.32,15795,66,4.1,115,'https://fakestoreapi.com/img/14.jpg',19,75,'N'),(85,'Zapatos de Vestir Hombre 85','Equipado con funciones inteligentes para facilitar la vida diaria.','Apple','Belleza','Blanco',5049.34,15779.2,68,4.5,898,'https://fakestoreapi.com/img/14.jpg',33,196,'U'),(86,'Bolso de Mano Mujer 86','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','Revlon','Belleza','Rosa',674.75,1038.07,35,2.6,633,'https://fakestoreapi.com/img/20.jpg',87,355,'U'),(87,'Pulsera Fitness Xiaomi 87','Diseño ergonómico que favorece la postura y la comodidad.','Samsung','Hogar','Gris',13068.9,13903.1,6,4,942,'https://fakestoreapi.com/img/9.jpg',47,10,'U'),(88,'Impresora Epson EcoTank L3250 88','Tecnología avanzada en un diseño práctico y duradero.','Adidas','Moda Mujer','Verde',14875.6,16904.1,12,4.9,233,'https://fakestoreapi.com/img/5.jpg',38,498,'U'),(89,'Cámara Web Full HD Logitech 89','Ofrece una experiencia de usuario fluida y confiable.','Nike','Moda Mujer','Amarillo',10874.1,12218.1,11,1.8,216,'https://fakestoreapi.com/img/14.jpg',94,248,'U'),(90,'Monitor Curvo Samsung 90','Ofrece una experiencia de usuario fluida y confiable.','Samsung','Belleza','Rojo',573.35,1592.65,64,2.6,799,'https://fakestoreapi.com/img/17.jpg',72,14,'N'),(91,'Mueble Organizador 5 Cajones 91','Perfecto para el hogar o la oficina, fácil de usar y configurar.','Sony','Deportes','Azul',11584,16788.4,31,1.1,51,'https://fakestoreapi.com/img/12.jpg',90,101,'U'),(92,'Alfombra Decorativa 2x2m 92','Estilo elegante, ligero y funcional para todos los días.','Nike','Deportes','Rosa',8713.34,10251,15,3.7,247,'https://fakestoreapi.com/img/12.jpg',62,304,'U'),(93,'Colchón Matrimonial Memory Foam 93','Diseñado para ofrecer el mejor rendimiento con estilo moderno.','Lenovo','Deportes','Rosa',6642.46,11861.5,44,2.4,857,'https://fakestoreapi.com/img/9.jpg',95,425,'N'),(94,'Lámpara LED Escritorio 94','Fabricado con materiales resistentes y de alta durabilidad.','Adidas','Electrónica','Amarillo',933.03,1278.13,27,4.4,662,'https://fakestoreapi.com/img/8.jpg',86,105,'U'),(95,'Auriculares Gamer HyperX 95','Estilo elegante, ligero y funcional para todos los días.','HP','Belleza','Negro',17159.9,17333.2,1,2.9,135,'https://fakestoreapi.com/img/6.jpg',76,410,'N'),(96,'Silla Reclinable Moderna 96','Diseño ergonómico que favorece la postura y la comodidad.','Sony','Moda Mujer','Café',9857.72,16160.2,39,3.9,726,'https://fakestoreapi.com/img/9.jpg',54,458,'U'),(97,'Reloj Inteligente Amazfit 97','Ofrece una experiencia de usuario fluida y confiable.','Nike','Hogar','Verde',2851.21,4598.72,38,3.7,844,'https://fakestoreapi.com/img/20.jpg',50,299,'N'),(98,'Lentes de Sol RayBan 98','Equipado con funciones inteligentes para facilitar la vida diaria.','Samsung','Belleza','Gris',7270.85,11360.7,36,2.2,110,'https://fakestoreapi.com/img/16.jpg',8,172,'U'),(99,'Bicicleta Urbana Rodado 26 99','Alta capacidad de almacenamiento y velocidad mejorada.','Nike','Deportes','Verde',3375.65,5444.59,38,1.8,529,'https://fakestoreapi.com/img/8.jpg',7,412,'U'),(100,'Zapatillas Nike Air Max 100','Equipado con funciones inteligentes para facilitar la vida diaria.','Nike','Computación','Rojo',5368.43,14509.3,63,5,265,'https://fakestoreapi.com/img/14.jpg',51,198,'N');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `telefono` varchar(13) NOT NULL,
  `foto_perfil` varchar(500) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `telefono_UNIQUE` (`telefono`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'alberto','$2b$10$r0rCwbtBP3siIw8ZnRIx/OHwnNQDzVsgGTk2JJ7FilIuv172tUqu2','+526681348867',NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `total` float NOT NULL,
  `metodo_pago` varchar(45) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estatus` char(1) NOT NULL DEFAULT 'P',
  PRIMARY KEY (`id_venta`),
  KEY `ventas_usuario_idx` (`id_usuario`),
  CONSTRAINT `ventas_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,1,10337.5,'tarjeta','2025-06-03 00:34:42','A'),(2,1,5433.44,'tarjeta','2025-06-03 00:36:43','A'),(3,1,5433.44,'tarjeta','2025-06-03 00:36:57','A'),(4,1,11317.4,'tarjeta','2025-06-03 00:41:37','A'),(5,1,9870.92,'tarjeta','2025-06-03 16:34:30','A');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-04 20:02:09
