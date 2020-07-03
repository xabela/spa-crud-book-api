<?php

header("Acces-Control-Allow_origin: *");
header("Content-Type: application/json; charset=UTF-8");
//read.php dapet diakses semua orang (*), data2nya dikembaliin dalam bentuk json

//database connection
include_once '../config/database.php';
include_once '../objects/book.php';

//instantiasi db dan objek buku
$database = new Database();
$db = $database->getConnection();

//inisialisasi objek
$book = new Book($db);

//read buku dari database

$stmt = $book->read();
$num = $stmt->rowCount(); //hitung banyak rownya

http_response_code(200);

//nampilin dalam bentuk json
echo json_encode($num);

?>