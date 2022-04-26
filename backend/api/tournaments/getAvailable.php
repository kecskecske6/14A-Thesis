<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    include_once "../../controllers/tournamentController.php";
    include_once "../../controllers/userController.php";
    include_once "../../classes/tournament.php";

    $tc = new TournamentController();
    $uc = new UserController();
    $tournament = new Tournament();
    $db = new DB();
    $conn = $db->getConnection();

    echo json_encode($tc->getAvailable($conn, $uc));
?>