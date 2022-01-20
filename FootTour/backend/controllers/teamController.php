<?php

class TeamController{
    
    function getTeamsByTournamentId($conn, $tournamentId, $team){
        $sql = "SELECT * FROM foottour.teams_to_tournaments INNER JOIN foottour.tournaments
          ON teams_to_tournaments.tournament_id = tournaments.id WHERE tournaments.id = '$tournamentId'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $teams = array();
            $i = 0;
            while ($row = mysqli_fetch_row($result)){
                $team = new Team();
                $team->id = $row[0];
                $team->leaderId = $row[1];
                $team->name = $row[2];
                array_push($teams, $team);
                $i++;
            }
            return $teams;
        }
        else{
            http_response_code(404);
        }
    }
}
?>