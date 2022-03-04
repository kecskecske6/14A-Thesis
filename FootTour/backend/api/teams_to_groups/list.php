<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    include_once "../../controllers/auth.php";
    include_once "../../controllers/teamstoGroupsController.php";
    include_once "../../classes/teamstoGroups.php";

    $ttgc = new TeamstoGroupsController();
    $teamstoGroups = new TeamstoGroups();
    $auth = new Auth();
    $db = new DB();
    $conn = $db->getConnection();
    if($auth->authorize() != null){
        if (isset($_GET)) {
            if (isset($_GET["tournamentId"])) {
            echo json_encode($ttgc->getByTournamentId($conn, $_GET["tournamentId"]));
        }
        else{
            http_response_code(400);
        }
    }
    else{
        http_response_code(401);
    }
}
?>