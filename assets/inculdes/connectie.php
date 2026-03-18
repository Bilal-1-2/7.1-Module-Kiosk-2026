<?php
// Detect environment
if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN' || preg_match('/^192\.168\.2/', $_SERVER['SERVER_ADDR'])) {
    // Offline/local omgeving
    $servername = "localhost";
    $username = "root";
    $password = ""; // Default for XAMPP
    $dbname = "kiosk_db";
} else {
    // Online/production omgeving

    $servername = "localhost";
    $username = "u240653_kiosk_db";
    $password = "D5zTjmaNYmX7sG8SVfsC"; // Default for XAMPP
    $dbname = "u240653_kiosk_db";
}


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>