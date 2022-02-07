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
        $sql = "INSERT into foottour.teams_to_groups (teamId, groupId) values (?, ?);";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;
        $teamId = htmlspecialchars(strip_tags($postdata->teamId));
        $groupId = htmlspecialchars(strip_tags($postdata->groupId));

        $stmt->bind_param("ii", $teamId, $groupId);
        if ($stmt->execute() === false) return false;

        return $this->getById($conn, $stmt->insert_id);
    }

    function getByTournamentId($conn, $id) {
        $sql = "SELECT foottour.teams_to_groups.* from foottour.teams_to_groups INNER JOIN foottour.teams
          ON foottour.teams.id = foottour.teams_to_groups.teamId
        INNER JOIN foottour.groups
          ON foottour.teams_to_groups.groupId = foottour.groups.id where groups.tournamentId = ?;";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) return false;

        $tournamentId = htmlspecialchars(strip_tags($id));

        $stmt->bind_param("i",$tournamentId);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        $teamstoGroups = array();
        while($row = $result->fetch_object()){
            array_push($teamstoGroups,$row);
        }
        return $teamstoGroups;
    }
}
?>