-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2026 at 08:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kiosk_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_product`
--

INSERT INTO `order_product` (`order_id`, `product_id`, `price`, `quantity`) VALUES
(3, 29, 5.50, 1),
(3, 33, 11.00, 1),
(3, 38, 4.50, 1),
(3, 43, 1.00, 1),
(4, 26, 7.50, 1),
(4, 33, 11.00, 1),
(6, 30, 10.50, 1),
(6, 37, 4.50, 1),
(6, 39, 5.00, 1),
(6, 42, 1.00, 1),
(7, 32, 10.00, 1),
(7, 34, 8.50, 1),
(8, 39, 5.00, 1),
(9, 26, 7.50, 1),
(9, 27, 6.50, 1),
(10, 26, 7.50, 1),
(10, 27, 6.50, 1),
(11, 26, 7.50, 1),
(11, 27, 6.50, 1),
(12, 26, 7.50, 1),
(12, 27, 6.50, 1),
(13, 26, 7.50, 1),
(13, 27, 6.50, 1),
(14, 26, 7.50, 1),
(14, 27, 6.50, 1),
(15, 26, 7.50, 1),
(15, 27, 6.50, 1),
(16, 26, 7.50, 1),
(16, 27, 6.50, 1),
(17, 26, 7.50, 1),
(17, 27, 6.50, 1),
(18, 26, 7.50, 1),
(18, 27, 6.50, 1),
(19, 26, 7.50, 1),
(19, 27, 6.50, 1),
(20, 26, 7.50, 1),
(20, 27, 6.50, 1),
(21, 26, 7.50, 1),
(21, 27, 6.50, 1),
(22, 26, 7.50, 1),
(22, 27, 6.50, 1),
(23, 26, 7.50, 1),
(23, 27, 6.50, 1),
(24, 26, 7.50, 1),
(24, 27, 6.50, 1),
(25, 26, 7.50, 1),
(25, 27, 6.50, 1),
(26, 26, 7.50, 1),
(26, 27, 6.50, 1),
(27, 26, 7.50, 1),
(27, 27, 6.50, 1),
(28, 26, 7.50, 1),
(28, 27, 6.50, 1),
(29, 26, 7.50, 1),
(29, 27, 6.50, 1),
(30, 26, 7.50, 1),
(30, 27, 6.50, 1),
(31, 26, 7.50, 1),
(31, 27, 6.50, 1),
(32, 26, 7.50, 1),
(32, 27, 6.50, 1),
(34, 32, 10.00, 1),
(35, 32, 10.00, 1),
(36, 35, 9.00, 1),
(37, 33, 11.00, 1),
(37, 34, 8.50, 1),
(37, 37, 4.50, 1),
(37, 42, 1.00, 1),
(38, 32, 10.00, 1),
(39, 39, 5.00, 1),
(40, 32, 10.00, 1),
(41, 30, 10.50, 1),
(42, 26, 7.50, 1),
(42, 27, 6.50, 1),
(43, 26, 7.50, 1),
(43, 27, 6.50, 1),
(44, 26, 7.50, 1),
(44, 27, 6.50, 1),
(45, 31, 9.50, 1),
(46, 26, 7.50, 1),
(46, 27, 6.50, 1),
(47, 32, 10.00, 1),
(48, 29, 5.50, 1),
(49, 33, 11.00, 1),
(53, 29, 5.50, 1),
(53, 35, 9.00, 1),
(54, 36, 7.50, 2),
(54, 37, 4.50, 1),
(54, 39, 5.00, 2),
(54, 42, 1.00, 1),
(55, 33, 11.00, 1),
(55, 37, 4.50, 1),
(55, 38, 4.50, 1),
(55, 43, 1.00, 1),
(56, 32, 10.00, 1),
(56, 34, 8.50, 1),
(56, 37, 4.50, 1),
(56, 42, 1.00, 1),
(57, 34, 8.50, 1),
(57, 35, 9.00, 1),
(58, 33, 11.00, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
