<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    include_once "../../controllers/auth.php";
    include_once "../../controllers/userController.php";
    include_once "../../classes/user.php";

    $auth = new Auth();
    $uc = new UserController();
    $user = new User();
    $db = new DB();
    $conn = $db->getConnection();


    if($auth->authorize() != null){
        if(isset($_GET)){
        if (isset($_GET["id"])) {
            echo json_encode($uc->getNameById($conn, $_GET["id"]));
        }
        elseif (isset($_GET["type"])) {
            echo json_encode($uc->getByType($conn, $_GET["type"]));
        }
    }else{
        $postdata = json_decode(file_get_contents("php://input"));
        echo json_encode($uc->register($conn, $postdata));
    }
    }
    else{
        http_response_code(401);
    }
?>