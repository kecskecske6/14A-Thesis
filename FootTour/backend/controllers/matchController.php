<?php
class MatchController{
 
function getById($conn, $id, $match, $userController, $tournamentController, $ec){
    $sql = "SELECT * FROM foottour.matches WHERE id = ?";

    $stmt = $conn->prepare($sql);
    if ($stmt === false) return false;
    $id = htmlspecialchars(strip_tags($id));
    $stmt->bind_param("i",$id);
    if ($stmt->execute() === false) return false;
    $result = $stmt->get_result();
        $row = mysqli_fetch_row($result);
        $match->id = $row[0];
        $match->tournamentId = $row[1];
        $match->team1Id = $row[2];
        $match->team2Id = $row[3];
        $match->refereeId = $row[4];
        $match->team1Goals = $row[5];
        $match->team2Goals = $row[6];
        $match->code = $row[7];
        $match->team1Players = $this->getPlayersByMatchId($conn, $id, $row[2]);
        $match->team2Players = $this->getPlayersByMatchId($conn, $id, $row[3]);
        $match->team1Name = $this->getTeamNameById($conn, $match->team1Id);
        $match->team2Name = $this->getTeamNameById($conn, $match->team2Id);
        $match->refereeName = $userController->getNameById($conn, $row[4]);
        $match->tournamentName = $tournamentController->getNameById($conn, $row[1]);
        $match->events = $ec->getEventsByMatchId($conn, $row[0]);
        return $match;
}


function getPlayersByMatchId($conn, $id, $teamId){
    $sql = "SELECT
    players.id,
    players.name,
    players.kit_number
  FROM foottour.players_to_teams
    INNER JOIN foottour.players
        ON players_to_teams.player_id = players.id 
    INNER JOIN foottour.teams
        ON players_to_teams.team_id = teams.id
    INNER JOIN foottour.teams_to_tournaments
        ON teams_to_tournaments.team_id = teams.id
    INNER JOIN foottour.tournaments
        ON teams_to_tournaments.tournament_id = tournaments.id
    INNER JOIN foottour.matches
        ON matches.tournament_id = tournaments.id
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

function saveMatch($conn, $postdata){
    $sql = "INSERT INTO foottour.matches (tournament_id, team1_id, team2_id,
    referee_id, team1_goals, team2_goals, code) VALUES (?,?,?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) return false;
    $tournamentId = htmlspecialchars(strip_tags($postdata->tournamentId));
    $team1Id = htmlspecialchars(strip_tags($postdata->team1Id));
    $team2Id = htmlspecialchars(strip_tags($postdata->team2Id));
    $refereeId = htmlspecialchars(strip_tags($postdata->refereeId));
    $team1Goals = htmlspecialchars(strip_tags($postdata->team1Goals));
    $team2Goals = htmlspecialchars(strip_tags($postdata->team2Goals));
    $code = htmlspecialchars(strip_tags($postdata->code));
    $stmt->bind_param("iiiiiis", $tournamentId, $team1Id, $team2Id, $refereeId, $team1Goals,
                        $team2Goals, $code);
    if ($stmt->execute() === false) return false;
    return true;
}
}
?>