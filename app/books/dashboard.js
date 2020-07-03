$.getJSON("http://localhost:5000/api/book/count.php", function(data) {
        var total = data
        console.log(total)
        $("#tot-book").html(total)
        $("#tot-cat").html(list_category.length)
});

changeTitle("DASHBOARD")