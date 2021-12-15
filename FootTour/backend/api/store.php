<?php
    include_once "connect.php";
    $sql = "INSERT into foottour.users (name, email, password, is_deleted, is_organizer, is_referee, is_leader) values ('Kis Pista', " . $_POST["email"] . ", " . $_POST["password"] . "false, false, false, false);";
    $result = $conn->query($sql);
    if ($result !== TRUE) die($conn->error);
    $conn->close();
?>