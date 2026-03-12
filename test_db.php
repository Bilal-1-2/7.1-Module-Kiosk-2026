<?php
require_once 'api/config.php';

if ($db) {
    echo "Database connected successfully!";
} else {
    echo "Database connection failed!";
}
?>