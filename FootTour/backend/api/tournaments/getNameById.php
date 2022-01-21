<?php
include_once("../connect.php");
include_once("../../controllers/header.php");
include_once("../../controllers/auth.php");
include_once("../../controllers/tournamentController.php");

$auth = new Auth();
$tc = new TournamentController();

if($auth->authorize() != null){
$id = json_decode(file_get_contents("php://input"))->id;
echo $id;
echo json_encode($tc->getNameById($conn, $id));
}
else{
    http_response_code(401);
}

?>