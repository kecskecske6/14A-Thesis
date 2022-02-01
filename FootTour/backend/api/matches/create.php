<?php
include_once("../../controllers/auth.php");
include_once("../../controllers/header.php");
include_once("../../controllers/matchController.php");
include_once("../connect.php");

$auth = new Auth();
$mc = new MatchController();

if($auth->authorize() != null){
    $postdata = json_decode(file_get_contents("php://input"));
    echo json_encode($mc->createMatch($conn, $postdata));
}
else{
    http_response_code(401);
}

?>