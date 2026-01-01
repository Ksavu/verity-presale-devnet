<?php
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="leaderboard.csv"');
header('Access-Control-Allow-Origin: *');

$file = __DIR__ . '/buyers.json';
if (!file_exists($file)) file_put_contents($file, json_encode([]));

$buyers = json_decode(file_get_contents($file), true);

// Grupisanje kupovina po referral
$totals = [];
foreach ($buyers as $b) {
    $ref = $b['referral'] ?? '';
    if (!$ref) continue; // preskoči prazne referral kodove
    if (!isset($totals[$ref])) $totals[$ref] = 0;
    $totals[$ref] += (float)$b['amountUSD'];
}

// Sortiranje po iznosu opadajuće
arsort($totals);

// CSV output
$output = fopen('php://output', 'w');
fputcsv($output, ['Referral', 'AmountUSD']);

foreach ($totals as $ref => $sum) {
    fputcsv($output, [$ref, $sum]);
}

fclose($output);
