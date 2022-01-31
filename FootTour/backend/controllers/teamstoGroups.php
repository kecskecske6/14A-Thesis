<?php

  class TeamstoGroupsController{

    function getById($conn, $id){
        $sql = "SELECT * from foottour.teams_to_groups WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $id = htmlspecialchars(strip_tags($id));
        $stmt->bind_param("i",$id);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        return $result->fetch_object();
    }

    function createGroup($conn, $postdata){
        $sql = "INSERT into foottour.teams_to_groups (team_id, group_id) values (?, ?);";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $teamId = htmlspecialchars(strip_tags($postdata->teamId));
        $groupId = htmlspecialchars(strip_tags($postdata->groupId));

        $stmt->bind_param("ii", $teamId, $groupId);
        if ($stmt->execute() === false) return false;

        return $this->getById($conn, $stmt->insert_id);
    }
}
?>