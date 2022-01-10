<?php
    include_once "../connect.php";
    if (isset($_GET)) {
        if (isset($_GET["id"])) {
            $sql = "SELECT * from foottour.tournaments where id = " . $_GET["id"] . ";";
        }
        else {
            $sql = "SELECT * from foottour.tournaments where organizer_id = " . $_GET["userId"] . ";";
            $tournaments = array();
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
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
                    ++$i;
                }
                echo json_encode($tournaments);
            }
        }
    }
    else {
        $sql = "SELECT * from foottour.tournaments;";
        $tournaments = array();
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
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
                ++$i;
            }
            echo json_encode($tournaments);
        }
    }
    $conn->close();
?>