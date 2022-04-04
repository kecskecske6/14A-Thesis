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
    
    function getByOrganizerId($conn, $id, $uc){
            $sql = "SELECT * from foottour.tournaments WHERE organizerId = ?";
            $stmt = $conn->prepare($sql);
            if ($stmt === false) return false;
            $id = htmlspecialchars(strip_tags($id));
            $stmt->bind_param("i",$id);
            if ($stmt->execute() === false) return false;
            $result = $stmt->get_result();
            $tournaments = array();
            $orgnaizerName = $uc->getNameById($conn, $id);
            while($row = $result->fetch_object()){
                $row->organizerName = $orgnaizerName;
                array_push($tournaments,$row);
            }
            return $tournaments;
    }

    function getByRefereeId($conn, $id, $uc){
        $sql = "SELECT * FROM tournaments INNER JOIN referees_to_tournaments ON tournaments.id WHERE referees_to_tournaments.refereeId = ? AND tournaments.id = tournamentId;";
        $stmt = $conn->prepare($sql);
            if ($stmt === false) return false;
            $id = htmlspecialchars(strip_tags($id));
            $stmt->bind_param("i",$id);
            if ($stmt->execute() === false) return false;
            $result = $stmt->get_result();
            $tournaments = array();
            while($row = $result->fetch_object()){
                $row->organizerName = $uc->getNameById($conn, $row->organizerId);
                array_push($tournaments,$row);
            }
            return $tournaments;
    }

    function createTournament($conn, $postdata){
        $sql = "INSERT INTO foottour.tournaments (organizerId, startDate, endDate, name,
        location, county, entryFee, description, teamsCount, type, fields) VALUES (?,?,?,?,?,?,?,?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $organizerId = htmlspecialchars(strip_tags($postdata->organizerId));
        $startDate = htmlspecialchars(strip_tags($postdata->startDate));
        $endDate = htmlspecialchars(strip_tags($postdata->endDate));
        $name = htmlspecialchars(strip_tags($postdata->name));
        $location = htmlspecialchars(strip_tags($postdata->location));
        $county = htmlspecialchars(strip_tags($postdata->county));
        $entryFee = htmlspecialchars(strip_tags($postdata->entryFee));
        $description = htmlspecialchars(strip_tags($postdata->description));
        $teamsCount = htmlspecialchars(strip_tags($postdata->teamsCount));
        $type = htmlspecialchars(strip_tags($postdata->type));
        $fields = htmlspecialchars(strip_tags($postdata->fields));

        $stmt->bind_param("isssssisisi",$organizerId, $startDate, $endDate, $name, $location, $county, $entryFee,
                        $description, $teamsCount, $type, $fields);
        if ($stmt->execute() === false) return false;
        
        return $this->getById($conn, $stmt->insert_id);
    }


    function modifyTournament($conn, $postdata){
        $sql = "UPDATE foottour.tournaments SET `startDate` = ?,
        `endDate` = ?, `name` = ?, `location` = ?, county = ?,
        `bestPlayer` = ?, `topScorer` = ?, `bestGoalkeeper` = ?,
        `entryFee` = ?, `description` = ?, `teamsCount` = ?, type = ?, groupMatches = ?, knockoutMatches = ?, finalMatches = ?, fields = ? 
        WHERE `organizerId` = ? AND `id` = ?";
        
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;

        $id = htmlspecialchars(strip_tags($postdata->id));
        $organizerId = htmlspecialchars(strip_tags($postdata->organizerId));
        $startDate = htmlspecialchars(strip_tags($postdata->startDate));
        $endDate = htmlspecialchars(strip_tags($postdata->endDate));
        $name = htmlspecialchars(strip_tags($postdata->name));
        $location = htmlspecialchars(strip_tags($postdata->location));
        $county = htmlspecialchars(strip_tags($postdata->county));
        $bestPlayer = htmlspecialchars(strip_tags($postdata->bestPlayer));
        $bestGoalkeeper = htmlspecialchars(strip_tags($postdata->bestGoalkeeper));
        $topScorer = htmlspecialchars(strip_tags($postdata->topScorer));
        $entryFee = htmlspecialchars(strip_tags($postdata->entryFee));
        $description = htmlspecialchars(strip_tags($postdata->description));
        $teamsCount = htmlspecialchars(strip_tags($postdata->teamsCount));
        $type = htmlspecialchars(strip_tags($postdata->type));
        $groupMatches = htmlspecialchars(strip_tags($postdata->groupMatches));
        $knockoutMatches = htmlspecialchars(strip_tags($postdata->knockoutMatches));
        $finalMatches = htmlspecialchars(strip_tags($postdata->finalMatches));
        $fields = htmlspecialchars(strip_tags($postdata->fields));

        $stmt->bind_param("ssssssssisisiiiiii",$startDate, $endDate, $name, $location, $county,
                            $bestPlayer, $topScorer, $bestGoalkeeper, $entryFee, $description,
                            $teamsCount, $type, $groupMatches, $knockoutMatches, $finalMatches, $fields, $organizerId, $id);
        if ($stmt->execute() === false) return false;
        
        return $this->getById($conn, $id);
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

    function getBySearchParameter($conn, $parameter){
        $sql = "SELECT * from foottour.tournaments WHERE startDate > NOW() AND (name LIKE ? OR location LIKE ? OR startDATE LIKE ? OR entryFee LIKE ?)";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $parameter = htmlspecialchars(strip_tags($parameter));
        $parameter = "%". $parameter . "%";
        $stmt->bind_param("ssss", $parameter, $parameter, $parameter, $parameter);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        $tournaments = array();
        while($row = $result->fetch_object()){
            array_push($tournaments,$row);
        }
        return $tournaments;
    }

    function getAvailable($conn, $uc){
        $sql = "SELECT * from foottour.tournaments WHERE startDate > NOW()";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        $tournaments = array();
        while($row = $result->fetch_object()){
            $row->organizerName = $uc->getNameById($conn, $row->organizerId);
            array_push($tournaments,$row);
        }
        return $tournaments;
    }

    function getByFilters($conn, $county, $min, $max, $pickedDates){
        if($county == "0")
            $sql = "SELECT * from foottour.tournaments WHERE entryFee >= ? AND entryFee <= ? AND (startDATE LIKE ? OR startDATE LIKE ? OR startDATE LIKE ?) AND startDate > NOW()";
        else{
            $sql = "SELECT * from foottour.tournaments WHERE county = ? AND entryFee >= ? AND entryFee <= ? AND (startDATE LIKE ? OR startDATE LIKE ? OR startDATE LIKE ?) AND startDate > NOW()";
            $county = htmlspecialchars(strip_tags($county));
        }
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $min = htmlspecialchars(strip_tags($min));
        $max = htmlspecialchars(strip_tags($max));
        $pickedDates = explode(",", $pickedDates);
        switch (count($pickedDates)) {
            case '1':
                $pickedDates1 = htmlspecialchars(strip_tags($pickedDates[0]));
                $pickedDates1 = "%". $pickedDates1 . "%";
                break;
            
            case '2':
                $pickedDates1 = htmlspecialchars(strip_tags($pickedDates[0]));
                $pickedDates2 = htmlspecialchars(strip_tags($pickedDates[1]));
                $pickedDates1 = "%". $pickedDates1 . "%";
                $pickedDates2 = "%". $pickedDates2 . "%";
                break;
               
            case '3':
                $pickedDates1 = htmlspecialchars(strip_tags($pickedDates[0]));
                $pickedDates2 = htmlspecialchars(strip_tags($pickedDates[1]));
                $pickedDates3 = htmlspecialchars(strip_tags($pickedDates[2]));
                $pickedDates1 = "%". $pickedDates1 . "%";
                $pickedDates2 = "%". $pickedDates2 . "%";
                $pickedDates3 = "%". $pickedDates3 . "%";
                break;
        }
        if($county == "0")
            $stmt->bind_param("iisss", $min, $max, $pickedDates1, $pickedDates2, $pickedDates3);
        else
            $stmt->bind_param("siisss", $county, $min, $max, $pickedDates1, $pickedDates2, $pickedDates3);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        $tournaments = array();
        while($row = $result->fetch_object()){
            array_push($tournaments,$row);
        }
        return $tournaments;
    }
}
?>