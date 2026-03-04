-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2026 at 01:44 PM
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
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`) VALUES
(1, 'Breakfast', 'Start your day with our healthy and delicious breakfast options'),
(2, 'Lunch & Dinner', 'Hearty and nutritious bowls for any time of day'),
(3, 'Handhelds (Wraps & Sandwiches)', 'Perfect handheld meals for on-the-go'),
(4, 'Sides & Small Plates', 'Delicious sides to complement your meal'),
(5, 'Signature Dips', 'House-made dips to elevate any dish'),
(6, 'Drinks', 'Refreshing beverages and smoothies');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image_id`, `filename`, `description`) VALUES
(1, 'assets/images/menu/Breakfast/Gemini_Generated_Image_l0r92pl0r92pl0r9.png', 'Morning Boost Açaí Bowl'),
(2, 'assets/images/menu/Breakfast/Gemini_Generated_Image_rin4qyrin4qyrin4.png', 'The Garden Breakfast Wrap'),
(3, 'assets/images/menu/Breakfast/Gemini_Generated_Image_pr9e2vpr9e2vpr9e.png', 'Peanut Butter & Cacao Toast'),
(4, 'assets/images/menu/Breakfast/Gemini_Generated_Image_x6oz4sx6oz4sx6oz.png', 'Overnight Oats: Apple Pie Style'),
(5, 'assets/images/menu/Lunch & Dinner/Gemini_Generated_Image_io68i5io68i5io68 kopie.png', 'Tofu Power Tahini Bowl'),
(6, 'assets/images/menu/Lunch & Dinner/Gemini_Generated_Image_zhxd7bzhxd7bzhxd kopie.png', 'The Supergreen Harvest'),
(7, 'assets/images/menu/Lunch & Dinner/Gemini_Generated_Image_oz7mrmoz7mrmoz7m.png', 'Mediterranean Falafel Bowl'),
(8, 'assets/images/menu/Lunch & Dinner/Gemini_Generated_Image_p1ej7kp1ej7kp1ej.png', 'Warm Teriyaki Tempeh Bowl'),
(9, 'assets/images/menu/Handhelds/Gemini_Generated_Image_p9dp6p9dp6p9dp6p.png', 'Zesty Chickpea Hummus Wrap'),
(10, 'assets/images/menu/Handhelds/Gemini_Generated_Image_5aqrk45aqrk45aqr.png', 'Avocado & Halloumi Toastie'),
(11, 'assets/images/menu/Handhelds/Gemini_Generated_Image_c48jd4c48jd4c48j.png', 'Smoky BBQ Jackfruit Slider'),
(12, 'assets/images/menu/Sides/Gemini_Generated_Image_ok88tpok88tpok88.png', 'Oven-Baked Sweet Potato Wedges'),
(13, 'assets/images/menu/Sides/Gemini_Generated_Image_9ofuzw9ofuzw9ofu.png', 'Zucchini Fries'),
(14, 'assets/images/menu/Sides/Gemini_Generated_Image_2ozhre2ozhre2ozh kopie.png', 'Baked Falafel Bites - 5pcs'),
(15, 'assets/images/menu/Sides/Gemini_Generated_Image_gvlyv5gvlyv5gvly.png', 'Mini Veggie Platter & Hummus'),
(16, 'assets/images/menu/Dips/Gemini_Generated_Image_a8r7tsa8r7tsa8r7.png', 'Classic Hummus'),
(17, 'assets/images/menu/Dips/Gemini_Generated_Image_2t396w2t396w2t39.png', 'Avocado Lime Crema'),
(18, 'assets/images/menu/Dips/Gemini_Generated_Image_6tnox66tnox66tno.png', 'Greek Yogurt Ranch'),
(19, 'assets/images/menu/Dips/Gemini_Generated_Image_z91ccez91ccez91c.png', 'Spicy Sriracha Mayo'),
(20, 'assets/images/menu/Dips/Gemini_Generated_Image_f9zndgf9zndgf9zn.png', 'Peanut Satay Sauce'),
(21, 'assets/images/menu/Drinks/DALLE_2025-01-22_16.00.35.webp', 'Green Glow Smoothie'),
(22, 'assets/images/menu/Drinks/DALLE_2025-01-22_16.00.37.webp', 'Iced Matcha Latte'),
(23, 'assets/images/menu/Drinks/DALLE_2025-01-22_16.00.39.webp', 'Fruit-Infused Water'),
(24, 'assets/images/menu/Drinks/DALLE_2025-01-22_16.00.42.webp', 'Berry Blast Smoothie'),
(25, 'assets/images/menu/Drinks/DALLE_2025-01-22_16.00.43.webp', 'Citrus Cooler');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_status_id` int(11) NOT NULL,
  `pickup_number` varchar(2) NOT NULL,
  `price_total` decimal(10,2) NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`order_status_id`, `description`) VALUES
(1, 'Started'),
(2, 'Placed and paid'),
(3, 'Preparing'),
(4, 'Ready for pickup'),
(5, 'Picked up');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `kcal` int(11) DEFAULT NULL,
  `available` tinyint(1) DEFAULT 1,
  `is_vegan` tinyint(1) DEFAULT 0,
  `is_vegetarian` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `category_id`, `image_id`, `name`, `description`, `price`, `kcal`, `available`, `is_vegan`, `is_vegetarian`) VALUES
(26, 1, 1, 'Morning Boost Açaí Bowl', 'A chilled blend of açaí and banana topped with crunchy granola, chia seeds, and coconut.', 7.50, 320, 1, 1, 1),
(27, 1, 2, 'The Garden Breakfast Wrap', 'Whole-grain wrap with fluffy scrambled eggs, baby spinach, and a light yogurt-herb sauce.', 6.50, 280, 1, 0, 1),
(28, 1, 3, 'Peanut Butter & Cacao Toast', 'Sourdough toast with 100% natural peanut butter, banana, and a sprinkle of cacao nibs.', 5.00, 240, 1, 1, 1),
(29, 1, 4, 'Overnight Oats: Apple Pie Style', 'Oats soaked in almond milk with grated apple, cinnamon, and crushed walnuts.', 5.50, 290, 1, 1, 1),
(30, 2, 5, 'Tofu Power Tahini Bowl', 'Tri-color quinoa, maple-glazed tofu, roasted sweet potatoes, and kale with tahini dressing.', 10.50, 480, 1, 1, 1),
(31, 2, 6, 'The Supergreen Harvest', 'Massaged kale, edamame, avocado, cucumber, and toasted pumpkin seeds with lemon-olive oil.', 9.50, 310, 1, 1, 1),
(32, 2, 7, 'Mediterranean Falafel Bowl', 'Baked falafel, hummus, pickled red onions, cherry tomatoes, and cucumber on a bed of greens.', 10.00, 440, 1, 1, 1),
(33, 2, 8, 'Warm Teriyaki Tempeh Bowl', 'Steamed brown rice, seared tempeh, broccoli, and shredded carrots with a ginger-soy glaze.', 11.00, 500, 1, 1, 1),
(34, 3, 9, 'Zesty Chickpea Hummus Wrap', 'Spiced chickpeas, shredded carrots, crisp lettuce, and signature hummus in a whole-wheat wrap.', 8.50, 410, 1, 1, 1),
(35, 3, 10, 'Avocado & Halloumi Toastie', 'Grilled halloumi cheese, smashed avocado, and chili flakes on thick-cut multi-grain bread.', 9.00, 460, 1, 0, 1),
(36, 3, 11, 'Smoky BBQ Jackfruit Slider', 'Pulled jackfruit in BBQ sauce with a crunchy purple slaw on a vegan brioche bun.', 7.50, 350, 1, 1, 1),
(37, 4, 12, 'Oven-Baked Sweet Potato Wedges', 'Seasoned with smoked paprika. (Best with Avocado Lime Dip).', 4.50, 260, 1, 1, 1),
(38, 4, 13, 'Zucchini Fries', 'Crispy breaded zucchini sticks. (Best with Greek Yogurt Ranch).', 4.50, 190, 1, 0, 1),
(39, 4, 14, 'Baked Falafel Bites - 5pcs', 'Delicious baked falafel bites served fresh.', 5.00, 230, 1, 1, 1),
(40, 4, 15, 'Mini Veggie Platter & Hummus', 'Fresh crunch: Celery, carrots, and cucumber.', 4.00, 160, 1, 1, 1),
(41, 5, 16, 'Classic Hummus', 'Smooth and creamy traditional hummus.', 1.00, 120, 1, 1, 1),
(42, 5, 17, 'Avocado Lime Crema', 'Creamy avocado with a hint of lime.', 1.00, 110, 1, 1, 1),
(43, 5, 18, 'Greek Yogurt Ranch', 'Creamy ranch dressing made with Greek yogurt.', 1.00, 90, 1, 0, 1),
(44, 5, 19, 'Spicy Sriracha Mayo', 'Spicy sriracha-infused mayonnaise.', 1.00, 180, 1, 1, 1),
(45, 5, 20, 'Peanut Satay Sauce', 'Rich and creamy peanut satay sauce.', 1.00, 200, 1, 1, 1),
(46, 6, 21, 'Green Glow Smoothie', 'Spinach, pineapple, cucumber, and coconut water.', 3.50, 120, 1, 1, 1),
(47, 6, 22, 'Iced Matcha Latte', 'Lightly sweetened matcha green tea with almond milk.', 3.00, 90, 1, 1, 1),
(48, 6, 23, 'Fruit-Infused Water', 'Freshly infused water with a choice of lemon-mint, strawberry-basil, or cucumber-lime.', 1.50, 0, 1, 1, 1),
(49, 6, 24, 'Berry Blast Smoothie', 'A creamy blend of strawberries, blueberries, and raspberries with almond milk.', 3.80, 140, 1, 1, 1),
(50, 6, 25, 'Citrus Cooler', 'A refreshing mix of orange juice, sparkling water, and a hint of lime.', 3.00, 90, 1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `order_status_id` (`order_status_id`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`order_status_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `image_id` (`image_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `order_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`);

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
