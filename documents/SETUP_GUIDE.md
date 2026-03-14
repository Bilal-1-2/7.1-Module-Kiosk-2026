# Kiosk API Setup Guide

## Overview

This guide will help you set up a fully functional REST API for your Kiosk application using your local XAMPP server and MySQL database.

---

## Phase 1: Database Setup

### Step 1.1: Start XAMPP Services

- Open XAMPP Control Panel
- Start **Apache** server
- Start **MySQL** server
- Verify both show green status

### Step 1.2: Import Database

- Open phpMyAdmin (http://localhost/phpmyadmin)
- Create a new database named `kiosk_db`
- Import the `kiosk_db.sql` file
- Verify all tables are created:
  - `categories`
  - `images`
  - `products`
  - `orders`
  - `order_product`
  - `order_status`

### Step 1.3: Verify Connection

- Test the Database class connection by creating a test file
- Ensure PDO connection works properly

---

## Phase 2: API Development

### Step 2.1: Create Core API Structure

Create these endpoint files in the `/api` folder:

- `products.php` - GET/POST products
- `categories.php` - GET categories
- `orders.php` - GET/POST/PUT orders
- `config.php` - Configuration and Database class

### Step 2.2: Implement Products Endpoint

Features:

- GET all products
- GET products by category
- GET single product by ID
- Filter by availability, vegan, vegetarian status

### Step 2.3: Implement Categories Endpoint

Features:

- GET all categories
- GET category with all products

### Step 2.4: Implement Orders Endpoint

Features:

- GET all orders
- GET order by ID
- POST new order
- PUT update order status
- GET order details with products

---

## Phase 3: Testing & Integration

### Step 3.1: Test with Postman or cURL

- Test each endpoint
- Verify response formats (JSON)
- Test error handling

### Step 3.2: Frontend Integration

- Connect your HTML/JavaScript to the API
- Handle API responses in your front-end code

### Step 3.3: Error Handling

- Implement proper HTTP status codes
- Add validation for input data
- Error response formats

---

## Phase 4: Security & Optimization

### Step 4.1: Input Validation

- Sanitize and validate all inputs
- Prevent SQL injection

### Step 4.2: CORS Headers

- Add CORS headers if frontend is on different origin
- Allow proper cross-origin requests

### Step 4.3: Performance

- Add proper database indexing
- Optimize queries
- Consider caching strategies

---

## File Structure (Target)

```
api/
├── config.php          (Database connection class)
├── api.php             (Database class definition)
├── products.php        (Products endpoints)
├── categories.php      (Categories endpoints)
├── orders.php          (Orders endpoints)
├── kiosk_db.sql        (Database schema)
└── helpers.php         (Utility functions)
```

---

## Quick Access Links

- phpMyAdmin: http://localhost/phpmyadmin
- API Base URL: http://localhost/7.1-Module-Kiosk-2026/api/

---

## Testing Checklist

- [ ] Database imported successfully
- [ ] Database connection test passes
- [ ] Products endpoint works
- [ ] Categories endpoint works
- [ ] Orders endpoint works
- [ ] Error handling works
- [ ] Frontend integration complete
