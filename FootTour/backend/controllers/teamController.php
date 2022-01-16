<?php
    include_once "header.php";
    include_once "../api/connect.php";
    include_once "../classes/team.php";
    include_once "auth.php";

    $auth = new Auth();

    if($auth->authorize() != null){
        $decoded = $auth->authorize();
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            if(isset($_REQUEST['tournamentId']))
                getByTournamentId($decoded, $conn);
            elseif(isset($_REQUEST['id']))
                getTeamById($decoded, $conn);
        }
        elseif($_SERVER['REQUEST_METHOD'] == 'POST'){
            createTeam($decoded, $conn);
        }
        elseif($_SERVER['REQUEST_METHOD'] == 'PUT'){
            modifyTeam($decoded, $conn);
        }
    }
    else{
        http_response_code(401);
    }

    function getByTournamentId($decoded, $conn) {
        $postdata = $_GET['tournamentId'];
        $sql = "SELECT organizer_id from foottour.tournaments where id = '" . $_GET["tournamentId"] . "';";
        $result = $conn->query($sql);
        
        if($postdata == $result->fetch_assoc()[0]["organizer_id"]){
            $teams = array();
            $sql = "SELECT * from foottour.teams WHERE tournament_Id = '$postdata'";
            $result = $conn->query($sql);
            $count = mysqli_num_rows($result);
            if ($count > 0){
                $i = 0;
                while ($row = $result->fetch_assoc()) {
                    $teams[$i]["id"] = $row["id"];
                    $teams[$i]["leaderId"] = $row["leaderId"];
                    $teams[$i]["name"] = $row["name"];
                    $i++;
                }
                http_response_code(200);
                echo json_encode($teams);
            }else{
                http_response_code(404);
            }
        }
        else{
        http_response_code(401);
        }
    }

    function getTeamById($decoded, $conn) {
        $id = $_REQUEST['id'];
        $team = new Team();
        $sql = "SELECT * from foottour.teams WHERE id = '$id'";
        $result = $conn->query($sql);
        $count = $result->num_rows();
        if($count == 1){
            while ($row = $result->fetch_assoc()) {
                $team->id = $row["id"];
                $team->leaderId = $row["leader_id"];
                $team->name = $row["name"];
            }
            http_response_code(200);
            echo json_encode($team);
        }
        else{
            http_response_code(404);
        }
    $conn->close();
    }

    function createTeam($decoded, $conn) {
        $postdata = json_decode(file_get_contents("php://input"));
        $sql = "SELECT organizer_id from foottour.tournaments where id = '" . $_GET["tournamentId"] . "';";
        $result = $conn->query($sql);
        $id = 0;
        while ($row = $result->fetch_assoc()) {
            $id = $row["organizer_id"];
        }
        if($_GET['tournamentId'] == $id){
        $sql = "INSERT INTO foottour.teams (leader_id, name) VALUES ('$postdata->leaderId',
        '$postdata->name');";
            if($conn->query($sql)){
                
                http_response_code(200);
                echo json_encode(array("Sikeresen létrehozta a csapatot!"));
            }
            else{
                http_response_code(400);
            }
        }
        else{
            http_response_code(401);
        }
    }

    function modifyTeam($decoded, $conn) {
        
    }
?>