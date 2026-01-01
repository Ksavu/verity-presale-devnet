<?php
// Admin key
$ADMIN_KEY = "7ALEjJAikbPcRcTRT6722UEa18tHLf5cnz72SABy5NUg";
if (!isset($_GET['wallet']) || $_GET['wallet'] !== $ADMIN_KEY) {
    http_response_code(403);
    echo "Forbidden: Invalid admin key";
    exit;
}

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="admin_purchases.csv"');

$file = __DIR__ . '/buyers.json';
if (!file_exists($file)) file_put_contents($file, json_encode([]));

$buyers = json_decode(file_get_contents($file), true);

// Sortiranje po amountUSD opadajuće
usort($buyers, function($a, $b) {
    return $b['amountUSD'] <=> $a['amountUSD'];
});

$output = fopen('php://output', 'w');
fputcsv($output, ['Wallet', 'Referral', 'AmountUSD', 'Stablecoin', 'Timestamp']);

foreach ($buyers as $b) {
    fputcsv($output, [
        $b['wallet'],
        $b['referral'] ?? '',
        $b['amountUSD'],
        $b['stablecoin'] ?? '',
        date('Y-m-d H:i:s', $b['timestamp'] ?? time())
    ]);
}

fclose($output);
?>
