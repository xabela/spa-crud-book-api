function createBook() {
    let kat = '';
    $.each(list_category, function(key, val) {
        kat += `<option value=' ` + val.id + `'>` + val.name + `</option>`;
    });
    $('#create-category').html(kat);
        var form_data = {
            'name' : $("#create-name").val(),
            'price' : $("#create-price").val(),
            'description' : $("#create-description").val(),
            'category_id' : $("#create-category").val(),
        };
        form_data = JSON.stringify(form_data);
        ajaxCreate(form_data)
        changeTitle("Create Book");
};
createBook();    
