<?php
class Category {
    //konekin ke db dan nama tabel
    private $conn;
    private $table_name = 'categories';

    //objek properties
    public $id;
    public $name;
    public $description;
    public $created;

    //konstruktor dengan $db sebagai db connection
    public function __construct($db) {
        $this->conn = $db;
    }

    //query di dropdown nanti
    function readAll() {
        $query = "SELECT 
                    id, name, description
                FROM
                " . $this->table_name . " 
                ORDER BY
                    name";

        $stmt = $this->conn->prepare($query);

        //execute query
        $stmt->execute();

        return $stmt;
    }

    function read() {
        $query = "SELECT 
                    id, name, description
                FROM
                " . $this->table_name . " 
                ORDER BY
                    name";

        $stmt = $this->conn->prepare($query);

        //execute query
        $stmt->execute();

        return $stmt;
    }

    function readOne() {
        //query untuk ambil single record
        $query = "SELECT
                    id, name, description, created 
                FROM
                    " . $this->table_name . " 
                WHERE
                    id = ?
                LIMIT
                    0,1";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(1, $this->id); //ambil id dr bukunya

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC); //mengembalikan barisnya

        //set values objek bukunya berdasarkan id tadi
        $this->name = $row['name'];
        $this->description = $row['description'];
        $this->created = $row['created'];
    }

    function create() {
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    name=:name, description=:description, created=:created";
                
        $stmt = $this->conn->prepare($query);

        //membersihkan inputan dr user jd diambil isinya aja
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->created=htmlspecialchars(strip_tags($this->created));

        //ambil nilainya trs dimasukin ke query atasnya itu (bind values)
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
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
                    description = :description 
                WHERE
                    id = :id";
        
        $stmt = $this->conn->prepare($query);

         //membersihkan inputan dr user jd diambil isinya aja
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->id=htmlspecialchars(strip_tags($this->id)); //KALO UPDATE YG DIAMBIL ID NYA GAPAKE CREATENYA

        //ambil nilainya trs dimasukin ke query atasnya itu (bind values)
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
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

}
?>