<?php
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="admin_purchases.csv"');

$file = __DIR__ . '/buyers.json';
if (!file_exists($file)) file_put_contents($file, json_encode([]));

$buyers = json_decode(file_get_contents($file), true);

$output = fopen('php://output', 'w');
fputcsv($output, ['Wallet', 'Referral', 'AmountUSD', 'Stablecoin']);

foreach ($buyers as $b) {
    fputcsv($output, [$b['wallet'], $b['referral'], $b['amountUSD'], $b['stablecoin']]);
}

fclose($output);
?>
