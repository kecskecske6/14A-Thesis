<?php

require_once __DIR__ . '/../vendor/autoload.php';
use \Firebase\JWT\JWT;

use function PHPSTORM_META\type;

define('SECRET_KEY', 'FootTourSecret');
define('ALGORITHM', 'HS256');

class UserController{

    function getNameById($conn, $id){
        $sql = "SELECT name FROM foottour.users WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if($stmt === false) return false;
        $id = htmlspecialchars(strip_tags($id));
        $stmt->bind_param("i",$id);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        $result = $result->fetch_object();
        return $result->name;
    }

    function getByType($conn, $type) {
        $sql = "";
        if ($type == "organizer")
        $sql = "SELECT * from foottour.users where isOrganizer = true;";
        elseif ($type == "referee")
        $sql = "SELECT * from foottour.users where isReferee = true;";
        else $sql = "SELECT * from foottour.users where isLeader = true;";
        $stmt = $conn->prepare($sql);
        if ($stmt == false) return false;
        if ($stmt->execute() == false) return false;
        $result = $stmt->get_result();
        $users = array();
        while($row = $result->fetch_object()){
            array_push($users,$row);
        }
        return $users;
    }

    function getTypeOfTheUser($conn, $id){
        $sql = "SELECT * FROM foottour.users WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if($stmt === false) return false;
        $id = htmlspecialchars(strip_tags($id));
        $stmt->bind_param("i",$id);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        $result = $result->fetch_object();
        if($result->isOrganizer == true)
            return "organizer";
        elseif($result->isReferee == true)
            return "referee";
        else
            return "leader";
    }

    function login($conn, $postdata)
    {
        $uc = new UserController();
        $sql = "SELECT * from foottour.users where email = '" . $postdata->email . "';";
        $result = $conn->query($sql);
        $count = mysqli_num_rows($result);
        if ($count == 1) {
            $row = mysqli_fetch_row($result);
            $password = password_verify($postdata->password, $row[3]);
            if (!$password) {
                http_response_code(401);
                return array("message" => "Helytelen jelszó!");
            }
            $user = new User();
            $iat = time();
            $nbf = $iat + 10;
            $exp = $iat + 3600;
            $_SESSION["name"] = $row[1];
            $user->id = $row[0];
            $user->name = $row[1];
            $user->email = $row[2];
            $user->password = $row[3];
            $user->isDeleted = $row[4];
            $user->isOrganizer = $row[5];
            $user->isReferee = $row[6];
            $user->isLeader = $row[7];
            $token = array(
                "iss" => "localhost",
                "aud" => "www.FootTour.com",
                "iat" => $iat,
                "nbf" => $nbf,
                "exp" => $exp,
                "data" => $user,
                'type' => $uc->getTypeOfTheUser($conn, $row[0])
            );
            http_response_code(200);
            $jwt = JWT::encode($token, SECRET_KEY);
            $data_insert = array(
                'access_token' => $jwt,
                'time' => time(),
                'status' => "success",
                'id' => $row[0],
                'name' => $row[1],
                'type' => $uc->getTypeOfTheUser($conn, $row[0])
            );
            return $data_insert;
        }
        if ($count == 0) {
            http_response_code(401);
            return array("message" => "A megadott felhasználó nem létezik!");
        }
    }

    function register($conn, $postdata)
    {
        $password = password_hash($postdata->password, PASSWORD_DEFAULT);
        $sql = "INSERT into foottour.users (name, email, password, isDeleted, isOrganizer, isReferee, isLeader) values ('" . $postdata->name . "', '" . $postdata->email . "', '" . $password . "', false, false, false, false);";
        $result = $conn->query($sql);
        if ($result !== TRUE) die($conn->error);
        $sql = "SELECT last_insert_id();";
        $result = $conn->query($sql);
        $user = [
            'id' => $result,
            'email' => $postdata->email,
            'password' => $password,
            'name' => $postdata->name,
            'isDeleted' => false,
            'isOrganizer' => false,
            'isReferee' => false,
            'isLeader' => false,
        ];
        return $user;
    }
}
?>
