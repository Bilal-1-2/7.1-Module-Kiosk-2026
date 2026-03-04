# Kiosk API Implementation Plan

## Project: Build REST API for Kiosk System

**Start Date:** February 25, 2026  
**Environment:** Local XAMPP (Apache + MySQL)  
**Technology Stack:** PHP 8.2.12 + MySQL (PDO)

---

## Detailed Task Breakdown

### ✅ Task 1: Database Setup (Completed)

- [x] SQL schema created in `kiosk_db.sql`
- [x] Database class created in `api.php`
- [ ] **TODO:** Import SQL into MySQL via phpMyAdmin

### 🔄 Task 2: Create API Configuration (In Progress)

- [ ] Create `config.php` - centralized config file
- [ ] Move Database class to config.php
- [ ] Add helper functions for responses
- [ ] Add CORS headers setup
- [ ] Add error handling utilities

### 📋 Task 3: Build Products API Endpoints

**File:** `api/products.php`

**Endpoints to create:**

```
GET  /api/products.php               - Get all products
GET  /api/products.php?id=1          - Get single product
GET  /api/products.php?category=1    - Get products by category
GET  /api/products.php?vegan=1       - Get vegan products only
GET  /api/products.php?vegetarian=1  - Get vegetarian products
```

**Features:**

- Return JSON format
- Include related image data
- Handle invalid requests
- Add pagination (optional)

### 📋 Task 4: Build Categories API Endpoints

**File:** `api/categories.php`

**Endpoints to create:**

```
GET  /api/categories.php             - Get all categories
GET  /api/categories.php?id=1        - Get single category with products
```

**Features:**

- Return category with product count
- Include all products in category
- JSON response format

### 📋 Task 5: Build Orders API Endpoints

**File:** `api/orders.php`

**Endpoints to create:**

```
GET  /api/orders.php                 - Get all orders
GET  /api/orders.php?id=1            - Get specific order with items
POST /api/orders.php                 - Create new order
PUT  /api/orders.php?id=1            - Update order status
```

**Features:**

- Validate order data
- Calculate total price
- Track pickup number
- Handle order status transitions
- Return detailed order info with products

### 📋 Task 6: Create Helper Functions

**File:** `api/helpers.php`

**Functions:**

- `sendResponse($data, $statusCode)` - Unified JSON responses
- `sendError($message, $statusCode)` - Error responses
- `validateInput($data, $required)` - Input validation
- `getDatabase()` - Quick DB connection access

### 📋 Task 7: Testing Phase

**Method:** Manual testing with REST client

**Test Cases:**

- [ ] Test all 10+ API endpoints
- [ ] Verify JSON response format
- [ ] Test error scenarios
- [ ] Verify HTTP status codes
- [ ] Test data validation

### 📋 Task 8: Frontend Integration

**Tasks:**

- [ ] Update JavaScript to call API endpoints
- [ ] Handle async responses
- [ ] Display errors to user
- [ ] Update product listings
- [ ] Process orders through API

### 📋 Task 9: Security Hardening

**Tasks:**

- [ ] Add input sanitization
- [ ] Prepare prepared statements (already using PDO)
- [ ] Add CORS headers
- [ ] Add request rate limiting (optional)
- [ ] Validate API requests

### 📋 Task 10: Documentation

**Tasks:**

- [ ] Document all endpoints
- [ ] Create API request/response examples
- [ ] Write integration guide for frontend devs

---

## Database Tables Reference

### categories

```sql
- category_id (INT, PK)
- name (VARCHAR)
- description (TEXT)
```

### products

```sql
- product_id (INT, PK)
- category_id (INT, FK)
- image_id (INT, FK)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- kcal (INT)
- available (TINYINT)
- is_vegan (TINYINT)
- is_vegetarian (TINYINT)
```

### orders

```sql
- order_id (INT, PK)
- order_status_id (INT, FK)
- pickup_number (VARCHAR)
- price_total (DECIMAL)
- datetime (DATETIME)
```

### order_product

```sql
- order_id (INT, FK)
- product_id (INT, FK)
- price (DECIMAL)
```

### order_status

```sql
- order_status_id (INT, PK)
- description (VARCHAR)
```

### images

```sql
- image_id (INT, PK)
- filename (VARCHAR)
- description (TEXT)
```

---

## API Response Format Examples

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message here",
  "code": 400
}
```

---

## Dependencies & Requirements

- PHP 8.2.12+ (Already available)
- MySQL 10.4.32+ (Already available)
- PDO MySQL driver (Already available)
- XAMPP running with Apache & MySQL
- cURL or REST client for testing (Postman recommended)

---

## Estimated Timeline

| Task                 | Duration         | Status      |
| -------------------- | ---------------- | ----------- |
| Database Setup       | 30 min           | Pending     |
| Config & Helpers     | 1 hour           | Not Started |
| Products Endpoint    | 1.5 hours        | Not Started |
| Categories Endpoint  | 45 min           | Not Started |
| Orders Endpoint      | 2 hours          | Not Started |
| Testing              | 1.5 hours        | Not Started |
| Frontend Integration | 2-3 hours        | Not Started |
| Security Review      | 1 hour           | Not Started |
| **TOTAL**            | **~10-11 hours** | -           |

---

## Success Criteria

- ✅ All database tables created and populated
- ✅ All API endpoints functional and tested
- ✅ Proper error handling implemented
- ✅ Frontend successfully integrates with API
- ✅ No SQL injection vulnerabilities
- ✅ Clean, documented code

---

## Notes

- Start with database import and testing
- Build one endpoint at a time
- Test after each endpoint
- Use consistent response format across all endpoints
- Consider pagination for large datasets in the future
