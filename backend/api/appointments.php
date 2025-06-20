<?php
// api/appointments.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../auth/auth.php';

class Appointment {
    private $conn;
    private $table_name = "appointments";

    public function __construct($db){
        $this->conn = $db;
    }

    public function create($data) {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET first_name=:first_name, last_name=:last_name, email=:email, 
                      phone=:phone, appointment_date=:appointment_date, 
                      appointment_time=:appointment_time, appointment_type=:appointment_type, 
                      guests=:guests, notes=:notes, confirmation_code=:confirmation_code";

        $stmt = $this->conn->prepare($query);

        // Generate confirmation code
        $confirmation_code = 'KWM-' . strtoupper(substr(md5(uniqid()), 0, 8));

        $stmt->bindParam(":first_name", $data['first_name']);
        $stmt->bindParam(":last_name", $data['last_name']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":phone", $data['phone']);
        $stmt->bindParam(":appointment_date", $data['appointment_date']);
        $stmt->bindParam(":appointment_time", $data['appointment_time']);
        $stmt->bindParam(":appointment_type", $data['appointment_type']);
        $stmt->bindParam(":guests", $data['guests']);
        $stmt->bindParam(":notes", $data['notes']);
        $stmt->bindParam(":confirmation_code", $confirmation_code);

        if($stmt->execute()){
            return array(
                'success' => true,
                'message' => 'Appointment created successfully',
                'confirmation_code' => $confirmation_code,
                'id' => $this->conn->lastInsertId()
            );
        }

        return array('success' => false, 'message' => 'Unable to create appointment');
    }

    public function read($limit = 50, $offset = 0, $status = null) {
        $query = "SELECT * FROM " . $this->table_name;
        
        if($status) {
            $query .= " WHERE status = :status";
        }
        
        $query .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";

        $stmt = $this->conn->prepare($query);
        
        if($status) {
            $stmt->bindParam(":status", $status);
        }
        
        $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
        $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
        $stmt->execute();

        $appointments = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $appointments[] = $row;
        }

        return $appointments;
    }

    public function update($id, $data) {
        $query = "UPDATE " . $this->table_name . " 
                  SET status=:status 
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":status", $data['status']);
        $stmt->bindParam(":id", $id);

        if($stmt->execute()){
            return array('success' => true, 'message' => 'Appointment updated successfully');
        }

        return array('success' => false, 'message' => 'Unable to update appointment');
    }

    public function delete($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);

        if($stmt->execute()){
            return array('success' => true, 'message' => 'Appointment deleted successfully');
        }

        return array('success' => false, 'message' => 'Unable to delete appointment');
    }

    public function getStats() {
        $stats = array();
        
        // Total appointments
        $query = "SELECT COUNT(*) as total FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $stats['total'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Pending appointments
        $query = "SELECT COUNT(*) as pending FROM " . $this->table_name . " WHERE status = 'pending'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $stats['pending'] = $stmt->fetch(PDO::FETCH_ASSOC)['pending'];
        
        // Confirmed appointments
        $query = "SELECT COUNT(*) as confirmed FROM " . $this->table_name . " WHERE status = 'confirmed'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $stats['confirmed'] = $stmt->fetch(PDO::FETCH_ASSOC)['confirmed'];
        
        // Today's appointments
        $query = "SELECT COUNT(*) as today FROM " . $this->table_name . " WHERE appointment_date = CURDATE()";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $stats['today'] = $stmt->fetch(PDO::FETCH_ASSOC)['today'];
        
        return $stats;
    }
}

// Handle the request
$database = new Database();
$db = $database->getConnection();
$appointment = new Appointment($db);
$auth = new Auth($db);

$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'GET':
        if(isset($_GET['stats'])) {
            // Get statistics
            $stats = $appointment->getStats();
            echo json_encode($stats);
        } else {
            // Get appointments
            $limit = isset($_GET['limit']) ? $_GET['limit'] : 50;
            $offset = isset($_GET['offset']) ? $_GET['offset'] : 0;
            $status = isset($_GET['status']) ? $_GET['status'] : null;
            
            $appointments = $appointment->read($limit, $offset, $status);
            echo json_encode($appointments);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        
        if(isset($data['action']) && $data['action'] === 'login') {
            // Handle login
            $result = $auth->login($data['username'], $data['password']);
            if($result['success']) {
                $token = $auth->generateToken($result['user']['id']);
                $result['token'] = $token;
            }
            echo json_encode($result);
        } else {
            // Create appointment
            $result = $appointment->create($data);
            echo json_encode($result);
        }
        break;
        
    case 'PUT':
        // Check authentication for admin operations
        $headers = getallheaders();
        $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;
        
        if(!$token) {
            echo json_encode(array('success' => false, 'message' => 'No token provided'));
            break;
        }
        
        $auth_result = $auth->verifyToken($token);
        if(!$auth_result['success']) {
            echo json_encode(array('success' => false, 'message' => 'Invalid token'));
            break;
        }
        
        $data = json_decode(file_get_contents("php://input"), true);
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        
        if($id) {
            $result = $appointment->update($id, $data);
            echo json_encode($result);
        } else {
            echo json_encode(array('success' => false, 'message' => 'ID required'));
        }
        break;
        
    case 'DELETE':
        // Check authentication for admin operations
        $headers = getallheaders();
        $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;
        
        if(!$token) {
            echo json_encode(array('success' => false, 'message' => 'No token provided'));
            break;
        }
        
        $auth_result = $auth->verifyToken($token);
        if(!$auth_result['success']) {
            echo json_encode(array('success' => false, 'message' => 'Invalid token'));
            break;
        }
        
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        
        if($id) {
            $result = $appointment->delete($id);
            echo json_encode($result);
        } else {
            echo json_encode(array('success' => false, 'message' => 'ID required'));
        }
        break;
        
    default:
        echo json_encode(array('success' => false, 'message' => 'Method not allowed'));
        break;
}
?>

