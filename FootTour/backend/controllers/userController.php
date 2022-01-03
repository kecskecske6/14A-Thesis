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
include_once "../classes/user.php";
require_once('../vendor/autoload.php');
use Firebase\JWT\JWT;

$key = "FootTourSecret" ;

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


        $authHeader = getAuthorizationHeader();
	    $temp_header = explode(" ", $authHeader);
	    $jwt = $temp_header[1];
        $postdata = $_GET['id'];
        try{
            JWT::$leeway = 10;
            $decoded = JWT::decode($jwt, $key, array('HS256'));
            $sql = "SELECT * from foottour.users WHERE id = '$postdata'";
            $result = $conn->query($sql);
            $row = mysqli_fetch_row($result);
            $user = new User();
            $user->id = $postdata;
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
