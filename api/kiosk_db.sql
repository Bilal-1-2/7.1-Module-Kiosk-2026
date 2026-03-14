-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2026 at 08:21 PM
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
  `description` text DEFAULT NULL,
  `categoryfilename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`, `categoryfilename`) VALUES
(1, 'Breakfast', 'Start your day with our healthy and delicious breakfast options', 'assets\\images\\menu\\category fotos\\breakfast.png'),
(2, 'Lunch & Dinner', 'Hearty and nutritious bowls for any time of day', 'assets\\images\\menu\\category fotos\\lunch-dinner.png'),
(3, 'Handhelds\r\n(Wraps & Sandwiches)', 'Perfect handheld meals for on-the-go', 'assets\\images\\menu\\category fotos\\handhelds.png'),
(4, 'Sides & Small Plates', 'Delicious sides to complement your meal', 'assets\\images\\menu\\category fotos\\sides.png'),
(5, 'Signature Dips', 'House-made dips to elevate any dish', 'assets\\images\\menu\\category fotos\\dips.png'),
(6, 'Drinks', 'Refreshing beverages and smoothies', 'assets\\images\\menu\\category fotos\\drinks.png');

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
(1, 'assets/images/menu/Breakfast/Morning-Boost-Acai-Bowl.png', 'Morning Boost Açaí Bowl'),
(2, 'assets/images/menu/Breakfast/The-Garden-Breakfast-Wrap.png', 'The Garden Breakfast Wrap'),
(3, 'assets/images/menu/Breakfast/Peanut-Butter-Cacao-Toast.png', 'Peanut Butter & Cacao Toast'),
(4, 'assets/images/menu/Breakfast/Overnight-Oats-Apple-Pie-Style.png', 'Overnight Oats: Apple Pie Style'),
(5, 'assets/images/menu/Lunch & Dinner/Tofu-Power-Tahini-Bowl.png', 'Tofu Power Tahini Bowl'),
(6, 'assets/images/menu/Lunch & Dinner/The-Supergreen-Harvest.png', 'The Supergreen Harvest'),
(7, 'assets/images/menu/Lunch & Dinner/Mediterranean-Falafel-Bowl.png', 'Mediterranean Falafel Bowl'),
(8, 'assets/images/menu/Lunch & Dinner/Warm-Teriyaki-Tempeh-Bowl.png', 'Warm Teriyaki Tempeh Bowl'),
(9, 'assets/images/menu/Handhelds (Wraps & Sandwiches)/Zesty-Chickpea-Hummus-Wrap.png', 'Zesty Chickpea Hummus Wrap'),
(10, 'assets/images/menu/Handhelds (Wraps & Sandwiches)/Avocado-Halloumi-Toastie.png', 'Avocado & Halloumi Toastie'),
(11, 'assets/images/menu/Handhelds (Wraps & Sandwiches)/Smoky-BBQ-Jackfruit-Slider.png', 'Smoky BBQ Jackfruit Slider'),
(12, 'assets/images/menu/Sides & Small Plates/Oven-Baked-Sweet-Potato-Wedges.png', 'Oven-Baked Sweet Potato Wedges'),
(13, 'assets/images/menu/Sides & Small Plates/Zucchini-Fries.png', 'Zucchini Fries'),
(14, 'assets/images/menu/Sides & Small Plates/Baked-Falafel-Bites-5pcs.png', 'Baked Falafel Bites - 5pcs'),
(15, 'assets/images/menu/Sides & Small Plates/Mini-Veggie-Platter-Hummus.png', 'Mini Veggie Platter & Hummus'),
(16, 'assets/images/menu/Signature Dips/Classic-Hummus.png', 'Classic Hummus'),
(17, 'assets/images/menu/Signature Dips/Avocado-Lime-Crema.png', 'Avocado Lime Crema'),
(18, 'assets/images/menu/Signature Dips/Greek-Yogurt-Ranch.png', 'Greek Yogurt Ranch'),
(19, 'assets/images/menu/Signature Dips/Spicy-Sriracha-Mayo.png', 'Spicy Sriracha Mayo'),
(20, 'assets/images/menu/Signature Dips/Peanut-Satay-Sauce.png', 'Peanut Satay Sauce'),
(21, 'assets/images/menu/Drinks/Green-Glow-Smoothie.webp', 'Green Glow Smoothie'),
(22, 'assets/images/menu/Drinks/Iced-Matcha-Latte.webp', 'Iced Matcha Latte'),
(23, 'assets/images/menu/Drinks/Fruit-Infused-Water.webp', 'Fruit-Infused Water'),
(24, 'assets/images/menu/Drinks/Berry-Blast-Smoothie.webp', 'Berry Blast Smoothie'),
(25, 'assets/images/menu/Drinks/Citrus-Cooler.webp', 'Citrus Cooler');

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

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_status_id`, `pickup_number`, `price_total`, `datetime`) VALUES
(3, 2, '20', 22.00, '2026-03-12 03:24:30'),
(4, 2, '57', 18.50, '2026-03-12 03:24:41'),
(6, 2, '99', 21.00, '2026-03-12 03:26:12'),
(7, 2, '90', 18.50, '2026-03-12 03:28:10'),
(8, 2, '40', 5.00, '2026-03-12 03:28:35'),
(9, 2, '12', 14.00, '2026-03-12 03:31:24'),
(10, 2, '12', 14.00, '2026-03-12 03:31:25'),
(11, 2, '12', 14.00, '2026-03-12 03:31:26'),
(12, 2, '12', 14.00, '2026-03-12 03:31:26'),
(13, 2, '12', 14.00, '2026-03-12 03:31:27'),
(14, 2, '12', 14.00, '2026-03-12 03:31:27'),
(15, 2, '12', 14.00, '2026-03-12 03:31:28'),
(16, 2, '12', 14.00, '2026-03-12 03:31:28'),
(17, 2, '12', 14.00, '2026-03-12 03:31:28'),
(18, 2, '12', 14.00, '2026-03-12 03:31:29'),
(19, 2, '12', 14.00, '2026-03-12 03:31:29'),
(20, 2, '12', 14.00, '2026-03-12 03:31:32'),
(21, 2, '12', 14.00, '2026-03-12 03:31:33'),
(22, 2, '12', 14.00, '2026-03-12 03:31:34'),
(23, 2, '12', 14.00, '2026-03-12 03:31:34'),
(24, 2, '12', 14.00, '2026-03-12 03:31:35'),
(25, 2, '12', 14.00, '2026-03-12 03:31:36'),
(26, 2, '12', 14.00, '2026-03-12 03:31:36'),
(27, 2, '12', 14.00, '2026-03-12 03:31:37'),
(28, 2, '12', 14.00, '2026-03-12 03:31:38'),
(29, 2, '12', 14.00, '2026-03-12 03:31:38'),
(30, 2, '12', 14.00, '2026-03-12 03:31:39'),
(31, 2, '12', 14.00, '2026-03-12 03:31:40'),
(32, 2, '12', 14.00, '2026-03-12 03:31:41'),
(34, 2, '72', 10.00, '2026-03-12 03:36:58'),
(35, 2, '19', 10.00, '2026-03-12 03:38:31'),
(36, 2, '91', 9.00, '2026-03-12 03:38:55'),
(37, 2, '24', 25.00, '2026-03-12 03:44:51'),
(38, 2, '68', 10.00, '2026-03-12 03:49:05'),
(39, 2, '57', 5.00, '2026-03-12 03:49:16'),
(40, 2, '12', 10.00, '2026-03-12 03:50:33'),
(41, 2, '66', 10.50, '2026-03-12 03:51:32'),
(42, 2, '12', 14.00, '2026-03-12 04:01:07'),
(43, 2, '12', 14.00, '2026-03-12 04:01:09'),
(44, 2, '12', 14.00, '2026-03-12 04:04:10'),
(45, 2, '13', 9.50, '2026-03-12 04:04:17'),
(46, 2, '12', 14.00, '2026-03-12 04:06:19'),
(47, 2, '94', 10.00, '2026-03-12 04:06:35'),
(48, 2, '17', 5.50, '2026-03-12 04:07:45'),
(49, 2, '12', 11.00, '2026-03-12 04:08:00'),
(53, 2, '40', 14.50, '2026-03-14 14:19:50'),
(54, 2, '89', 30.50, '2026-03-14 14:24:35'),
(55, 2, '47', 21.00, '2026-03-14 14:32:39'),
(56, 2, '49', 24.00, '2026-03-14 14:39:36'),
(57, 2, '38', 17.50, '2026-03-14 14:41:18'),
(58, 2, '56', 11.00, '2026-03-14 14:42:24');

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
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

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
