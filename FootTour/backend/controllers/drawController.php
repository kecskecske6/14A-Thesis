<?php
    include_once "groupController.php";
    include_once "teamstoGroupsController.php";
    class DrawController{
        function makeDraw($conn, $data) {
            $gc = new GroupController();
            $ttgc = new TeamstoGroupsController();
            if ($data->tournament->type == "Csoportkör és kieséses") {
                $groups = array();
            }
            else {
                $groups = array();
                for ($i = 0; $i < $data->tournament->teamsCount / 2; $i++) array_push($groups, array());
                for ($i=0; $i < count($data->teams); $i++) { 
                    $team = $data->teams[0];
                    $doAgain = false;
                    do {
                        $team = $data->teams[rand(0, count($data->teams) - 1)];
                        $doAgain = false;
                        for ($j = 0; $j < count($groups); $j++) if (in_array($team, $groups[$j])) $doAgain = true;
                    } while ($doAgain);
                    array_push($groups[floor($i / 2)], $team);
                }
                $i = 1;
                foreach ($groups as $key => $g) {
                    $name = "";
                    if ($data->tournament->teamsCount == 8) $name = "QF" . $i;
                    $group = $gc->createGroup($conn, array("tournamentId" => $data->tournament->type, "name" => $name));
                    foreach ($g as $key => $t) {
                        $ttgc->createGroup($conn, array("teamId" => $t->id, "groupId" => $group->id));
                    }
                }
            }
        }
    }
?>