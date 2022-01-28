<?php

class TeamController{
    
    function getTeamsByTournamentId($conn, $tournamentId){
        $sql = "SELECT
        teams.*
      FROM teams_to_tournaments
        INNER JOIN teams
          ON teams_to_tournaments.team_id = teams.id
        INNER JOIN tournaments
          ON teams_to_tournaments.tournament_id = tournaments.id WHERE tournaments.id = ?;";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;

        $tournamentId = htmlspecialchars(strip_tags($tournamentId));

        $stmt->bind_param("i",$tournamentId);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        $teams = array();
        while($row = $result->fetch_object()){
            array_push($teams,$row);
        }
        return $teams;
    }
}
?>