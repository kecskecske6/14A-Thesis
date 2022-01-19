<?php
class MatchController{
 
function getById($conn, $id, $match, $player){
    $sql = "SELECT * FROM foottour.matches WHERE id = '$id'";
    $result = $conn->query($sql);
    if($result != false){
        $row = mysqli_fetch_row($result);
        $match->id = $row[0];
        $match->tournamentId = $row[1];
        $match->team1Id = $row[2];
        $match->team2Id = $row[3];
        $match->refereeId = $row[4];
        $match->team1Goals = $row[5];
        $match->team2Goals = $row[6];
        $match->code = $row[7];
        $match->team1Players = $this->getPlayersByMatchId($conn, $id, $row[2], $player);
        $match->team2Players = $this->getPlayersByMatchId($conn, $id, $row[3], $player);
        $match->team1Name = $this->getTeamNameById($conn, $match->team1Id);
        $match->team2Name = $this->getTeamNameById($conn, $match->team2Id);
        http_response_code(200);
        echo json_encode($match);
    }
    else{
        http_response_code(404);
        echo json_encode(array("message" => "Nem található mérkőzés"));
    }
}


function getPlayersByMatchId($conn, $id, $teamId, $player){
    $sql = "SELECT
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
      WHERE matches.id = '$id' AND teams.id = '$teamId'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $players = array();
        $i = 0;
        while ($row = mysqli_fetch_row($result)) {
            $player = new Player();
            $player->name = $row[0];
            $player->kitNumber = $row[1];
            array_push($players,$player);
            $i++;
        }
    }
    return $players;
}

function getTeamNameById($conn, $id){
    $sql = "SELECT name FROM foottour.teams WHERE id = '$id'";
    $result = $conn->query($sql);
    if($result != false){
        $row = mysqli_fetch_row($result);
        return $row;
    }
    else{
        http_response_code(404);
    }
}
}
?>