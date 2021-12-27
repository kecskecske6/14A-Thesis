<?php
include_once("connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Request-Method: POST");
//header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

$token = null;
$headers = apache_request_headers();

$postdata = file_get_contents("php://input");

print($postdata);

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    $email = $request->email;
    $password = $request->password;
  
    if($email=='asd' && $password=='12345'){

   echo json_encode(
            array(
                "message" => "Successful login.",
                "token" => 'Bearer-jsdfnkj223',
                "email" => $email
            ));
         http_response_code(200);
    }
    else {

       // http_response_code(401);
        echo json_encode(array("message" => "Login failed."));
    }
}
?>