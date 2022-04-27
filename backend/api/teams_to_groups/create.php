<?php
include_once("../../controllers/auth.php");
include_once("../../controllers/header.php");
include_once("../../controllers/teamstoGroupsController.php");
include_once("../connect.php");

$auth = new Auth();
$ttgc = new TeamstoGroupsController();
$db = new DB();
$conn = $db->getConnection();

if($auth->authorize() == "organizer"){
    $postdata = json_decode(file_get_contents("php://input"));
    echo json_encode($ttgc->createGroup($conn, $postdata));
}
else{
    http_response_code(401);
}

?>