<?php
include_once "../connect.php";
include_once "../../controllers/matchController.php";
include_once "../../controllers/auth.php";
include_once "../../classes/match.php";
include_once "../../classes/player.php";
include_once "../../controllers/header.php";
include_once "../../controllers/userController.php";
include_once "../../controllers/tournamentController.php";

$auth = new Auth();
$player = new Player();
$match = new MatchClass();
$mc = new MatchController();
$uc = new UserController();
$tc = new TournamentController();

if($auth->authorize() != null){
    $mc->getById($conn, $_GET['matchId'], $match, $player, $uc, $tc);
}
?>