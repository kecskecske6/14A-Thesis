<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    include_once "../../controllers/auth.php";
    include_once "../../controllers/teamController.php";
    include_once "../../classes/team.php";
    include_once "../../controllers/playerController.php";

    $tc = new TeamController();
    $pc = new PlayerController();
    $team = new Team();
    $auth = new Auth();
    $db = new DB();
    $conn = $db->getConnection();
    
    if($auth->authorize() != null){
        $postdata = json_decode(file_get_contents("php://input"));
        if(!isset($postdata->leaderId) || !isset($postdata->tournamentId) || !isset($postdata->players) || !isset($postdata->teamName)){
            http_response_code(400);
            echo json_encode(array("message" => "Bad JSON format!"));
        }
        else
        {
            if($tc->registerTeam($conn,$postdata,$pc)) echo json_encode(array("message" => "Sikeres regisztráció!"));
            else{
                http_response_code(500);
                echo json_encode(array("message" => "Unexpected error!"));
            }
        }
    }
    else{
        http_response_code(401);
    }
?>