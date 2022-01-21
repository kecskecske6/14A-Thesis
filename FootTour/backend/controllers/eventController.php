<?php

class EventController{
    function getEventsByMatchId($conn, $id, $event){
        $sql = "SELECT * FROM foottour.events WHERE match_id = '$id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $events = array();
            $i = 0;
            while ($row = mysqli_fetch_row($result)) {
                $event = new Event();
                $event->id = $row[0];
                $event->matchId = $row[1];
                $event->playerId = $row[2];
                $event->type = $row[3];
                $event->minute = $row[4];
                array_push($events, $event);
                ++$i;
            }
            return $events;
        }
        else{
            return false;
        }
    }
}

?>