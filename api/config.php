<?php
// Set response header to JSON
header("Content-Type: application/json; charset=UTF-8");

// Database Configuration Class
class Database
{
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function getConnection()
    {
        $this->conn = null;

        // Auto-detect environment
        $hostname = $_SERVER['HTTP_HOST'] ?? '';

        if (strpos($hostname, 'localhost') !== false || strpos($hostname, '127.0.0.1') !== false) {
            // Local development (XAMPP)
            $this->host = "localhost";
            $this->db_name = "kiosk_db";
            $this->username = "root";
            $this->password = "";
        } else {
            // Live server - UPDATE THESE with your actual hosting credentials
            $this->host = "localhost";  // Usually 'localhost' on shared hosting
            $this->db_name = "u240653_kiosk_db";  // Check your hosting panel for correct name
            $this->username = "u240653_kiosk_db";  // Check your hosting panel
            $this->password = "D5zTjmaNYmX7sG8SVfsC";  // YOUR DATABASE PASSWORD
        }

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "error" => "Database Connection Error: " . $exception->getMessage()
            ]);
            exit();
        }

        return $this->conn;
    }
}

// Initialize database connection
$database = new Database();
$db = $database->getConnection();
?>