var url = new URL(window.location.href)
var id = url.searchParams.get("id")

function updateBook(id) {
    $.getJSON("http://localhost:5000/api/book/read_one.php?id=" + id, function (data) {
        var name = data.name;
        var price = data.price;
        var description = data.description;
        var category_id = data.category_id;
        var id = data.id;

        $("#update-name").val(name);
        $("#update-price").val(price);
        $("#update-description").val(description);
        $('#id-book').val(id);
        let kat = '';
        $.each(list_category, function(key, val) {
            if (val.id == id) { kat += `<option value='` + val.id + `' selected>` + val.name + `</option>`; }
            else { kat += `<option value='` + val.id + `'>` + val.name + `</option>`; }
        });
        $('#update-category').html(kat);
        $(document).on('click', '#submit-update-book-form', function(e) {
            var form_data = {
                'name' : $("#update-name").val(), 
                'price' : $("#update-price").val(),
                'description' : $("#update-description").val(),
                'id' : $('#id-book').val(),
                'category_id' : $("#update-category").val(),
            };
            console.log(form_data);
            form_data = JSON.stringify(form_data);
            ajaxUpdate(form_data);
        });
        changeTitle('Update Book')
    });
}

updateBook(id);
