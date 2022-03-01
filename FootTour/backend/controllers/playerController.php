<?php
class playerController{
    
    function register($conn, $name, $kitNumber, $tournamentId){
        $sql = "INSERT INTO foottour.players (name) VALUES (?)";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;

        $name = htmlspecialchars(strip_tags($name));

        $stmt->bind_param("s", $name);
        if ($stmt->execute() === false) return false;
        $playerId = htmlspecialchars(strip_tags($stmt->insert_id));
        if(!$this->kitNumberToPlayers($conn, $playerId, $tournamentId,$kitNumber)) return false;

        return true;
    }

    function kitNumberToPlayers($conn, $playerId, $tournamentId, $kitNumber){

    }
}
?>