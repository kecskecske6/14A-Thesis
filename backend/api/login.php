<?php
include_once("../controllers/header.php");
include_once("connect.php");
include_once("../classes/user.php");
require_once("../vendor/autoload.php");
use \Firebase\JWT\JWT;

define('SECRET_KEY', 'FootTourSecret');
define('ALGORITHM', 'HS256');

$db = new DB();
$conn = $db->getConnection();
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $email = $request->email;
    $sql = "SELECT * from foottour.users WHERE email = '$email'";
    $result = $conn->query($sql);
    $row = mysqli_fetch_row($result);
    $password = password_verify($request->password, $row[3]);
    if (!$password) {
        http_response_code(401);
        echo json_encode(array("message" =>"Hibás felhasználó név vagy jelszó!"));
        return;
    }
    $count = mysqli_num_rows($result);
    if ($count == 1) {
        $user = new User();
        $iat = time();
        $nbf = $iat + 10;
        $exp = $iat + 3600;
        $_SESSION["name"] = $row[1];
        $user->id = $row[0];
        $user->name = $row[1];
        $user->email = $row[2];
        $user->password = $row[3];
        $user->isDeleted=$row[4];
        $user->isOrganizer=$row[5];
        $user->isReferee=$row[6];
        $user->isLeader=$row[7];
        $token = array(
            "iss" => "localhost",
            "aud" => "www.FootTour.com",
            "iat" => $iat,
            "nbf" => $nbf,
            "exp" => $exp,
            "data" => $user
        );
        http_response_code(200);
        $jwt = JWT::encode($token, SECRET_KEY);

        $data_insert = array(
            'access_token' => $jwt,
            'time' => time(),
            'status' => "success",
            'id' => $row[0],
            'name' => $row[1]
        );
        echo json_encode($data_insert);
    }
    if($count == 0){
        http_response_code(401);
        echo json_encode(array("message" =>"Hibás felhasználó név vagy jelszó!"));
    }
}
$conn->close();
?>