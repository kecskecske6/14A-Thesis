<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    include_once "../../controllers/userController.php";
    include_once "../../classes/user.php";

    $uc = new UserController();
    $user = new User();
    $db = new DB();
    $conn = $db->getConnection();


    if (isset($_GET)) {
        if (isset($_GET["id"])) {
            echo json_encode($uc->getTypeOfTheUser($conn, $_GET["id"]));
        }
    } else {
        http_response_code(405);
    }
?>