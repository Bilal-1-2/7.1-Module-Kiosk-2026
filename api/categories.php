<?php
require_once 'config.php';
require_once 'helpers.php';

$method = getRequestMethod();

if ($method === 'GET') {
    // Get single category with all products
    if (isset($_GET['id'])) {
        $id = sanitizeInput($_GET['id']);

        try {
            // Get category
            $query = "SELECT * FROM categories WHERE category_id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $category = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$category) {
                sendError("Category not found", 404);
            }

            // Get all products in this category
            $query = "SELECT p.*, i.filename, i.description as image_description
                     FROM products p
                     LEFT JOIN images i ON p.image_id = i.image_id
                     WHERE p.category_id = :id AND p.available = 1
                     ORDER BY p.name ASC";

            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $category['products'] = $products;
            $category['product_count'] = count($products);

            sendResponse($category, 200, "Category retrieved successfully");
        } catch (PDOException $e) {
            sendError("Database error: " . $e->getMessage(), 500);
        }
    }

    // Get all categories with product count
    try {
        $query = "SELECT c.*, COUNT(p.product_id) as product_count
                 FROM categories c
                 LEFT JOIN products p ON c.category_id = p.category_id AND p.available = 1
                 GROUP BY c.category_id
                 ORDER BY c.category_id ASC";

        $stmt = $db->prepare($query);
        $stmt->execute();
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

        sendResponse(formatResponse($categories), 200, "All categories retrieved successfully");
    } catch (PDOException $e) {
        sendError("Database error: " . $e->getMessage(), 500);
    }
} else if ($method === 'POST') {
    sendError("POST method not allowed for categories", 405);
} else {
    sendError("Method not allowed", 405);
}
?>