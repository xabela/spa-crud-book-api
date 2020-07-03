var list_book = [];
var list_category = [];

function init() {
    getBook();
    getCategory();
}

init();

let pathName = window.location.pathname.split('/')
console.log(pathName);
let page = pathName[1] == "" ? "dashboard" : pathName[1];
console.log(pathName[1]);
var app_html = `
            <div class="page-header mt-4 ml-2">
                <h3 id="page-title"><b></b></h3><hr>
            </div>
            <div id="page-content"></div> 
    `;
    $('#app').html(app_html);

    $.ajax({
        url: `http://localhost:5000/route.php?page=${page}`,
        type: "GET",
        "content-type": "application/json; charset=utf-8",
        data: {},
        success: function(res) {
            let data = JSON.parse(res);
            console.log(data);
            $('#page-content').append(data.content);
        }, error: function(res) {
            console.log(res.responseText);
        }
    });

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
            window.location.href = "read-book"
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
            window.location.href = "read-book"
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
            window.location.href = "read-category"
        }, 
        error: function(xhr, resp, text) {
            console.log(text);
        }
    });
}