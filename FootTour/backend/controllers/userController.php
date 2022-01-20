<?php
class UserController{

    function getNameById($conn, $id){
        $sql = "SELECT name FROM foottour.users WHERE id = '$id'";
        $result = $conn->query($sql);
        return mysqli_fetch_row($result);
        
    }
}
?>
