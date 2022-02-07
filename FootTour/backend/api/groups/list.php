<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    include_once "../../controllers/auth.php";
    include_once "../../controllers/groupController.php";
    include_once "../../classes/group.php";

    $gc = new GroupController();
    $group = new Group();
    $auth = new Auth();
    if($auth->authorize() != null){
        if (isset($_GET)) {
            if (isset($_GET["tournamentId"])) {
            echo json_encode($gc->getByTournamentId($conn, $_GET["tournamentId"]));
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