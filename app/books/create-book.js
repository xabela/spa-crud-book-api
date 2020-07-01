$(document).ready(function() {
    function createBook() {
    $.getJSON("http://localhost:5000/api/category/read.php", function(data) {
            //manggil api kategori
            console.log(data[0]);
            let kat = '';
            $.each(data, function(key, val) {
                console.log(data)
                kat += `<option value=' ` + val.id + `'>` + val.name + `</option>`;
            });
            $('#create-category').html(kat);

            //bakal run pas ngesubmit form
            $(document).on('click', '#submit-create-book-form', function(e) {
                //ambil form datanya trs diubah ke bentuk json
                // var form_data = JSON.stringify($(this).serializeObject());
                var form_data = {
                    'name' : $("#create-name").val(),
                    'price' : $("#create-price").val(),
                    'description' : $("#create-description").val(),
                    'category_id' : $("#create-category").val(),
                };
                form_data = JSON.stringify(form_data);
                // console.log(form_data);
                //masukin form datanya ke api
                $.ajax({
                    url: "http://localhost:5000/api/book/create.php",
                    type: "POST",
                    contentType: "application/json",
                    data: form_data,
                    success: function(result){
                        console.log(result)
                        window.location.href = "read-book"
                    }, 
                    error: function(xhr, resp, text) {
                        console.log(text);
                    }
                });
                // return false;
                // e.preventDefault(e);
            });
            changeTitle("Create Book");
        });
    };

    createBook();    
    //tampilkan form html pas ngeklik create book
    $(document).on('click', '#submit-create-book-form', function() {
        showBooks();
    })
})