<?php
require_once 'config.php';
require_once 'helpers.php';

$method = getRequestMethod();

if ($method === 'GET') {
    // Get single product by ID
    if (isset($_GET['id'])) {
        $id = sanitizeInput($_GET['id']);

        try {
            $query = "SELECT p.*, i.filename, i.description as image_description, c.name as category_name
                     FROM products p
                     LEFT JOIN images i ON p.image_id = i.image_id
                     LEFT JOIN categories c ON p.category_id = c.category_id
                     WHERE p.product_id = :id";

            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$product) {
                sendError("Product not found", 404);
            }

            sendResponse($product, 200, "Product retrieved successfully");
        } catch (PDOException $e) {
            sendError("Database error: " . $e->getMessage(), 500);
        }
    }

    // Get products by category
    if (isset($_GET['category'])) {
        $category = sanitizeInput($_GET['category']);

        try {
            $query = "SELECT p.*, i.filename, i.description as image_description, c.name as category_name
                     FROM products p
                     LEFT JOIN images i ON p.image_id = i.image_id
                     LEFT JOIN categories c ON p.category_id = c.category_id
                     WHERE p.category_id = :category AND p.available = 1
                     ORDER BY p.name ASC";

            $stmt = $db->prepare($query);
            $stmt->bindParam(':category', $category);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            sendResponse(formatResponse($products), 200, "Products retrieved successfully");
        } catch (PDOException $e) {
            sendError("Database error: " . $e->getMessage(), 500);
        }
    }

    // Get vegan products
    if (isset($_GET['vegan']) && $_GET['vegan'] == 1) {
        try {
            $query = "SELECT p.*, i.filename, i.description as image_description, c.name as category_name
                     FROM products p
                     LEFT JOIN images i ON p.image_id = i.image_id
                     LEFT JOIN categories c ON p.category_id = c.category_id
                     WHERE p.is_vegan = 1 AND p.available = 1
                     ORDER BY p.name ASC";

            $stmt = $db->prepare($query);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            sendResponse(formatResponse($products), 200, "Vegan products retrieved successfully");
        } catch (PDOException $e) {
            sendError("Database error: " . $e->getMessage(), 500);
        }
    }

    // Get vegetarian products
    if (isset($_GET['vegetarian']) && $_GET['vegetarian'] == 1) {
        try {
            $query = "SELECT p.*, i.filename, i.description as image_description, c.name as category_name
                     FROM products p
                     LEFT JOIN images i ON p.image_id = i.image_id
                     LEFT JOIN categories c ON p.category_id = c.category_id
                     WHERE p.is_vegetarian = 1 AND p.available = 1
                     ORDER BY p.name ASC";

            $stmt = $db->prepare($query);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            sendResponse(formatResponse($products), 200, "Vegetarian products retrieved successfully");
        } catch (PDOException $e) {
            sendError("Database error: " . $e->getMessage(), 500);
        }
    }

    // Get all available products
    try {
        $query = "SELECT p.*, i.filename, i.description as image_description, c.name as category_name
                 FROM products p
                 LEFT JOIN images i ON p.image_id = i.image_id
                 LEFT JOIN categories c ON p.category_id = c.category_id
                 WHERE p.available = 1
                 ORDER BY c.category_id ASC, p.name ASC";

        $stmt = $db->prepare($query);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        sendResponse(formatResponse($products), 200, "All products retrieved successfully");
    } catch (PDOException $e) {
        sendError("Database error: " . $e->getMessage(), 500);
    }
} else if ($method === 'POST') {
    sendError("POST method not allowed for products", 405);
} else {
    sendError("Method not allowed", 405);
}
?>