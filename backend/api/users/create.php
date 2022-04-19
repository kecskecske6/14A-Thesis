<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    include_once "../../controllers/userController.php";
    include_once "../../classes/user.php";

    $uc = new UserController();
    $user = new User();
    $db = new DB();
    $conn = $db->getConnection();

    $postdata = json_decode(file_get_contents("php://input"));
    echo json_encode($uc->register($conn, $postdata));
?>