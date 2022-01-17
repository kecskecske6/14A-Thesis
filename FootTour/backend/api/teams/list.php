<?php
    include_once "../connect.php";
    include_once "../../controllers/header.php";
    if (isset($_GET)) {
        if (isset($_GET["tournamentId"])) {
            $sql = "SELECT teams.* FROM teams_to_tournaments JOIN teams ON teams_to_tournaments.team_id = teams.id JOIN tournaments ON teams_to_tournaments.tournament_id = tournaments.id where tournament.id = " . $_GET["tournamentId"] . ";";
            $teams = array();
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                $i = 0;
                while ($row = $result->fetch_assoc()) {
                    $teams[$i]["id"] = $row["id"];
                    $teams[$i]["leaderId"] = $row["leader_id"];
                    $teams[$i]["name"] = $row["name"];
                }
                echo json_encode($teams);
            }
        }
    }
    $conn->close();
?>