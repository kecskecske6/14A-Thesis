<?php
class MatchController{
 
function getById($conn, $id, $match, $userController, $tournamentController, $ec){
    $sql = "SELECT matches.*, groups.tournamentId FROM foottour.matches
    INNER JOIN foottour.groups ON matches.groupId = groups.id WHERE matches.id = ?";

    $stmt = $conn->prepare($sql);
    if ($stmt === false) return false;
    $id = htmlspecialchars(strip_tags($id));
    $stmt->bind_param("i",$id);
    if ($stmt->execute() === false) return false;
    $result = $stmt->get_result();
        $row = mysqli_fetch_row($result);
        $match->id = $row[0];
        $match->refereeId = $row[1];
        $match->team1Goals = $row[2];
        $match->team2Goals = $row[3];
        $match->code = $row[4];
        $match->groupId = $row[5];
        $match->time = $row[6];
        $match->team1Id = $row[7];
        $match->team2Id = $row[8];
        $match->tournamentId = $row[9];
        $match->team1Players = $this->getPlayersByMatchId($conn, $id, $row[7]);
        $match->team2Players = $this->getPlayersByMatchId($conn, $id, $row[8]);
        $match->team1Name = $this->getTeamNameById($conn, $match->team1Id);
        $match->team2Name = $this->getTeamNameById($conn, $match->team2Id);
        $match->refereeName = $userController->getNameById($conn, $row[1]);
        $match->tournamentName = $tournamentController->getNameById($conn, $row[9]);
        $match->events = $ec->getEventsByMatchId($conn, $row[0]);
        return $match;
}


function getPlayersByMatchId($conn, $id, $teamId){
    $sql = "SELECT
        players.id,
        players.name,
        kit_numbers_to_players.kitNumber
        FROM foottour.players_to_teams
        INNER JOIN foottour.players
            ON players_to_teams.playerId = players.id 
        INNER JOIN foottour.teams
            ON players_to_teams.teamId = teams.id
        INNER JOIN foottour.teams_to_tournaments
            ON teams_to_tournaments.teamId = teams.id
        INNER JOIN foottour.groups
            ON teams_to_tournaments.tournamentId = groups.tournamentId
        INNER JOIN foottour.matches
            ON matches.groupId = groups.id
        INNER JOIN foottour.tournaments
            ON groups.tournamentId = tournaments.id
        INNER JOIN foottour.kit_numbers_to_players
            ON players.id = kit_numbers_to_players.playerId AND tournaments.id = kit_numbers_to_players.tournamentId
        WHERE matches.id = ? AND teams.id = ?";
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

function createMatch($conn, $data) {
    $sql = "INSERT into foottour.matches (refereeId, team1Goals, team2Goals, code, groupId, time, team1Id, team2Id) values (?, ?, ?, ?, ?, ?, ?, ?);";
    $stmt = $conn->prepare($sql);
    if ($stmt == false) return false;
    $refereeId = htmlspecialchars(strip_tags($data->refereeId));
    $team1Goals = htmlspecialchars(strip_tags($data->team1Goals));
    $team2Goals = htmlspecialchars(strip_tags($data->team2Goals));
    $code = htmlspecialchars(strip_tags($data->code));
    $groupId = htmlspecialchars(strip_tags($data->groupId));
    $time = htmlspecialchars(strip_tags($data->time));
    $team1Id = htmlspecialchars(strip_tags($data->team1Id));
    $team2Id = htmlspecialchars(strip_tags($data->team2Id));
    $stmt->bind_param("iiisisii", $refereeId, $team1Goals, $team2Goals, $code, $groupId, $time, $team1Id, $team2Id);
    if ($stmt->execute() == false) return false;
    return $this->getByIdActual($conn, $stmt->insert_id);
}

function getByIdActual($conn, $id){
    $sql = "SELECT * from foottour.matches WHERE id = ?;";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) return false;
    $id = htmlspecialchars(strip_tags($id));
    $stmt->bind_param("i",$id);
    if ($stmt->execute() === false) return false;
    $result = $stmt->get_result();
    return $result->fetch_object();
}

function saveMatch($conn, $postdata){
    $sql = "UPDATE foottour.matches SET `tournamentId` = ?, `team1Id`= ?, `team2Id`= ?,
     `refereeId`= ?, `team1Goals`= ?, `team2Goals`= ?, `code`= ? WHERE `id` = ?";
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

function getByTournamentId($conn, $id) {
    $sql = "SELECT matches.* from foottour.matches inner join foottour.groups on matches.groupId = groups.id where foottour.groups.tournamentId = ?;";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) return false;
    $id = htmlspecialchars(strip_tags($id));
    $stmt->bind_param("i",$id);
    if ($stmt->execute() === false) return false;
    $result = $stmt->get_result();
    $matches = array();
    while ($row = $result->fetch_object()) array_push($matches, $row);
    return $matches;
}

}
?>