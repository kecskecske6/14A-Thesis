<?php
include_once("../../controllers/auth.php");
include_once("../../controllers/header.php");
include_once("../../controllers/drawController.php");
include_once("../connect.php");

$auth = new Auth();
$dc = new DrawController();
$db = new DB();
$conn = $db->getConnection();

if($auth->authorize() == "organizer"){
    $postdata = json_decode(file_get_contents("php://input"));
    echo json_encode($dc->makeDraw($conn, $postdata));
}
else{
    http_response_code(401);
}

?>