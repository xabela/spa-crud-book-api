gapi.g-signin2.render();

function createLogin() {
    var form_data = {
        'email' : $("#email").val(),
        'password' : $("#password").val()
    };
    form_data = JSON.stringify(form_data);
    $.ajax({
        url: "http://localhost:5000/api/user/login.php",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            console.log(result);
            // var token = data.jwt;
            // var d = new Date();
            // d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
            // var expires = "expires=" + d.toGMTString();
            // console.log(expires)
            // document.cookie = cname + "=" + token + ";" + expires + ";path=/";
            // console.log(document.cookie)
            // store new jwt to coookie
            setCookie("jwt", result.jwt, 1);
            goTo(event,'dashboard');
        },
        error: function(xhr, resp, text){
            console.log(text)
        }
    });
// changeTitle("Create Book");
};

var userData = '';

function onSignIn(googleUser) {
    console.log('User is' + JSON.stringify(googleUser.getBasicProfile()))
    userData = googleUser.getBasicProfile().getName();
    console.log(userData);
    if (!userData) {
        // ininanti error ya
    }

    //window.location.href = 'index.html';
    goTo(event, 'dashboard')
    //window.localStorage.setItem('google_sign_in', true);
}
