<?php
include_once "../connect.php";
include_once "../../controllers/matchController.php";
include_once "../../controllers/auth.php";
include_once "../../controllers/header.php";

$auth = new Auth();
$mc = new MatchController();
$db = new DB();
$conn = $db->getConnection();

if($auth->authorize() != null){
    echo json_encode($mc->getByTournamentId($conn, $_GET['tournamentId']));
}
else{
    http_response_code(401);
}
?>