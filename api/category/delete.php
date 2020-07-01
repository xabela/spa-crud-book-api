<?php

header("Acces-Control-Allow_origin: *");
header("Content-Type: application/json; charset=UTF-8");
//create.php dapet diakses semua orang (*), data2nya dikembaliin dalam bentuk json
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/category.php';

//instantiasi db dan objek buku
$database = new Database();
$db = $database->getConnection();

//inisialisasi objek
$category = new Category($db);

//ambil id produk yg mau diupdate
$data = json_decode(file_get_contents("php://input"));

//set properti id dari data yg uda didapet buat diedit
$category->id = $data->id;

if($category->delete()) {
    http_response_code(200);
    echo json_encode(array("message" => "delete successfully"));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "unable delete book"));
}
?>