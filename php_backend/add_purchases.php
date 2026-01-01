<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// PRE-FLIGHT (OBAVEZNO ZA BROWSER)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$file = __DIR__ . '/buyers.json';
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (
    !$input ||
    !isset($input['wallet']) ||
    !isset($input['amountUSD'])
) {
    http_response_code(400);
    echo json_encode([
        "error" => "Invalid input",
        "raw" => $raw
    ]);
    exit;
}

$buyers = json_decode(file_get_contents($file), true);

$buyer = [
    'wallet' => $input['wallet'],
    'amountUSD' => (float)$input['amountUSD'],
    'referral' => $input['referral'] ?? '',
    'stablecoin' => $input['stablecoin'] ?? '',
    'timestamp' => time()
];

$buyers[] = $buyer;

file_put_contents($file, json_encode($buyers, JSON_PRETTY_PRINT));

echo json_encode($buyer);
