<?php

/**
 * Send a successful JSON response
 * 
 * @param array $data The data to return
 * @param int $statusCode HTTP status code (default: 200)
 * @param string $message Optional success message
 */
function sendResponse($data, $statusCode = 200, $message = "Success")
{
    http_response_code($statusCode);
    echo json_encode([
        "success" => true,
        "message" => $message,
        "data" => $data
    ]);
    exit();
}

/**
 * Send an error JSON response
 * 
 * @param string $message Error message
 * @param int $statusCode HTTP status code (default: 400)
 */
function sendError($message, $statusCode = 400)
{
    http_response_code($statusCode);
    echo json_encode([
        "success" => false,
        "error" => $message,
        "code" => $statusCode
    ]);
    exit();
}

/**
 * Validate required input fields
 * 
 * @param array $data Input data to validate
 * @param array $required Array of required field names
 * @return bool True if all required fields present
 */
function validateInput($data, $required)
{
    foreach ($required as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            sendError("Missing required field: " . $field, 400);
        }
    }
    return true;
}

/**
 * Sanitize input string
 * 
 * @param string $input The input to sanitize
 * @return string Sanitized input
 */
function sanitizeInput($input)
{
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Get request method (GET, POST, PUT, DELETE)
 * 
 * @return string Request method
 */
function getRequestMethod()
{
    return $_SERVER['REQUEST_METHOD'];
}

/**
 * Get query parameter
 * 
 * @param string $name Parameter name
 * @param mixed $default Default value if not found
 * @return mixed Parameter value or default
 */
function getQueryParam($name, $default = null)
{
    return $_GET[$name] ?? $default;
}

/**
 * Get request body as JSON/array
 * 
 * @return array Parsed request body
 */
function getRequestBody()
{
    $json = file_get_contents("php://input");
    return json_decode($json, true) ?? [];
}

/**
 * Format database response for API
 * 
 * @param array $items Array of items
 * @param int $total Total count (for pagination)
 * @return array Formatted response
 */
function formatResponse($items, $total = null)
{
    return [
        "items" => $items,
        "count" => count($items),
        "total" => $total ?? count($items)
    ];
}

/**
 * Check if string is valid JSON
 * 
 * @param string $string String to check
 * @return bool True if valid JSON
 */
function isValidJSON($string)
{
    json_decode($string);
    return json_last_error() === JSON_ERROR_NONE;
}

?>