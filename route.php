<?php

header("Content-Type : application/json; charset=UTF-8");
$view = [
    'header' => file_get_contents("app/view/header.html"),
    'content' => file_get_contents("app/view/{$_GET['page']}.html"),
    'js' => file_get_contents("app/books/{$_GET['page']}.js")
];

echo json_encode($view);
?>