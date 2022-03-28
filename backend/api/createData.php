<?php
    require_once '../vendor/autoload.php';
    include_once '../controllers/userController.php';
    include_once '../controllers/tournamentController.php';
    include_once 'connect.php';
    $uc = new UserController();
    $tc = new TournamentController();
    $db = new DB();
    $conn = $db->getConnection();
    $faker = Faker\Factory::create();
    for ($i = 0; $i < 5; $i++) $uc->register($conn, array("name" => $faker->name(), "email" => $faker->unique()->email(), "password" => $faker->password()));
    for ($i = 0; $i < 15; $i++) {
        $startDate = $faker->dateTimeBetween("-2 weeks", "+12 weeks");
        $dateValidator = function($date) {
            return date_diff($this->startDate, $date) > new DateInterval('1 day') && date_diff($this->startDate, $date) < new DateInterval('4 days');
        };
        $tc->createTournament($conn, array("organizerId" => $faker->numberBetween(1, 5), "startDate" => $startDate, "endDate" => $faker->valid($dateValidator)->dateTimeBetween("-2 weeks", "+13 weeks")));
    }
?>