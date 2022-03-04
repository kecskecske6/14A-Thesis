<?php
class PlayerController{
    
    function register($conn, $name, $kitNumber, $tournamentId, $teamId){
        $sql = "INSERT INTO foottour.players (name) VALUES (?)";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;

        $name = htmlspecialchars(strip_tags($name));

        $stmt->bind_param("s", $name);
        if ($stmt->execute() === false) return false;
        $playerId = htmlspecialchars(strip_tags($stmt->insert_id));
        if(!$this->kitNumberToPlayers($conn, $playerId, $tournamentId,$kitNumber)) return false;
        if(!$this->playerToTeam($conn,$playerId,$teamId)) return false;

        return true;
    }

    function kitNumberToPlayers($conn, $playerId, $tournamentId, $kitNumber){
        $sql = "INSERT INTO foottour.kit_numbers_to_players (playerId, tournamentId, kitNumber)
                VALUES (?,?,?)";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;

        $stmt->bind_param("iii", $playerId,$tournamentId,$kitNumber);
        if ($stmt->execute() === false) return false;

        return true;
    }

    function playerToTeam($conn, $playerId, $teamId){
        $sql = "INSERT INTO foottour.players_to_teams (playerId, teamId)
                VALUES (?,?)";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;

        $stmt->bind_param("ii", $playerId,$teamId);
        if ($stmt->execute() === false) return false;

        return true;
    }
}
?>