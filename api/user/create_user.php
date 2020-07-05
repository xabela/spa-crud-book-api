<?php

header("Acces-Control-Allow_origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/user.php';

//instantiasi db dan objek buku
$database = new Database();
$db = $database->getConnection();

//inisialisasi objek
$user = new User($db);

//ambil posted data
$data = json_decode(file_get_contents("php://input")); //php://input ini fungsinya kayak $_POST

$user->firstname = $data->firstname;
$user->lastname = $data->lastname;
$user->email = $data->email;
$user->password = $data->password;

if (
    !empty($user->firstname) &&
    !empty($user->lastname) &&
    !empty($user->email) &&
    !empty($data->password) &&
    $user-> create()
) {
        http_response_code(200); //201 for created
        echo json_encode(array("message => User was created")); //kasi tau user
    }
    else {
        http_response_code(400); //503 for service unvailable
        echo json_encode(array("message" => "Unable to create user."));

    }
?>