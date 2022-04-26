<?php
include_once("../connect.php");
include_once("../../controllers/header.php");
include_once("../../controllers/tournamentController.php");

$tc = new TournamentController();
$db = new DB();
$conn = $db->getConnection();

$id = json_decode(file_get_contents("php://input"))->id;
echo json_encode($tc->getNameById($conn, $id));

?>