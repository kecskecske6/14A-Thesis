<?php
include_once("connect.php");
include_once("../classes/user.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Request-Method: POST");
header("Access-Control-Allow-Headers: *");

$token = null;
$headers = apache_request_headers();
$postdata = file_get_contents("php://input");
$user = new User();

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);
    $email = $request->email;
    $password = $request->password;
    $sql = "SELECT * from foottour.users WHERE email = '$email' and password = '$password'";
    $result = $conn->query($sql);
    $count = mysqli_num_rows($result);
    if ($count == 1) {
        $row = mysqli_fetch_row($result);
        $user->id = $row[0];
        $user->name = $row[1];
        $user->email = $row[2];
        $user->isDeleted = $row[4];
        $user->isOrganizer = $row[5];
        $user->isReferee = $row[6];
        $user->isLeader = $row[7];
            echo json_encode($user);
            http_response_code(200);
    }
    if($count == 0){
        http_response_code(401);
        echo json_encode(array("message" =>"Hibás felhasználó név vagy jelszó!"));
    }
}
$conn->close();
?>