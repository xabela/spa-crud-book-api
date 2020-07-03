function createCategory() {
    $(document).on('click', '#submit-create-cat-form', function(e) {
        var form_data = {
            'name' : $("#cat-name").val(),
            'description' : $("#cat-description").val(),
        };
        console.log(form_data)
        form_data = JSON.stringify(form_data);
        ajaxCreateCategory(form_data);
    });
    changeTitle("Create Category");
};

createCategory();    
$(document).on('click', '#submit-create-cat-form', function() {
    showCategories();
})
