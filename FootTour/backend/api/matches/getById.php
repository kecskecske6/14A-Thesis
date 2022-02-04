<?php
include_once "../connect.php";
include_once "../../controllers/matchController.php";
include_once "../../controllers/auth.php";
include_once "../../classes/match.php";
include_once "../../classes/player.php";
include_once "../../controllers/header.php";
include_once "../../controllers/userController.php";
include_once "../../controllers/tournamentController.php";
include_once "../../controllers/eventController.php";
include_once "../../classes/event.php";

$auth = new Auth();
$player = new Player();
$match = new MatchClass();
$mc = new MatchController();
$uc = new UserController();
$tc = new TournamentController();
$ec = new eventController();
$db = new DB();
$conn = $db->getConnection();

if($auth->authorize() != null){
    echo json_encode($mc->getById($conn, $_GET['matchId'], $match, $uc, $tc, $ec));
}
else{
    http_response_code(401);
}
?>