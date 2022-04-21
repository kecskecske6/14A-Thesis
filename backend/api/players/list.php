<?php
include_once "../connect.php";
include_once "../../controllers/header.php";
include_once "../../controllers/auth.php";
include_once "../../controllers/playerController.php";

$auth = new Auth();
$pc = new PlayerController();
$db = new DB();
$conn = $db->getConnection();

if ($auth->authorize() != null) {
    if (isset($_GET)) {
        if (isset($_GET["tournamentId"])) {
            echo json_encode($pc->getByTournamentId($conn, $_GET["tournamentId"]));
        }
    } else http_response_code(405);
} else http_response_code(401);
