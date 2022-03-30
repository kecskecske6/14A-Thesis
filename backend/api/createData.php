<?php
    require_once '../vendor/autoload.php';
    include_once '../controllers/userController.php';
    include_once '../controllers/tournamentController.php';
    include_once "../controllers/teamController.php";
    include_once "../controllers/playerController.php";
    include_once 'connect.php';
    $uc = new UserController();
    $tc = new TournamentController();
    $teamc = new TeamController();
    $pc = new PlayerController();
    $db = new DB();
    $conn = $db->getConnection();
    $faker = Faker\Factory::create();
    $uc->register($conn, (object)array("name" => "Admin", "email" => "admin", "password" => "admin"));
    for ($i = 0; $i < 5; $i++) $uc->register($conn, (object)array("name" => $faker->name(), "email" => $faker->unique()->email(), "password" => "admin"));
    for ($i = 0; $i < 15; $i++) {
        $startDate = $faker->dateTimeBetween("-2 weeks", "+12 weeks");
        $endDate = new DateTime("@" . ($startDate->getTimestamp() + rand(86400, 1209600)));
        $startDate = $startDate->format("Y-m-d H:i:s");
        $endDate = $endDate->format("Y-m-d H:i:s");
        $teamsCount = $faker->randomElement([8, 16, 32]);
        $type = "";
        if ($teamsCount == 8) $type = "Egyenes kieséses";
        else $type = $faker->randomElement(["Csoportkör és kieséses", "Egyenes kieséses"]);
        $tc->createTournament($conn, (object)array("organizerId" => $faker->numberBetween(1, 6), "startDate" => $startDate, "endDate" => $endDate, "name" => $faker->word(), "location" => $faker->address(), "county" => $faker->randomElement(["Bács-Kiskun", "Baranya", "Békés", "Borsod-Abaúj-Zemplén", "Csongrád-Csanád", "Fejér", "Győr-Moson-Sopron", "Hajdú-Bihar", "Heves", "Jász-Nagykun-Szolnok", "Komárom-Esztergom", "Nógrád", "Pest", "Somogy", "Szabolcs-Szatmár-Bereg", "Tolna", "Vas", "Veszprém", "Zala"]), "entryFee" => $faker->numberBetween(0, 30000), "description" => $faker->text(1000), "teamsCount" => $teamsCount, "type" => $type, "groupMatches" => 1, "knockoutMatches" => 1, "finalMatches" => 1, "fields" => $faker->numberBetween(1, 9)));
    }
    $sql = "SELECT * from tournaments";
    $result = $conn->query($sql);
    $j = 1;
    while ($row = $result->fetch_object()) {
        for ($i = 0; $i < $row->teamsCount; $i++) {
            $teamc->registerTeam($conn, (object)array("leaderId" => $faker->numberBetween(1, 6), "tournamentId" => $j, "players" => (object)array((object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99)), (object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99)), (object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99)), (object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99)), (object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99)), (object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99)), (object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99)), (object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99)), (object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99)), (object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99)), (object)array("name" => $faker->name(), "kitNumber" => $faker->numberBetween(1, 99))), "teamName" => $faker->word()), $pc);
        }
        $j++;
    }
?>