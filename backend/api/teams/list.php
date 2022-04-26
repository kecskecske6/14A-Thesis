<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    include_once "../../controllers/teamController.php";
    include_once "../../classes/team.php";

    $tc = new TeamController();
    $team = new Team();
    $db = new DB();
    $conn = $db->getConnection();
    
    if (isset($_GET)) {
        if (isset($_GET["tournamentId"])) {
        echo json_encode($tc->getTeamsByTournamentId($conn, $_GET["tournamentId"]));
        }
        else{
            http_response_code(400);
        }
    }
?>