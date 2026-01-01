<?php
header('Content-Type: text/plain');
$input = file_get_contents('php://input');
echo "RAW INPUT:\n";
var_dump($input);
?>
