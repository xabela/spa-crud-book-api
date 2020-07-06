window.onload = () => {
'use strict';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
            .register('./sw.js');
}
}

var list_book = [];
var list_category = [];

function init() {
    let pathName = window.location.pathname.split('/')
    let page = pathName[1] == "" ? "login" : pathName[1];
    console.log(pathName[1]);
    var url = new URL(window.location.href)
    var id = url.searchParams.get("id")
    if(id != null){
        goTo(null, `${page}?id=${id}`)
    } else {
        getCategory();
        getBook()
        // setTimeout(function(){ 
        //     showBooks()
        // }, 100);
        goTo(null, page)
    }
}

init();

window.addEventListener("popstate", function() {
    goTo(null, window.location.pathname.split('/')[1]) //buat back
})



function goTo(e, page) {
    console.log('you go to ', page);
    if (e !== null) {
        e.preventDefault();
    }

    if (page == 'login' || page == '') {
        window.history.pushState("object or string", "", '/');
        getTemplate2(page)
    } else if (page == 'register') {
        window.history.pushState("object or string", "", '/');
        getTemplate2(page)
    } else {
        window.history.pushState("object or string", "", `/${page}`);
        var url = new URL(window.location.href)
        var id = url.searchParams.get("id")
        if(id != null){
            console.log('idnya tidak null')
            getTemplate(window.location.pathname.split('/')[1])
        } else {
            getTemplate(page)
        }
    }
}
function getTemplate(page) {
    var jwt = getCookie('jwt');
    $.post("http://localhost:5000/api/user/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
    $.ajax({
        url: "http://localhost:5000/route.php?page=" + page,
        type: "GET",
        "content-type": "application/json; charset=utf-8",
        data: {},
        success: function(res) {
            let data = JSON.parse(res);
            $('#header').html(data.header);
            $('#email').html(userData);
            $('#app').html(data.content);
        }, error: function(res) {
            console.log(res.responseText);
        }
    });
});
}
function getTemplate2(page) {
    $.ajax({
        url: "http://localhost:5000/route-regis-login.php?page=" + page,
        type: "GET",
        "content-type": "application/json; charset=utf-8",
        data: {},
        success: function(res) {
            let data = JSON.parse(res);
            $('#header').html(data.content);
        }, error: function(res) {
            console.log(res.responseText);
        }
    });
}

function changeTitle(page_title){
    $('#page-title').text(page_title);
    document.title = page_title;
}

function getCategory() {
    $.getJSON("http://localhost:5000/api/category/read.php", function(data) {
        list_category = data
    });
}

function getBook() {
    $.getJSON("http://localhost:5000/api/book/read.php", function(data) {
        list_book = data;
    });
}

function ajaxUpdate(data) {
    $.ajax({
        url: "http://localhost:5000/api/book/update.php",
        type: "POST",
        contentType: "application/json",
        data: data,
        success: function(result){
            console.log(result)
            getBook()
            showBooks()
            goTo(null, 'read-book')
        }, 
        error: function(xhr, resp, text) {
            console.log(text);
        }
    });
}

function ajaxCreate(data) {
    $.ajax({
        url: "http://localhost:5000/api/book/create.php",
        type: "POST",
        contentType: "application/json",
        data: data,
        success: function(result){
            console.log(result)
            getBook()
            showBooks()
            goTo(event, 'read-book')
        }, 
        error: function(xhr, resp, text) {
            console.log(text);
        }
    });
}

function ajaxCreateCategory(data) {
    $.ajax({
        url: "http://localhost:5000/api/category/create.php",
        type: "POST",
        contentType: "application/json",
        data: data,
        success: function(result){
            console.log(result)
            getCategory()
            showCategories()
            goTo(event, 'read-category')
        }, 
        error: function(xhr, resp, text) {
            console.log(text);
        }
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

 // get or read cookie
function getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}