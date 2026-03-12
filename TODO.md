# TODO Steps for Database Charset Update

## Step 1: Update api/config.php ✓

- Added PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4" to options array.

## Step 2: Verify no other connections need charset.

## Step 3: Test database connections.

## Step 4: (Optional) Investigate test_db.html button issue.
