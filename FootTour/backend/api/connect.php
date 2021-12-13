<?php
    $conn = new mysqli('localhost', 'root', '');

    if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

    $sql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'foottour'";

    if ($conn->query($sql) === TRUE) {
        echo "Connected successfully.";
    } else {
        include_once "createDb.php";
    }
?>