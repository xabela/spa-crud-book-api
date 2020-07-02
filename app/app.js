function init(){
    getBook();
}

function getBook() {
    $.getJSON("http://localhost:5000/api/book/read.php", function(data) {   
    })
}

init()


let pathName = window.location.pathname.split('/')
console.log(pathName);
let page = pathName[1] == "" ? "read-book" : pathName[1];
console.log(pathName[1]);
var app_html = `
        <div class="container">
            <div class="page-header mt-5">
                <h1 id="page-title"></h1>
            </div>
            <div id="page-content"></div> 
        </div>    
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

// ubah judul tiap halaman
function changeTitle(page_title){
    $('#page-title').text(page_title);

    // ubah title tag 
    document.title = page_title;
}

// encoding form elements to string, converts form elements to a valid JSON object which 
// can be used in your JavaScript application, diubah ke objek gt pokok intinya biar bisa dibaca js
$.fn.serializeObject = function () {
    var formData = {};
    var formArray = this.serializeArray();

    for(var i = 0, n = formArray.length; i < n; ++i)
        formData[formArray[i].name] = formArray[i].value;

    return formData;
};
