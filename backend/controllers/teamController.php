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

    function getById($conn, $id){
        $sql = "SELECT * from foottour.teams WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $id = htmlspecialchars(strip_tags($id));
        $stmt->bind_param("i",$id);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        return $result->fetch_object();
    }

    function teamToTournament($conn, $teamId, $tournamentId){
        $sql = "INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES(?,?)";

        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;

        $stmt->bind_param("ii", $teamId, $tournamentId);
        if ($stmt->execute() === false) return false;

        return true;
    }

    function registerTeam($conn, $postdata, $pc){
        $sql = "INSERT INTO foottour.teams (leaderId, name) VALUES (?,?)";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $leaderId = (int)htmlspecialchars(strip_tags($postdata->leaderId));
        $tournamentId = htmlspecialchars(strip_tags($postdata->tournamentId));
        $teamName = htmlspecialchars(strip_tags($postdata->teamName));
        
        $stmt->bind_param("is", $leaderId, $teamName);
        if ($stmt->execute() === false) return false;
        
        $teamId = htmlspecialchars(strip_tags($stmt->insert_id));
        
        if(!$this->teamToTournament($conn, $teamId, $tournamentId)) return false;
        
        foreach($postdata->players as &$row){
            $name = htmlspecialchars(strip_tags($row->name));
            $kitNumber = htmlspecialchars(strip_tags($row->kitNumber));
            if(!$pc->register($conn, $name, $kitNumber, $tournamentId, $teamId)) return false;
        }

        return $this->getById($conn, $stmt->insert_id);
    }
}
?>