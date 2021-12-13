<?php
    /*set_time_limit(0);
    $sql = explode(";", file_get_contents("../init.sql"));
    foreach ($sql as $key => $value) {
        if ($conn->query(trim($value) . ";") === TRUE) {
            echo "Database created successfully";
        } else {
            echo "Error creating database " . $conn->error;
        }
    }*/
    $sql = "DROP database if exists foottour";
    if ($conn->query($sql) === true) {
        echo "Database created successfully";
    } else {
        echo "Error creating database " . $conn->error;
    }
?>