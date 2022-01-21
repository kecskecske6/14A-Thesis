<?php
include_once("../../controllers/auth.php");
include_once("../../controllers/header.php");
include_once("../../controllers/tournamentController.php");
include_once("../connect.php");

$auth = new Auth();
$tc = new TournamentController();

if($auth->authorize() != null){
    $postdata = json_decode(file_get_contents("php://input"));
    echo json_encode($tc->modifyTournament($conn, $postdata));
}
else{
    http_response_code(401);
}
?>