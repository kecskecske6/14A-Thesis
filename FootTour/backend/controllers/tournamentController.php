<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
    include_once "../api/connect.php";
    include_once "../classes/tournament.php";
    include_once "auth.php";

    $auth = new Auth();

    if($auth->authorize() != null){
        $decoded = $auth->setData();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            createTournament($decoded, $conn);
            http_response_code(200);
        }
    elseif ($_SERVER['REQUEST_METHOD'] === 'GET')
        {
            getTournamentByUserId($decoded, $conn);
        }
    elseif ($_SERVER['REQUEST_METHOD'] === 'PUT'){
            modifyTournament($decoded, $conn);
    }
    else{
            http_response_code(400);
        }
    }
    else{
        http_response_code(401);
    }

        function createTournament($decoded, $conn){
            $request = json_decode(file_get_contents("php://input"));
            $id = $decoded->data->id;
            $sql = "INSERT INTO foottour.tournaments (organizer_id, start_date, end_date, name, location,
            entry_fee, description, teams_count) VALUES ('$id', '$request->startDate', '$request->endDate',
            '$request->name', '$request->location', '$request->entryFee', '$request->description', '$request->teamsCount')";
            $conn->query($sql);
        }

        function getTournamentByUserId($decoded, $conn){
            $postdata = $_GET['id'];
            if ($postdata == $decoded->data->id) {
                $tournaments = array();
                $sql = "SELECT * from foottour.tournaments WHERE organizer_Id = '$postdata'";
                $result = $conn->query($sql);
                $count = mysqli_num_rows($result);
                if ($count > 0) {
                    $i = 0;
                    while ($row = $result->fetch_assoc()) {
                        $tournaments[$i]["id"] = $row["id"];
                        $tournaments[$i]["organizerId"] = $row["organizer_id"];
                        $tournaments[$i]["startDate"] = $row["start_date"];
                        $tournaments[$i]["endDate"] = $row["end_date"];
                        $tournaments[$i]["name"] = $row["name"];
                        $tournaments[$i]["location"] = $row["location"];
                        $tournaments[$i]["bestPlayer"] = $row["best_player"];
                        $tournaments[$i]["topScorer"] = $row["top_scorer"];
                        $tournaments[$i]["bestGoalkeeper"] = $row["best_goalkeeper"];
                        $tournaments[$i]["entryFee"] = $row["entry_fee"];
                        $tournaments[$i]["teamsCount"] = $row["teams_count"];
                        $tournaments[$i]["description"] = $row["description"];
                        $i++;
                    }
                    http_response_code(200);
                    echo json_encode($tournaments);
                }else{
                    http_response_code(404);
                }
            }
            else{
            http_response_code(401);
            }
        }

        function modifyTournament($decoded,$conn){
            $request = json_decode(file_get_contents("php://input"));
            $postdata = $_GET['id'];
            $id = $decoded->data->id;
            $sql = "UPDATE foottour.tournaments SET start_date = '$request->startDate', end_date = '$request->endDate', 
            name = '$request->name', location = '$request->location', best_player = '$request->bestPlayer', top_scorer = '$request->topScorer',
            best_goalkeeper = '$request->bestGoalkeeper', entry_fee = '$request->entryFee', description = '$request->description',
            teams_count = '$request->teamsCount' WHERE id = '$postdata' AND organizer_id = '$id'";
            if(!$conn->query($sql)){
                echo json_encode($conn->query($sql));
                http_response_code(400);
            }
            else
                echo json_encode(array("Sikeresen módosította az adatokat"));
        }
        $conn->close();
?>