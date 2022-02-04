<?php
    class DB{
        private $conn;

        function __construct()
        {
            $config = parse_ini_file('../config.ini');
            $this->conn = new mysqli($config['db_host'], $config['db_user'], $config['db_pass'], $config['db_name']);
            mysqli_set_charset($this->conn, 'utf8');
            if ($this->conn->connect_error) die("Connection failed: " . $this->conn->connect_error);
        }

        function getConnection()
        {
            return $this->conn;
        }
    }
?>