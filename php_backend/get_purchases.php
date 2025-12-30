<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$file = __DIR__ . '/buyers.json';
if (!file_exists($file)) file_put_contents($file, json_encode([]));

$buyers = json_decode(file_get_contents($file), true);
echo json_encode($buyers);
?>
