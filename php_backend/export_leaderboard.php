<?php
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="leaderboard.csv"');

$file = __DIR__ . '/buyers.json';
if (!file_exists($file)) file_put_contents($file, json_encode([]));

$buyers = json_decode(file_get_contents($file), true);

// Sort DESC po amountUSD za top referrals
usort($buyers, function($a, $b) {
    return ($b['amountUSD'] ?? 0) <=> ($a['amountUSD'] ?? 0);
});

$output = fopen('php://output', 'w');

// Kolone CSV
fputcsv($output, ['Referral', 'AmountUSD']);

foreach ($buyers as $b) {
    fputcsv($output, [
        $b['referral'] ?? '',
        $b['amountUSD'] ?? 0
    ]);
}

fclose($output);
exit;
