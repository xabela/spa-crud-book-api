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

//ambil posted data
$data = json_decode(file_get_contents("php://input")); //php://input ini fungsinya kayak $_POST
//php://input can give you the raw bytes of the data. This is useful if the 
//POSTed data is a JSON encoded structure, which is often the case for an AJAX POST request.
//memastikan data ga kosong
// $tesData = $_POST['name'];
// echo json_encode([
//     'message' => $data
// ]); //kasi tau user
// return;
if (
    !empty($data->name) &&
    !empty($data->price) &&
    !empty($data->description) &&
    !empty($data->category_id)
) {
    //ambil isian dari properti buku
    $book->name = $data->name;
    $book->price = $data->price;
    $book->description = $data->description;
    $book->category_id = $data->category_id;
    $book->created = date('Y-m-d H:i:s');

    //create book
    if($book->create()) {
        http_response_code(201); //201 for created
        echo json_encode(array("message => Book was created")); //kasi tau user
    }

    else {
        http_response_code(503); //503 for service unvailable
        echo json_encode(array("message" => "Unable to create product."));

    }
}
//kasi tau data ga lengkap
else {
    http_response_code(400); //400 for bad req
    echo json_encode(array("message" => "Unable create book. Data is incomplete"));
}
?>