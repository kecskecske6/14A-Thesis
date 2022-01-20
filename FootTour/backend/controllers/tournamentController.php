<?php

  class TournamentController{

    function getAll($conn, $tournament) {
        $sql = "SELECT * from foottour.tournaments";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $tournaments = array();
            $i = 0;
            while ($row = mysqli_fetch_row($result)) {
                $tournament->id = $row[0];
                $tournament->organizerId = $row[1];
                $tournament->startDate = $row[2];
                $tournament->endDate = $row[3];
                $tournament->name = $row[4];
                $tournament->location = $row[5];
                $tournament->bestPlayer = $row[6];
                $tournament->topScorer = $row[7];
                $tournament->bestGoalKeeper = $row[8];
                $tournament->entryFee = $row[9];
                $tournament->teamsCount = $row[10];
                $tournament->description = $row[11];
                array_push($tournaments, $tournament);
                ++$i;
            }
            return $tournaments;
        }
    }

    function getById($conn, $id, $tournament){
        $sql = "SELECT * from foottour.tournaments WHERE id = '$id'";
        $result = $conn->query($sql);
        if($result != false){
            $row = mysqli_fetch_row($result);
            $tournament->id = $row[0];
            $tournament->organizerId = $row[1];
            $tournament->startDate = $row[2];
            $tournament->endDate = $row[3];
            $tournament->name = $row[4];
            $tournament->location = $row[5];
            $tournament->bestPlayer = $row[6];
            $tournament->topScorer = $row[7];
            $tournament->bestGoalKeeper = $row[8];
            $tournament->entryFee = $row[9];
            $tournament->teamsCount = $row[10];
            $tournament->description = $row[11];
            return $tournament;
        }
        else{
            http_response_code(404);
        }
        
    }
    
    function getByOrganizerId($conn, $id){
            $tournaments = array();
            $sql = "SELECT * from foottour.tournaments WHERE organizer_Id = '$id'";
            $result = $conn->query($sql);
            $count = mysqli_num_rows($result);
            if ($count > 0){
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
                return $tournaments;
            }else{
                http_response_code(404);
            }
    }

    function createTournament($conn, $postdata){
        $sql = "INSERT INTO foottour.tournaments (organizer_id, start_date, end_date, name,
        location, entry_fee, description, teams_count) VALUES ('$postdata->organizerId', '$postdata->startDate',
        '$postdata->endDate', '$postdata->name', '$postdata->location', '$postdata->entryFee',
        '$postdata->description', '$postdata->teamsCount')";
            if($conn->query($sql)){
                http_response_code(200);
                echo json_encode(array("Sikeresen létrehozta a tornát"));
            }
            else{
                http_response_code(400);
            }
    }


    function modifyTournament($conn, $postdata){
        $organizerId = $postdata->organizerId;
        $id = $postdata->id;
        $sql = "UPDATE foottour.tournaments SET start_date='$postdata->startDate',
        end_date = '$postdata->endDate', name='$postdata->name', location='$postdata->location',
        best_player = '$postdata->bestPlayer', best_goalkeeper='$postdata->bestGoalkeeper',
        entry_fee='$postdata->entryFee', description = '$postdata->description', teams_count='$postdata->teamsCount' WHERE organizer_id = $organizerId AND id = $id";
        if($conn->query($sql)){
                
            http_response_code(200);
            echo json_encode(array("Sikeresen módosította a tornát"));
        }
        else{
            http_response_code(400);
        }
    }

    function getTournamentByName($conn, $name){
        $tournaments = array();
        $sql = "SELECT * from foottour.tournaments WHERE name = '$name'";
        $result = $conn->query($sql);
        $count = mysqli_num_rows($result);
        if($count > 0){
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
                return $tournaments;
        }
        else{
            http_response_code(404);
        }
    }

    function getNameById($conn, $id){
        $sql = "SELECT name FROM foottour.tournaments WHERE id = '$id'";
        $result = $conn->query($sql);
        if($result != false){
            $row = mysqli_fetch_row($result);
            return $row;
        }
        else{
            http_response_code(404);
        }
    }
}
?>