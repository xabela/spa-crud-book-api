<?php

header("Acces-Control-Allow_origin: *");
header("Content-Type: application/json; charset=UTF-8");
//read.php dapet diakses semua orang (*), data2nya dikembaliin dalam bentuk json

//database connection
include_once '../config/core.php';
include_once '../shared/utilities.php';
include_once '../config/database.php';
include_once '../objects/book.php';

$utilities = new Utilities();

//instantiasi db dan objek buku
$database = new Database();
$db = $database->getConnection();

//inisialisasi objek
$book = new Book($db);

$stmt = $book->readPaging($from_record_num, $records_per_page);
$num = $stmt->rowCount();

if ($num>0) {
    $book_arr=array();
    $book_arr["records"]=array();
    $book_arr["paging"]=array();

     //mengembalikan isi dari tabel, pake fetch soalnya lebih cpt drpd fetchAll()
    //kalo fetchAll itu kdg emg lebih cpt tp memory nya hbs banyak
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // extract row
        // this will make $row['name'] to just $name only
        extract($row);

        $book_item=array(
            "id" => $id,
            "name" => $name,
            "description" => html_entity_decode($description),
            "price" => $price,
            "category_id" => $category_id,
            "category_name" => $category_name
        );
        array_push($book_arr["records"], $book_item); 
    }

    //masukin paging alias pagination tadi
    $total_rows = $book->count();
    $page_url="${$home_url}book/read_paging.php?";
    $paging=$utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
    $book_arr["paging"]=$paging;

    http_response_code(200);
    echo json_encode($book_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "no book found"));
}