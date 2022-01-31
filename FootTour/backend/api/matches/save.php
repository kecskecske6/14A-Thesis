<?php

include_once "../connect.php";
include_once "../../controllers/matchController.php";
include_once "../../controllers/auth.php";
include_once "../../classes/match.php";
include_once "../../controllers/header.php";

$auth = new Auth();
$mc = new MatchController();


if($auth->authorize() != null){
    
    $postdata = json_decode(file_get_contents("php://input"));
    if($mc->saveMatch($conn, $postdata)){
        http_response_code(200);
        echo json_encode(array("message" => "Siekres"));
    }
    else{
        echo json_encode(array("message" => "Sikertelen"));
    }
    
}
else{
    http_response_code(401);
}

?>