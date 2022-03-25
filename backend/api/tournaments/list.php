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
        if(isset($_GET)){
        if (isset($_GET["id"])) {
            echo json_encode($tc->getById($conn, $_GET["id"], $tournament));
        }
        elseif(isset($_GET["userId"])){
            echo json_encode($tc->getByOrganizerId($conn, $_GET["userId"]));
        }
        elseif(isset($_GET["name"])){
            echo json_encode($tc->getTournamentByName($conn, $_GET["name"]));
        }
        elseif(isset($_GET["parameter"])){
            echo json_encode($tc->getBySearchParameter($conn, $_GET["parameter"]));
        }
        elseif(isset($_GET["county"]) && isset($_GET["min"]) && isset($_GET["max"])){
            echo json_encode($tc->getByFilters($conn, $_GET["county"], $_GET["min"], $_GET["max"]));
        }
        else{
            echo json_encode($tc->getAll($conn));
        }
    }else{
        http_response_code(405);
    }
    }
    else{
        http_response_code(401);
    }
?>