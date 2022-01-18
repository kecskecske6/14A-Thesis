<?php
include_once "header.php";
include_once "../api/connect.php";
include_once "auth.php";
include_once "../classes/player.php";

$auth = new Auth();

if($auth->authorize() != null){
    if($_SERVER["REQUEST_METHOD"] == "GET"){
        getPlayersByTeamId($conn, $_GET['teamId']);
    }
}
else{
    http_response_code(401);
}

function getPlayersByTeamId($conn, $id){
    $sql = "SELECT
    *
  FROM foottour.players
    INNER JOIN foottour.players_to_teams
      ON players.id = players_to_teams.player_id WHERE players_to_teams.team_id = '$id'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $players = array();
        $i = 0;
        while ($row = mysqli_fetch_row($result)) {
            $player = new Player();
            $player->id = $row[0];
            $player->name = $row[1];
            $player->birthDate = $row[2];
            $player->goals = $row[3];
            $player->yellowCards = $row[4];
            $player->redCards = $row[5];
            $player->kitNumber = $row[6];
            array_push($players, $player);
            $i++;
        }
        echo json_encode($players);
    }
}
?>