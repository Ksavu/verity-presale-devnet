<?php
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="leaderboard.csv"');

$file = __DIR__ . '/buyers.json';
if (!file_exists($file)) file_put_contents($file, json_encode([]));

$buyers = json_decode(file_get_contents($file), true);

$output = fopen('php://output', 'w');
fputcsv($output, ['Referral', 'AmountUSD']);

foreach ($buyers as $b) {
    fputcsv($output, [$b['referral'], $b['amountUSD']]);
}

fclose($output);
?>
