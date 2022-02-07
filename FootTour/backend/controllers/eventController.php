<?php

class EventController{
    function getEventsByMatchId($conn, $id){
        $sql = "SELECT * FROM foottour.events WHERE matchId = ?";

        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $id = htmlspecialchars(strip_tags($id));
        $stmt->bind_param("i",$id);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        $events = array();
        while($row = $result->fetch_object()){
            array_push($events,$row);
        }
        return $events;
        }
}

?>