<?php

  class TournamentController{

    function getAll($conn) {
        $sql = "SELECT * from foottour.tournaments";
        $result = $conn->query($sql);
        if ($result === false) return false;
        $tournaments = array();
        while ($row = $result->fetch_object()) {
            array_push($tournaments,$row);
        }
        return $tournaments;
    }

    function getById($conn, $id){
        $sql = "SELECT * from foottour.tournaments WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $id = htmlspecialchars(strip_tags($id));
        $stmt->bind_param("i",$id);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        return $result->fetch_object();
    }
    
    function getByOrganizerId($conn, $id){
            $sql = "SELECT * from foottour.tournaments WHERE organizer_Id = ?";
            $stmt = $conn->prepare($sql);
            if ($stmt === false) return false;
            $id = htmlspecialchars(strip_tags($id));
            $stmt->bind_param("i",$id);
            if ($stmt->execute() === false) return false;
            $result = $stmt->get_result();
            $tournaments = array();
            while($row = $result->fetch_object()){
                array_push($tournaments,$row);
            }
            return $tournaments;
    }

    function createTournament($conn, $postdata){
        $sql = "INSERT INTO foottour.tournaments (organizer_id, start_date, end_date, name,
        location, entry_fee, description, teams_count) VALUES (?,?,?,?,?,?,?,?)";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $organizerId = htmlspecialchars(strip_tags($postdata->organizerId));
        $startDate = htmlspecialchars(strip_tags($postdata->startDate));
        $endDate = htmlspecialchars(strip_tags($postdata->endDate));
        $name = htmlspecialchars(strip_tags($postdata->name));
        $location = htmlspecialchars(strip_tags($postdata->location));
        $entryFee = htmlspecialchars(strip_tags($postdata->entryFee));
        $description = htmlspecialchars(strip_tags($postdata->description));
        $teamsCount = htmlspecialchars(strip_tags($postdata->teamsCount));

        $stmt->bind_param("issssisi",$organizerId, $startDate, $endDate, $name, $location, $entryFee,
                        $description, $teamsCount);
        if ($stmt->execute() === false) return false;
        
        return $this->getById($conn, $stmt->insert_id);
    }


    function modifyTournament($conn, $postdata){
        $sql = "UPDATE foottour.tournaments SET `start_date` = ?,
        `end_date` = ?, `name` = ?, `location` = ?,
        `best_player` = ?, `best_goalkeeper` = ?, `top_scorer` = ?,
        `entry_fee` = ?, `description` = ?, `teams_count` = ? 
        WHERE `organizer_id` = ? AND `id` = ?";
        
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;

        $id = htmlspecialchars(strip_tags($postdata->id));
        $organizerId = htmlspecialchars(strip_tags($postdata->organizerId));
        $startDate = htmlspecialchars(strip_tags($postdata->startDate));
        $endDate = htmlspecialchars(strip_tags($postdata->endDate));
        $name = htmlspecialchars(strip_tags($postdata->name));
        $location = htmlspecialchars(strip_tags($postdata->location));
        $bestPlayer = htmlspecialchars(strip_tags($postdata->bestPlayer));
        $bestGoalkeeper = htmlspecialchars(strip_tags($postdata->bestGoalkeeper));
        $topScorer = htmlspecialchars(strip_tags($postdata->topScorer));
        $entryFee = htmlspecialchars(strip_tags($postdata->entryFee));
        $description = htmlspecialchars(strip_tags($postdata->description));
        $teamsCount = htmlspecialchars(strip_tags($postdata->teamsCount));

        $stmt->bind_param("sssssssisiii",$startDate, $endDate, $name, $location, 
                            $bestPlayer, $bestGoalkeeper, $topScorer, $entryFee, $description,
                            $teamsCount, $organizerId, $id);
        if ($stmt->execute() === false) return false;
        
        return array("message"=> "Sikeresen módosította a tornát");
    }

    function getTournamentByName($conn, $name){
        $sql = "SELECT * from foottour.tournaments WHERE name = ?";
        $stmt = $conn->prepare($sql);
            if ($stmt === false) return false;
            $name = htmlspecialchars(strip_tags($name));
            $stmt->bind_param("s",$name);
            if ($stmt->execute() === false) return false;
            $result = $stmt->get_result();
            $tournaments = array();
            while($row = $result->fetch_object()){
                array_push($tournaments,$row);
            }
            return $tournaments;
    }

    function getNameById($conn, $id){
        $sql = "SELECT name FROM foottour.tournaments WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $id = htmlspecialchars(strip_tags($id));
        $stmt->bind_param("i",$id);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        return $result->fetch_object();
    }
}
?>