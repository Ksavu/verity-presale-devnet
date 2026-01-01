<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// PRE-FLIGHT (obavezno za browser)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// JSON fajl gde se cuvaju kupovine
$file = __DIR__ . '/buyers.json';
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

// Uzmi raw input i dekodiraj
$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

// Validacija inputa
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

// Ucitaj postojece kupovine
$buyers = json_decode(file_get_contents($file), true);

// Kreiraj novi zapis
$buyer = [
    'wallet' => $input['wallet'],
    'amountUSD' => (float)$input['amountUSD'],
    'referral' => $input['referral'] ?? '',
    'stablecoin' => $input['stablecoin'] ?? '',
    'txSignature' => $input['txSignature'] ?? '', // NOVO
    'timestamp' => time()
];

// Dodaj novi zapis
$buyers[] = $buyer;

// Snimi nazad u JSON
file_put_contents($file, json_encode($buyers, JSON_PRETTY_PRINT));

// Vrati response
echo json_encode($buyer);
