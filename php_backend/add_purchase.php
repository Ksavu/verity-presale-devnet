<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$file = __DIR__ . '/buyers.json';
if (!file_exists($file)) file_put_contents($file, json_encode([]));

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['wallet'], $input['amountUSD'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$buyers = json_decode(file_get_contents($file), true);
$buyer = [
    'wallet' => $input['wallet'],
    'amountUSD' => $input['amountUSD'],
    'referral' => $input['referral'] ?? '',
    'stablecoin' => $input['stablecoin'] ?? '',
    'timestamp' => time()
];
$buyers[] = $buyer;
file_put_contents($file, json_encode($buyers, JSON_PRETTY_PRINT));
echo json_encode($buyer);
?>
