<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
    include_once "../api/connect.php";
    include_once "../classes/tournament.php";
    require_once('../vendor/autoload.php');
    use Firebase\JWT\JWT;
    
    $key = "FootTourSecret";
    $decoded = null;

    function getAuthorizationHeader(){
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        }
        else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            //print_r($requestHeaders);
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }
    try {
        $authHeader = getAuthorizationHeader();
        $temp_header = explode(" ", $authHeader);
        $jwt = $temp_header[1];
        JWT::$leeway = 10;
        $decoded = JWT::decode($jwt, $key, array('HS256'));
    }
    catch (Exception $e) {
        http_response_code(401);
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            createTournament();
            http_response_code(200);
    }
   elseif ($_SERVER['REQUEST_METHOD'] === 'GET')
    {
       getTournamentByUserId();
    }
    
    function createTournament(){
        $request = json_decode(file_get_contents("php://input"));
        $id = $decoded->data->id;
        $sql = "INSERT INTO foottour.tournaments (organizer_id, start_date, end_date, name, location,
        entry_fee, description, teams_count) VALUES ('$id', '$request->startDate', '$request->endDate',
        '$request->name', '$request->location', '$request->entryFee', '$request->description', '$request->teamsCount')";
        $conn->query($sql);
    }

    function getTournamentByUserId(){
        $postdata = $_GET['id'];
        echo json_encode($decoded);
        if ($postdata == $decoded->data->id) {
            $tournaments = array();
            $sql = "SELECT * from foottour.tournaments WHERE organizer_Id = '$postdata'";
            $result = $conn->query($sql);
            $count = mysqli_num_rows($result);
            if ($count > 0) {
                $i = 0;
                while ($row = $result->fetch_assoc()) {
                    $tournaments[$i]["id"] = $row["id"];
                    $tournaments[$i]["organizerId"] = $row["organizer_id"];
                    $tournaments[$i]["startDate"] = $row["start_date"];
                    $tournaments[$i]["endDate"] = $row["end_date"];
                    $tournaments[$i]["name"] = $row["name"];
                    $tournaments[$i]["location"] = $row["location"];
                    $tournaments[$i]["bestPlayer"] = $row["best_player"];
                    $tournaments[$i]["topScorer"] = $row["top_scorer"];
                    $tournaments[$i]["bestGoalkeeper"] = $row["best_goalkeeper"];
                    $tournaments[$i]["entryFee"] = $row["entry_fee"];
                    $tournaments[$i]["teamsCount"] = $row["teams_count"];
                    $tournaments[$i]["description"] = $row["description"];
                    $i++;
                }
                http_response_code(200);
                echo json_encode($tournaments);
            }else{
                http_response_code(404);
            }
        }
        else{
        http_response_code(401);
        }
    }
    $conn->close();
?>