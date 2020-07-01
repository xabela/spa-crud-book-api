$(document).ready(function() {
    showBooks();
    $(document).on('click', '.read-book-button', function() {
        showBooks();
    });
});

function showBooks(){
    //ambil list booknya dari API
    $('#tabel-buku').empty(); //ngosingin isinya dulu, biar pas nambah atau ngehapus langsung bisa ngeload baru

    $.getJSON("http://localhost:5000/api/book/read.php", function(data) {
        console.log(data);
        $.each(data.records, function(key,val) {
            $('#tabel-buku').append(`
                <tr>
                    <th scope="row">${val.name}</th>
                    <td>Rp ${val.price}</td>
                    <td>${val.category_name}</td>
                    
                    <td>
                        <button class="btn btn-primary" id="read-button" data-id='` + val.id +`'>
                            Read
                        </button>
                        <button class="btn btn-info" id="edit-button" data-id='` + val.id +`'>
                            Edit
                        </button>
                        <button class="btn btn-danger" id="delete-button" data-id='` + val.id +`'>
                            Delete
                        </button>
                    </td>
                </tr>`);
        });
        changeTitle("Toko Buku Bahagia");
    });
}

$(document).on('click', '#read-button', function() {
    var book_id = $(this).attr('data-id');
    console.log(book_id);
})
$(document).on('click', '#delete-button', function() {
    Swal.fire({
        title: 'Yakin akan menghapus?',
        text: "Data yang sudah dihapus tidak bisa dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!'
    }).then((result) => {
        if (result.value) {
            var book_id = $(this).attr('data-id');
            $.ajax({
                url: "http://localhost:5000/api/book/delete.php",
                type: "POST",
                dataType: 'json',
                data : JSON.stringify({id : book_id}),
                success : function(res) {
                    Swal.fire(
                        'Berhasil dihapus!',
                        'Datamu telah dihapus dari database',
                        'success'
                    )
                    showBooks();
                },
                error: function(xhr,resp, text) {
                    console.log(xhr, resp, text);
                }
            })
        }
    })
})