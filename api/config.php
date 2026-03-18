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
            // Live server
            $this->host = "localhost";
            $this->db_name = "u240653_kiosk_db";
            $this->username = "u240653_kiosk_db";
            $this->password = "D5zTjmaNYmX7sG8SVfsC";
        }

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
                )
            );
        } catch (PDOException $exception) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "error" => "Database Connection Error: " . $exception->getMessage(),
                "file" => $exception->getFile(),
                "line" => $exception->getLine()
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