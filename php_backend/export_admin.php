<?php
// ===== BASIC AUTH =====
$ADMIN_USER = 'Verity Dev';
$ADMIN_PASS = '7ALEjJAikbPcRcTRT6722UEa18tHLf5cnz72SABy5NUg';

if (
    !isset($_SERVER['PHP_AUTH_USER']) ||
    !isset($_SERVER['PHP_AUTH_PW']) ||
    $_SERVER['PHP_AUTH_USER'] !== $ADMIN_USER ||
    $_SERVER['PHP_AUTH_PW'] !== $ADMIN_PASS
) {
    header('WWW-Authenticate: Basic realm="Verity Admin Area"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Unauthorized';
    exit;
}

// ===== CSV EXPORT =====
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="admin_purchases.csv"');

$file = __DIR__ . '/buyers.json';
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

$buyers = json_decode(file_get_contents($file), true);

// Sort DESC po amountUSD
usort($buyers, function($a, $b) {
    return ($b['amountUSD'] ?? 0) <=> ($a['amountUSD'] ?? 0);
});

$output = fopen('php://output', 'w');
fputcsv($output, ['Wallet', 'Referral', 'AmountUSD', 'Stablecoin', 'Timestamp', 'Transaction']);

foreach ($buyers as $b) {
    fputcsv($output, [
        $b['wallet'] ?? '',
        $b['referral'] ?? '',
        $b['amountUSD'] ?? 0,
        $b['stablecoin'] ?? '',
        isset($b['timestamp']) ? date('Y-m-d H:i:s', $b['timestamp']) : '',
        $b['txSignature'] ?? ''  // ovde ubaci tx hash ako ga zapisuješ u buyers.json
    ]);
}

fclose($output);
exit;
