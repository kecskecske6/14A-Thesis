<?php
include_once "header.php";
include_once "../api/connect.php";
include_once "../classes/user.php";
include_once "auth.php";

$auth = new Auth();

if($auth->authorize() != null){
    login($conn);
}
    function login($conn){
        $postdata = $_GET['id'];
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
    }
?>
