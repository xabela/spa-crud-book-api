<?php

header("Acces-Control-Allow_origin: *");
header("Content-Type: application/json; charset=UTF-8");
//read.php dapet diakses semua orang (*), data2nya dikembaliin dalam bentuk json

//database connection
include_once '../config/core.php';
include_once '../config/database.php';
include_once '../objects/book.php';

//instantiasi db dan objek buku
$database = new Database();
$db = $database->getConnection();

//inisialisasi objek
$book = new Book($db);

$keywords = isset($_GET["s"]) ? $_GET["s"] : "";

//query buku
$stmt = $book->search($keywords);
$num = $stmt->rowCount();


//ini sama kayak read.php sebernya cuman yg diread yg sesuai keyword
if($num > 0) {
    //array buku
    $books_arr = array();
    $books_arr["records"]=array(); //var array records isinya banyak objek

    //mengembalikan isi dari tabel, pake fetch soalnya lebih cpt drpd fetchAll()
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
        array_push($books_arr["records"], $book_item); 
    }

    http_response_code(200);

    //nampilin dalam bentuk json
    echo json_encode($books_arr);

} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No Books Found")
    );
};



?>