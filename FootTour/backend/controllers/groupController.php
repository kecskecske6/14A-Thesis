<?php

  class GroupController{

    function getById($conn, $id){
        $sql = "SELECT * from foottour.groups WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $id = htmlspecialchars(strip_tags($id));
        $stmt->bind_param("i",$id);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        return $result->fetch_object();
    }

    function createGroup($conn, $postdata){
        $sql = "INSERT INTO foottour.groups (tournament_id, name) VALUES (?,?)";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $tournamentId = htmlspecialchars(strip_tags($postdata->tournamentId));
        $name = htmlspecialchars(strip_tags($postdata->name));

        $stmt->bind_param("is", $tournamentId, $name);
        if ($stmt->execute() === false) return false;
        
        return $this->getById($conn, $stmt->insert_id);
    }
}
?>