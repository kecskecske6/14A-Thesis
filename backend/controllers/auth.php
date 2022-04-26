<?php
    require_once __DIR__ . '/../vendor/autoload.php';
    use Firebase\JWT\JWT;

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

    function checkExpire($token, $key, $decoded){
        if($decoded->exp > time()){
            return true;
        }
        else{
            return false;

        }
    }

    class Auth{
        function authorize(){
            $key = "FootTourSecret";
        try {
            $authHeader = getAuthorizationHeader();
            $temp_header = explode(" ", $authHeader);
            $jwt = $temp_header[1];
            JWT::$leeway = 10;
            $decoded = JWT::decode($jwt, $key, array('HS256'));
            if(checkExpire($jwt, $key, $decoded) == true){
            return $decoded->type;
            }
            else{
              return null;
            }
        }
        catch (Exception $e) {
            return null;
        }
    }
    }
?>