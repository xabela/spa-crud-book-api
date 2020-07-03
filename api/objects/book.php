<?php
class Book {
    //konekin ke db dan nama tabel
    private $conn;
    private $table_name = 'books';

    //objek properties
    public $id;
    public $name;
    public $description;
    public $price;
    public $category_id;
    public $category_name;
    public $created;

    //konstruktor dengan $db sebagai db connection
    public function __construct($db) {
        $this->conn = $db;
    }

    //query buat ambil semua 
    function read() {
        $query = "SELECT 
                    c.name as category_name, c.id as category_id, b.id, b.name, b.description, b.price, b.created
                FROM
                " . $this->table_name . " b 
                INNER JOIN
                    categories c
                        ON b.category_id = c.id
                ORDER BY
                    b.created DESC";

        $stmt = $this->conn->prepare($query);

        //execute query
        $stmt->execute();

        return $stmt;
    }

    function create() {
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    name=:name, price=:price, description=:description, category_id=:category_id, created=:created";
                
        $stmt = $this->conn->prepare($query);

        //membersihkan inputan dr user jd diambil isinya aja
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->price=htmlspecialchars(strip_tags($this->price));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->category_id=htmlspecialchars(strip_tags($this->category_id));
        $this->created=htmlspecialchars(strip_tags($this->created));

        //ambil nilainya trs dimasukin ke query atasnya itu (bind values)
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":created", $this->created);

        if($stmt->execute()) {
            return true;
        }
    }

    function update() {
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    name = :name,
                    price = :price,
                    description = :description,
                    category_id = :category_id    
                WHERE
                    id = :id";
        
        $stmt = $this->conn->prepare($query);

         //membersihkan inputan dr user jd diambil isinya aja
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->price=htmlspecialchars(strip_tags($this->price));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->category_id=htmlspecialchars(strip_tags($this->category_id));
        $this->id=htmlspecialchars(strip_tags($this->id)); //KALO UPDATE YG DIAMBIL ID NYA GAPAKE CREATENYA

        //ambil nilainya trs dimasukin ke query atasnya itu (bind values)
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;

    }

    function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

        $stmt = $this->conn->prepare($query);
        //membersihkan dr karakter2
        $this->id = htmlspecialchars(strip_tags($this->id));

        //bind id nya buat didelete
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    function readOne() {
        //query untuk ambil single record
        $query = "SELECT
                    c.name as category_name, c.id as category_id, b.id, b.name, b.description, b.price, b.created
                FROM
                    " . $this->table_name . " b
                    INNER JOIN
                        categories c
                            on b.category_id = c.id
                WHERE
                    b.id = ?
                LIMIT
                    0,1";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(1, $this->id); //ambil id dr bukunya

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC); //mengembalikan barisnya

        //set values objek bukunya berdasarkan id tadi
        $this->name = $row['name'];
        $this->price = $row['price'];
        $this->description = $row['description'];
        $this->category_id = $row['category_id'];
        $this->category_name = $row['category_name'];
    }

    function search($keywords) {
        $query = "SELECT 
                    c.name as category_name, c.id as category_id, b.id, b.name, b.description, b.price, b.created
                FROM
                " . $this->table_name . " b 
                INNER JOIN
                    categories c
                        ON b.category_id = c.id
                WHERE
                    b.name LIKE ? OR b.description LIKE ? OR c.name LIKE ?
                ORDER BY
                    b.created DESC";

        $stmt = $this->conn->prepare($query);

        //santize aliaz membersihkan keyword
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        //bind aliaz mengikat
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);

        //execute query
        $stmt->execute();

        return $stmt;
    }

    public function readPaging($from_record_num, $records_per_page) {
        $query = "SELECT 
                    c.name as category_name, c.id as category_id, b.id, b.name, b.description, b.price, b.created
                FROM
                " . $this->table_name . " b 
                INNER JOIN
                    categories c
                        ON b.category_id = c.id
                ORDER BY
                    b.created DESC
                LIMIT ?, ?";
        
        $stmt = $this->conn->prepare($query);

        //bind nilai variabel
        $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT); //PARAM INT biar ga ada quotes di querynya
        $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt;
    }

    function count() {
        $query = "SELECT COUNT(*) as total_rows from " . $this->table_name . "";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
}

?>