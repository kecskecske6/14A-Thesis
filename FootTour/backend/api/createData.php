<?php
    include_once "connect.php";
    $sql = "INSERT into foottour.users (name, email, password, is_deleted, is_organizer, is_referee, is_leader) values ('Teszt Elek', 'teszt@elek.hu', 'ElekSecret', false, true, false, false)";
    if ($conn->query($sql) === TRUE) {
        echo "Success!";
    } else {
        echo $conn->error;
    }
    $sql = "INSERT into foottour.tournaments (organizer_id, start_date, end_date, name, location, best_player, top_scorer, best_goalkeeper, entry_fee, teams_count, description) values(1, '2021-12-14 19:00:00', '2021-12-25 8:00:00', 'Mikulás kupa', 'Győr', null, null, null, 10000, 16, 'Ünnepi focitorna.');";
    if ($conn->query($sql) === TRUE) {
        echo "Success!";
    } else {
        echo $conn->error;
    }
    $conn->close();
?>