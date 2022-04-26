<?php
include_once "../connect.php";
include_once "../../controllers/header.php";
include_once "../../controllers/playerController.php";

$pc = new PlayerController();
$db = new DB();
$conn = $db->getConnection();

    if (isset($_GET)) {
        if (isset($_GET["tournamentId"])) {
            echo json_encode($pc->getByTournamentId($conn, $_GET["tournamentId"]));
        }
    } else http_response_code(405);