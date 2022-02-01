<?php

include_once "../connect.php";
include_once "../../controllers/eventController.php";
include_once "../../controllers/auth.php";
include_once "../../controllers/header.php";

$auth = new Auth();
$ec = new EventController();


if($auth->authorize() != null){
    echo ("alma");
    $postdata = json_decode(file_get_contents("php://input"));
    if($ec->createEvents($conn, $postdata)){
        http_response_code(200);
        echo json_encode(array("message" => "Sikeres"));
    }
    else{
        http_response_code(404);
        echo json_encode(array("message" => "Sikertelen"));
    }
    
}
else{
    http_response_code(401);
}

?>