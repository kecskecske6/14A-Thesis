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

    function createEvents($conn, $events){
        $sql = "INSERT INTO foottour.events (match_id, player_id, type, minute)
                VALUES (?,?,?,?)";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        foreach($events as &$row){
            $matchId = htmlspecialchars(strip_tags($row->match_id));
            $playerId = htmlspecialchars(strip_tags($row->player_id));
            $type = htmlspecialchars(strip_tags($row->type));
            $minute = htmlspecialchars(strip_tags($row->minute));
            $stmt->bind_param("iisi",$matchId, $playerId, $type, $minute);
            if ($stmt->execute() === false) return false;
        }
        return true;
    }
}
?>