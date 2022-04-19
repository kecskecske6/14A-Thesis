<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    include_once "../../controllers/auth.php";
    include_once "../../controllers/tournamentController.php";
    include_once "../../classes/tournament.php";

    $auth = new Auth();
    $tc = new TournamentController();
    $tournament = new Tournament();
    $db = new DB();
    $conn = $db->getConnection();

    if($auth->authorize() != null){
        echo json_encode($tc->getAvailable($conn));
    }
    else{
        http_response_code(401);
    }
?>