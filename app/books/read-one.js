var url = new URL(window.location.href)
var id = url.searchParams.get("id")
console.log(id)

function readOne(id) {
    // console.log(id);
    $.getJSON("http://localhost:5000/api/book/read_one.php?id=" + id, function(data){
        $('#detail-name').html(data.name)
        $('#detail-price').append(data.price)
        $('#detail-description').html(data.description)
        $('#detail-category').html(data.category_name)
    });
    changeTitle("Detail Buku");
}

readOne(id);
