<?php

header("Acces-Control-Allow_origin: *");
header("Content-Type: application/json; charset=UTF-8");
//create.php dapet diakses semua orang (*), data2nya dikembaliin dalam bentuk json
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../objects/category.php';

//instantiasi db dan objek buku
$database = new Database();
$db = $database->getConnection();

//inisialisasi objek
$category = new Category($db);

//set properti ID dari record yg mau diambil
$category->id = isset($_GET['id']) ? $_GET['id'] : die();

//baca detail produknya
$category->readOne();

if($category->name!=null) {
    //buat array
    $category_arr = array(
        "id" => $category->id,
        "name" => $category->name,
        "description" => $category->description,
        "created" => $category->created
    );

    http_response_code(200);
    echo json_encode($category_arr); //buat ke format json
} else {
    http_response_code(404); //not found
    echo json_encode(array("message" => "Book does not exist"));
}

?>