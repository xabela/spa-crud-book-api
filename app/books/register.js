function register() {
        var form_data = {
            'firstname' : $("#firstname").val(),
            'lastname' : $("#lastname").val(),
            'email' : $("#email").val(),
            'password' : $("#password").val(),
        };
        form_data = JSON.stringify(form_data);
        $.ajax({
            url: "http://localhost:5000/api/user/create_user.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                console.log(result);
                goTo(event,'login');
            },
            error: function(xhr, resp, text){
                console.log(text)
            }
        });
    // changeTitle("Create Book");
};
