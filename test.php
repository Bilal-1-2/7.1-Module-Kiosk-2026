<?php
include './assets/inculdes/connectie.php';
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>


</head>

<body>
    <?php


    $sql = "SELECT * FROM `images`";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // Output data of each row
        while ($row = $result->fetch_assoc()) {
            echo "<p>id: " . $row["image_id"] . " - Name: " . $row["filename"] . " - Path: " . $row["description"] . "</p>";
            // echo '<img src="' . $row["filename"] . '" alt="' . $row["description"] . '">';
        }
    } else {
        echo "0 results";
    }

    ?>


</body>

</html>