<?php
    class DB{
        private $conn;

        function __construct()
        {
            $url = getenv('JAWSDB_MARIA_URL');
            $dbparts = parse_url($url);
            $this->conn = new mysqli($dbparts['host'], $dbparts['user'], $dbparts['pass'], ltrim($dbparts['path'], '/'));
            mysqli_set_charset($this->conn, 'utf8');
            if ($this->conn->connect_error) die("Connection failed: " . $this->conn->connect_error);
        }

        function getConnection()
        {
            return $this->conn;
        }
    }
?>