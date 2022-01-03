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
require_once('../vendor/autoload.php');
use Firebase\JWT\JWT;

define('SECRET_KEY','FootTourSecret'); 
define('ALGORITHM','HS256');   

        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
	    $temp_header = explode(" ", $authHeader);
	    $jwt = $temp_header[1];
        try{
            JWT::$leeway = 10;
            $decoded = JWT::decode($jwt, SECRET_KEY, array(ALGORITHM));
            $request = json_decode($postdata);
            $id = $request->id;
            $sql = "SELECT * from foottor.users WHERE id = '$id'";
            $result = $conn->query($sql);
            $row = mysqli_fetch_row($result);
            $user = new User;
            $user->id = $id;
            $user->name = $row[1];
            $user->email = $row[2];
            $user->password = $row[3];
            $user->isDeleted=$row[4];
            $user->isOrganizer=$row[5];
            $user->isReferee=$row[6];
            $user->isLeader=$row[7];
            http_response_code(200);
            echo json_encode($user);
    }catch(Exception $e){
        http_response_code(401);
    }
?>
