<?php
class UserController{

    function getNameById($conn, $id){
        $sql = "SELECT name FROM foottour.users WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if($stmt === false) return false;
        $id = htmlspecialchars(strip_tags($id));
        $stmt->bind_param("i",$id);
        if ($stmt->execute() === false) return false;
        $result = $stmt->get_result();
        return $result->fetch_object();
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

    function login($conn, $postdata)
    {
        
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
        echo json_encode($user);
    }
}
?>
