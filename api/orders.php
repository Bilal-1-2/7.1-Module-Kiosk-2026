<?php
// CORS Headers - Must be at the very top before any output
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'config.php';
require_once 'helpers.php';

$method = getRequestMethod();

if ($method === 'GET') {
    // Get single order with products
    if (isset($_GET['id'])) {
        $id = sanitizeInput($_GET['id']);

        try {
            // Get order
            $query = "SELECT o.*, os.description as status_description
                     FROM orders o
                     LEFT JOIN order_status os ON o.order_status_id = os.order_status_id
                     WHERE o.order_id = :id";

            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $order = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$order) {
                sendError("Order not found", 404);
            }

            // Get order products
            $query = "SELECT op.product_id, op.price, p.name, p.description, i.filename
                     FROM order_product op
                     JOIN products p ON op.product_id = p.product_id
                     LEFT JOIN images i ON p.image_id = i.image_id
                     WHERE op.order_id = :order_id";

            $stmt = $db->prepare($query);
            $stmt->bindParam(':order_id', $id);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $order['products'] = $products;
            $order['product_count'] = count($products);

            sendResponse($order, 200, "Order retrieved successfully");
        } catch (PDOException $e) {
            sendError("Database error: " . $e->getMessage(), 500);
        }
    } else {
        // Get all orders
        try {
            $query = "SELECT o.*, os.description as status_description, COUNT(op.product_id) as product_count
                     FROM orders o
                     LEFT JOIN order_status os ON o.order_status_id = os.order_status_id
                     LEFT JOIN order_product op ON o.order_id = op.order_id
                     GROUP BY o.order_id
                     ORDER BY o.datetime DESC";

            $stmt = $db->prepare($query);
            $stmt->execute();
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

            sendResponse(formatResponse($orders), 200, "All orders retrieved successfully");
        } catch (PDOException $e) {
            sendError("Database error: " . $e->getMessage(), 500);
        }
    }
} else if ($method === 'POST') {
    // Create new order
    $data = getRequestBody();

    try {
        // Validate required fields
        validateInput($data, ['products', 'pickup_number']);

        // Validate products array
        if (!is_array($data['products']) || empty($data['products'])) {
            sendError("Products must be a non-empty array", 400);
        }

        $pickup_number = sanitizeInput($data['pickup_number']);

        // Calculate total price and group products
        $total_price = 0;
        $product_quantities = [];
        $product_prices = [];

        // Count quantities of each product
        foreach ($data['products'] as $product_id) {
            $product_id = intval($product_id);
            if (!isset($product_quantities[$product_id])) {
                $product_quantities[$product_id] = 0;
            }
            $product_quantities[$product_id]++;
        }

        // Validate each product and calculate total
        foreach ($product_quantities as $product_id => $quantity) {
            $query = "SELECT price FROM products WHERE product_id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $product_id, PDO::PARAM_INT);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$product) {
                sendError("Product with ID " . $product_id . " not found", 404);
            }

            $total_price += floatval($product['price']) * $quantity;
            $product_prices[$product_id] = floatval($product['price']);
        }

        // Start transaction
        $db->beginTransaction();

        // Insert order with status 2 (Placed and paid)
        $query = "INSERT INTO orders (order_status_id, pickup_number, price_total, datetime)
                 VALUES (:status_id, :pickup_number, :price_total, :datetime)";

        $stmt = $db->prepare($query);
        $datetime = date('Y-m-d H:i:s');
        $status_id = 2;

        $stmt->bindParam(':status_id', $status_id, PDO::PARAM_INT);
        $stmt->bindParam(':pickup_number', $pickup_number);
        $stmt->bindParam(':price_total', $total_price);
        $stmt->bindParam(':datetime', $datetime);
        $stmt->execute();

        $order_id = $db->lastInsertId();

        // Insert order products
        foreach ($product_quantities as $product_id => $quantity) {
            $price = $product_prices[$product_id];

            for ($i = 0; $i < $quantity; $i++) {
                $query = "INSERT INTO order_product (order_id, product_id, price)
                         VALUES (:order_id, :product_id, :price)";

                $stmt = $db->prepare($query);
                $stmt->bindParam(':order_id', $order_id, PDO::PARAM_INT);
                $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
                $stmt->bindParam(':price', $price);
                $stmt->execute();
            }
        }

        // Commit transaction
        $db->commit();

        // Return created order
        $query = "SELECT o.*, os.description as status_description
                 FROM orders o
                 LEFT JOIN order_status os ON o.order_status_id = os.order_status_id
                 WHERE o.order_id = :id";

        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $order_id, PDO::PARAM_INT);
        $stmt->execute();
        $order = $stmt->fetch(PDO::FETCH_ASSOC);

        // Get order products
        $query = "SELECT op.product_id, op.price, p.name, p.description, i.filename
                 FROM order_product op
                 JOIN products p ON op.product_id = p.product_id
                 LEFT JOIN images i ON p.image_id = i.image_id
                 WHERE op.order_id = :order_id";

        $stmt = $db->prepare($query);
        $stmt->bindParam(':order_id', $order_id, PDO::PARAM_INT);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $order['products'] = $products;
        $order['product_count'] = count($products);

        sendResponse($order, 201, "Order created successfully");

    } catch (PDOException $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        sendError("Database error: " . $e->getMessage(), 500);
    } catch (Exception $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        sendError("Error: " . $e->getMessage(), 500);
    }
} else if ($method === 'PUT') {
    // Update order status
    $data = getRequestBody();

    if (!isset($_GET['id'])) {
        sendError("Order ID is required", 400);
    }

    $order_id = sanitizeInput($_GET['id']);

    try {
        validateInput($data, ['order_status_id']);

        $status_id = (int) $data['order_status_id'];

        // Validate status exists
        $query = "SELECT * FROM order_status WHERE order_status_id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $status_id);
        $stmt->execute();

        if (!$stmt->fetch(PDO::FETCH_ASSOC)) {
            sendError("Invalid order status ID", 400);
        }

        // Update order
        $query = "UPDATE orders SET order_status_id = :status_id WHERE order_id = :order_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':status_id', $status_id);
        $stmt->bindParam(':order_id', $order_id);
        $stmt->execute();

        // Return updated order
        $query = "SELECT o.*, os.description as status_description
                 FROM orders o
                 LEFT JOIN order_status os ON o.order_status_id = os.order_status_id
                 WHERE o.order_id = :id";

        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $order_id);
        $stmt->execute();
        $order = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$order) {
            sendError("Order not found", 404);
        }

        sendResponse($order, 200, "Order status updated successfully");
    } catch (PDOException $e) {
        sendError("Database error: " . $e->getMessage(), 500);
    }
} else {
    sendError("Method not allowed", 405);
}
?>