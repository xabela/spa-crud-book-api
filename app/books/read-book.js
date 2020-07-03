function showBooks(){
    $('#tabel-buku').empty(); //ngosingin isinya dulu, biar pas nambah atau ngehapus langsung bisa ngeload baru
    $.each(list_book.records, function(key,val) {
        $('#tabel-buku').append(`
            <tr>
                <th scope="row">${val.name}</th>
                <td>Rp ${val.price}</td>
                <td>${val.category_name}</td>
                
                <td>
                    <button class="btn btn-primary" id="read-button" data-id='` + val.id +`'>
                        <i class="fa fa-info-circle"></i>
                    </button>
                    <button class="btn btn-info" id="edit-button" data-id='` + val.id +`'>
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" id="delete-button" data-id='` + val.id +`'>
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>`);
    });
    changeTitle("MARLO BOOK STORE");
}

function deleteBook(id_book) {
    console.log(id_book)
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
            $.ajax({
                url: "http://localhost:5000/api/book/delete.php",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({id : id_book}),
                success : function(res) {
                    Swal.fire(
                        'Berhasil dihapus!',
                        'Datamu telah dihapus dari database',
                        'success'
                    )
                    showBooks();
                },
                error: function(xhr,resp, text) {
                    console.log(text);
                }
            })
        }
    })
}

showBooks();

$(document).on('click', '#read-button', function() {
    var id_book = $(this).attr('data-id');
    window.location.href = 'read-one?id=' + id_book;
    changeTitle("Detail Buku");

})
$(document).on('click', '#edit-button', function() {
    var id_book = $(this).attr('data-id');
    window.location.href = 'update-book?id=' + id_book;
})
$(document).on('click', '#delete-button', function() {
    var id_book = $(this).attr('data-id');
    console.log(id_book)
    deleteBook(id_book);
})