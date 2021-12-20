<!-- //https://www.youtube.com/watch?v=33Jc59xW_dw -->

<?php
include_once("connect.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$name = $request->email;
$password = $request->password;

$sql = "SELECT id, name, email FROM users";
$result = $conn->query($sql);


?>