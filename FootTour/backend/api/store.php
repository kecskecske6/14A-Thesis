<?php
    include_once "connect.php";
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Request-Method: POST");
    header("Access-Control-Allow-Headers: *");
    $content = json_decode(file_get_contents("php://input"));
    $sql = "INSERT into foottour.users (name, email, password, is_deleted, is_organizer, is_referee, is_leader) values ('Kis Pista', '" . $content->email . "', '" . $content->password . "', false, false, false, false);";
    $result = $conn->query($sql);
    if ($result !== TRUE) die($conn->error);
    $sql = "SELECT last_insert_id();";
    $result = $conn->query($sql);
    $user = [
        'id' => $result,
        'email' => $content->email,
        'password' => $content->password,
        'name' => 'Kis Pista',
        'isDeleted' => false,
        'isOrganizer' => false,
        'isReferee' => false,
        'isLeader' => false,
    ];
    echo json_encode($user);
    $conn->close();
?>