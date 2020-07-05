function showCategories(){
    $('#tabel-category').empty(); 
    $.each(list_category, function(key,val) {
        $('#tabel-category').append(`
            <tr>
                <th scope="row">${val.name}</th>
                <td>${val.description}</td>

                <td>
                    <button class="btn btn-primary" id="read-button" data-id='` + val.id +`'>
                        <i class="fa fa-info-circle"></i>
                    </button>
                    <button class="btn btn-info" id="edit-button" data-id='` + val.id +`'>
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" id="delete-button-category" data-id='` + val.id +`'>
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>`);
    });
    changeTitle("LIST CATEGORY");
}

function deleteCategory(id_category) {
    // console.log(id_category)
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
                url: "http://localhost:5000/api/category/delete.php",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({id : id_category}),
                success : function(res) {
                    Swal.fire(
                        'Berhasil dihapus!',
                        'Datamu telah dihapus dari database',
                        'success'
                    )
                    getCategory()
                    setTimeout(function(){ 
                        showCategories()
                    }, 100);
                },
                error: function(xhr,resp, text) {
                    console.log(text);
                }
            })
        }
    })
}

showCategories();

$(document).on('click', '#delete-button-category', function() {
    var id_category = $(this).attr('data-id');
    // console.log(id_category)
    deleteCategory(id_category);
})