function createCategory() {
    var form_data = {
        'name' : $("#cat-name").val(),
        'description' : $("#cat-description").val(),
    };
    form_data = JSON.stringify(form_data);
    ajaxCreateCategory(form_data);
    changeTitle("Create Category");
};
createCategory();    

