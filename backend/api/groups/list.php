<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    include_once "../../controllers/groupController.php";
    include_once "../../classes/group.php";

    $gc = new GroupController();
    $group = new Group();
    $db = new DB();
    $conn = $db->getConnection();
        if (isset($_GET)) {
            if (isset($_GET["tournamentId"]) and isset($_GET["type"])) {
                echo json_encode($gc->getByType($conn, $_GET["tournamentId"], $_GET["type"]));
            }
            else if (isset($_GET["tournamentId"])) {
                echo json_encode($gc->getByTournamentId($conn, $_GET["tournamentId"]));
            } else {
                http_response_code(400);
            }
        }
?>