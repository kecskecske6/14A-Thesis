<?php
include_once "header.php";
include_once "../api/connect.php";
include_once "../classes/match.php";
include_once "auth.php";
include_once "../classes/player.php";

$auth = new Auth();

if($auth->authorize() != null){
    if($_SERVER["REQUEST_METHOD"] == "GET"){
        getPlayersByMatchId($conn, $_GET['matchId']);
    }
}
else{
    http_response_code(401);
}

function getById($conn, $id){
    $sql = "SELECT * FROM foottour.matches WHERE id = '$id'";
    $result = $conn->query($sql);
    if($result != false){
        $row = mysqli_fetch_row($result);
        $match = new MatchClass();
        $match->id = $row[0];
        $match->tournamentId = $row[1];
        $match->team1Id = $row[2];
        $match->team2Id = $row[3];
        $match->refereeId = $row[4];
        $match->team1Goals = $row[5];
        $match->team2Goals = $row[6];
        $match->code = $row[7];
        http_response_code(200);
        echo json_encode($match);
    }
    else{
        http_response_code(404);
        echo json_encode(array("message" => "Nem található mérkőzés"));
    }
}

function getPlayersByMatchId($conn, $id){
    $sql = "SELECT
    teams.name,
    players.name
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
      WHERE matches.id = '$id'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $data = array();
        $i = 0;
        while ($row = mysqli_fetch_row($result)) {
            array_push($data,$row[0], $row[1]);
            $i++;
        }
    }
    echo json_encode($data);
}
?>