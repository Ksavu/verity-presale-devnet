<?php
$ADMIN_USER = 'admin';
$ADMIN_PASS = 'tajniPassword';

// Provera Basic Auth
if (!isset($_SERVER['PHP_AUTH_USER']) || $_SERVER['PHP_AUTH_USER'] !== $ADMIN_USER || $_SERVER['PHP_AUTH_PW'] !== $ADMIN_PASS) {
    header('WWW-Authenticate: Basic realm="Admin Area"');
    http_response_code(401);
    echo "Unauthorized";
    exit;
}

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="admin_purchases.csv"');

$file = __DIR__ . '/buyers.json';
$buyers = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// Sort po amountUSD
usort($buyers, fn($a,$b) => $b['amountUSD'] <=> $a['amountUSD']);

$output = fopen('php://output', 'w');
fputcsv($output, ['Wallet','Referral','AmountUSD','Stablecoin','Timestamp']);
foreach($buyers as $b){
    fputcsv($output, [
        $b['wallet'] ?? '',
        $b['referral'] ?? '',
        $b['amountUSD'] ?? 0,
        $b['stablecoin'] ?? '',
        date('Y-m-d H:i:s',$b['timestamp'] ?? time())
    ]);
}
fclose($output);
?>

