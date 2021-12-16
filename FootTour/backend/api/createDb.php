<?php
    if ($conn->query("DROP DATABASE IF EXISTS foottour") !== TRUE)
        die($conn->error);
    $file = explode(";", file_get_contents("../init.sql"));
    $i = 0;
    foreach ($file as $key => $value) {
        if ($i != 0 and $i != count($file) - 1) {
            if ($conn->query($value . ";") !== TRUE)
                die($conn->error);
        }
        ++$i;
    }
    $conn->close();
?>