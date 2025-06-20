<?php
// auth/auth.php

class Auth {
    private $conn;
    private $table_name = "users";

    public function __construct($db){
        $this->conn = $db;
    }

    public function login($username, $password) {
        $query = "SELECT id, username, password, role FROM " . $this->table_name . " WHERE username = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $username);
        $stmt->execute();
        
        $num = $stmt->rowCount();
        
        if($num > 0){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if(password_verify($password, $row['password'])){
                return array(
                    'success' => true,
                    'user' => array(
                        'id' => $row['id'],
                        'username' => $row['username'],
                        'role' => $row['role']
                    )
                );
            }
        }
        
        return array('success' => false, 'message' => 'Invalid credentials');
    }

    public function generateToken($user_id) {
        $payload = array(
            'user_id' => $user_id,
            'exp' => time() + (24 * 60 * 60) // 24 hours
        );
        return base64_encode(json_encode($payload));
    }

    public function verifyToken($token) {
        try {
            $payload = json_decode(base64_decode($token), true);
            if($payload['exp'] > time()) {
                return array('success' => true, 'user_id' => $payload['user_id']);
            }
        } catch(Exception $e) {
            // Token is invalid 
        }
        return array('success' => false);
    }
}
?>

