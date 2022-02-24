<?php
class MatchController{
 
function getById($conn, $id, $match, $userController, $tournamentController, $ec){
    $sql = "SELECT matches.*, tournaments.id FROM foottour.matches 
            INNER JOIN groups
                ON matches.groupId = groups.id
            INNER JOIN tournaments
                ON groups.tournamentId = tournaments.id WHERE matches.id = ?";

    $stmt = $conn->prepare($sql);
    if ($stmt === false) return false;
    $id = htmlspecialchars(strip_tags($id));
    $stmt->bind_param("i",$id);
    if ($stmt->execute() === false) return false;
    $result = $stmt->get_result();
        $row = mysqli_fetch_row($result);
        $match->id = $row[0];
        $match->tournamentId = $row[9];
        $match->team1Id = $row[7];
        $match->team2Id = $row[8];
        $match->refereeId = $row[1];
        $match->team1Goals = $row[2];
        $match->team2Goals = $row[3];
        $match->code = $row[4];
        $match->team1Players = $this->getPlayersByMatchId($conn, $row[9], $row[7]);
        $match->team2Players = $this->getPlayersByMatchId($conn, $row[9], $row[8]);
        $match->team1Name = $this->getTeamNameById($conn, $match->team1Id);
        $match->team2Name = $this->getTeamNameById($conn, $match->team2Id);
        $match->refereeName = $userController->getNameById($conn, $row[1]);
        $match->tournamentName = $tournamentController->getNameById($conn, $row[9]);
        $match->events = $ec->getEventsByMatchId($conn, $row[0]);
        return $match;
}


function getPlayersByMatchId($conn, $id, $teamId){
    $sql = "SELECT
    players.name,
    players.id,
    kit_numbers_to_players.kitNumber
    FROM foottour.kit_numbers_to_players
        INNER JOIN foottour.players
        ON kit_numbers_to_players.playerId = players.id
        INNER JOIN foottour.players_to_teams
        ON players_to_teams.playerId = players.id
        INNER JOIN foottour.teams
        ON players_to_teams.teamId = teams.id
        INNER JOIN foottour.teams_to_tournaments
        ON teams_to_tournaments.teamId = teams.id
        INNER JOIN foottour.tournaments
        ON teams_to_tournaments.tournamentId = tournaments.id
        INNER JOIN foottour.groups
        ON groups.tournamentId = tournaments.id
        INNER JOIN foottour.matches
        ON matches.groupId = groups.id
        WHERE kit_numbers_to_players.tournamentId = ? AND teams.id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) return false;
    $id = htmlspecialchars(strip_tags($id));
    $teamId = htmlspecialchars(strip_tags($teamId));
    $stmt->bind_param("ii",$id, $teamId);
    if ($stmt->execute() === false) return false;
    $result = $stmt->get_result();
    $players = array();
    while($row = $result->fetch_object()){
        array_push($players,$row);
    }
    return $players;
}

function getTeamNameById($conn, $id){
    $sql = "SELECT name FROM foottour.teams WHERE id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) return false;
    $id = htmlspecialchars(strip_tags($id));
    $stmt->bind_param("i",$id);
    if ($stmt->execute() === false) return false;
    $result = $stmt->get_result();
    return $result->fetch_object();
}

function saveMatch($conn, $postdata){
    $sql = "UPDATE foottour.matches SET `tournament_id` = ?, `team1_id`= ?, `team2_id`= ?,
     `referee_id`= ?, `team1_goals`= ?, `team2_goals`= ?, `code`= ? WHERE `id` = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) return false;;
    $tournamentId = htmlspecialchars(strip_tags($postdata->tournamentId));
    $team1Id = htmlspecialchars(strip_tags($postdata->team1Id));
    $team2Id = htmlspecialchars(strip_tags($postdata->team2Id));
    $refereeId = htmlspecialchars(strip_tags($postdata->refereeId));
    $team1Goals = htmlspecialchars(strip_tags($postdata->team1Goals));
    $team2Goals = htmlspecialchars(strip_tags($postdata->team2Goals));
    $code = htmlspecialchars(strip_tags($postdata->code));
    $id = htmlspecialchars(strip_tags($postdata->id));

    $stmt->bind_param('iiiiiisi',$tournamentId, $team1Id, $team2Id, $refereeId, $team1Goals, $team2Goals, $code, $id);
    $stmt->execute();
    var_dump($stmt->error);
    if ($stmt->execute() === false) return false;
    return true;
}
}
?>