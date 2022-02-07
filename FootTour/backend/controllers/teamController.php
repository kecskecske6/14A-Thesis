<?php

class TeamController{
    
    function getTeamsByTournamentId($conn, $tournamentId){
        $sql = "SELECT
        foottour.teams.*
      FROM foottour.teams_to_tournaments
        INNER JOIN foottour.teams
          ON foottour.teams_to_tournaments.teamId = foottour.teams.id
        INNER JOIN foottour.tournaments
          ON foottour.teams_to_tournaments.tournamentId = foottour.tournaments.id WHERE foottour.tournaments.id = ?;";
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