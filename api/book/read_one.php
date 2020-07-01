<?php

header("Acces-Control-Allow_origin: *");
header("Content-Type: application/json; charset=UTF-8");
//create.php dapet diakses semua orang (*), data2nya dikembaliin dalam bentuk json
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../objects/book.php';

//instantiasi db dan objek buku
$database = new Database();
$db = $database->getConnection();

//inisialisasi objek
$book = new Book($db);

//set properti ID dari record yg mau diambil
$book->id = isset($_GET['id']) ? $_GET['id'] : die();

//baca detail produknya
$book->readOne();

if($book->name!=null) {
    //buat array
    $book_arr = array(
        "id" => $book->id,
        "name" => $book->name,
        "description" => $book->description,
        "price" => $book->price,
        "category_id" => $book->category_id,
        "category_name" => $book->category_name
    );

    http_response_code(200);
    echo json_encode($book_arr); //buat ke format json
} else {
    http_response_code(404); //not found
    echo json_encode(array("message" => "Book does not exist"));
}



?>