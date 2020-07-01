<?php

header("Acces-Control-Allow_origin: *");
header("Content-Type: application/json; charset=UTF-8");
//create.php dapet diakses semua orang (*), data2nya dikembaliin dalam bentuk json
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/book.php';

//instantiasi db dan objek buku
$database = new Database();
$db = $database->getConnection();

//inisialisasi objek
$book = new Book($db);

//ambil id produk yg mau diupdate
$data = json_decode(file_get_contents("php://input"));

//set properti id dari data yg uda didapet buat diedit
$book->id = $data->id;

//set nilai properti buku
$book->name = $data->name;
$book->price = $data->price;
$book->description = $data->description;
$book->category_id = $data->category_id;

if($book->update()) {
    http_response_code(200);
    echo json_encode(array("message" => "update successfully"));
}
else {
    http_response_code(503); //service unvailable
    echo json_encode(array("message" => "unable update book"));
}

?>