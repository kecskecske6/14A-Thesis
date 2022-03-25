<?php
    include_once "connect.php";
    
    $db = new DB();
    $conn = $db->getConnection();

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Request-Method: POST");
    header("Access-Control-Allow-Headers: *");
    $content = json_decode(file_get_contents("php://input"));
    $password = password_hash($content->password, PASSWORD_DEFAULT);
    $sql = "INSERT into foottour.users (name, email, password, isDeleted, isOrganizer, isReferee, isLeader) values ('" . $content->name . "', '" . $content->email . "', '" . $password . "', false, false, false, false);";
    $result = $conn->query($sql);
    if ($result !== TRUE) die($conn->error);
    $sql = "SELECT last_insert_id();";
    $result = $conn->query($sql);
    $user = [
        'id' => $result,
        'email' => $content->email,
        'password' => $password,
        'name' => $content->name,
        'isDeleted' => false,
        'isOrganizer' => false,
        'isReferee' => false,
        'isLeader' => false,
    ];
    echo json_encode($user);
    $conn->close();
?>