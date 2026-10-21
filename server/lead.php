<?php
// Receives a scope the visitor chose to send from the "Scope your project"
// section. The scope itself is built in the browser (src/scopeRules.js); this
// only stores it and emails it to Shehzad with Reply-To set to the visitor.
//
// Config and data live one level above public_html, out of reach of the web:
//   ../scope-config.php   optional; returns ['notify_email' => ..., 'data_dir' => ...]
//   ../scope-data/        rate-limit counters and leads.jsonl
// SCOPE_CONFIG overrides the config path for local testing.

declare(strict_types=1);

const NOTIFY_EMAIL = 'shezz77.se@gmail.com';
const PER_IP_HOUR = 5;
const PER_IP_DAY = 10;
const GLOBAL_DAY = 200;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean(mixed $value, int $max): string
{
    if (!is_string($value)) {
        return '';
    }
    // Strip control characters except newlines and tabs, then trim and cap.
    $value = preg_replace('/[^\P{C}\n\t]/u', '', $value) ?? '';
    return mb_substr(trim($value), 0, $max);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Use POST.']);
}

// Browsers always send Origin on a cross-site POST; only this site may post.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigin = '#^https?://((www\.)?shezz77\.com|localhost(:\d+)?|127\.0\.0\.1(:\d+)?)$#';
if ($origin !== '' && !preg_match($allowedOrigin, $origin)) {
    respond(403, ['error' => 'Not allowed.']);
}

$configPath = getenv('SCOPE_CONFIG') ?: dirname(__DIR__, 2) . '/scope-config.php';
$config = is_file($configPath) ? require $configPath : [];
$notifyEmail = $config['notify_email'] ?? NOTIFY_EMAIL;
$dataDir = $config['data_dir'] ?? dirname(__DIR__, 2) . '/scope-data';
$sendMail = $config['send_mail'] ?? true;

$input = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($input)) {
    respond(400, ['error' => 'Send JSON.']);
}

// Honeypot: a field real visitors never see. Bots fill every input; tell
// them it worked and keep nothing.
if (!empty($input['website'])) {
    respond(200, ['ok' => true]);
}

$email = filter_var(clean($input['email'] ?? '', 200), FILTER_VALIDATE_EMAIL) ?: '';
if ($email === '') {
    respond(422, ['error' => 'That email address doesn\'t look right.']);
}
$name = clean($input['name'] ?? '', 120);
$notes = clean($input['notes'] ?? '', 2000);
$scope = clean($input['scope'] ?? '', 8000);
if ($scope === '') {
    respond(422, ['error' => 'The scope was empty.']);
}
$answers = [];
foreach (['type', 'stage', 'users', 'timeline', 'sensitive'] as $key) {
    $answers[$key] = clean($input['answers'][$key] ?? '', 20);
}
$answers['integrations'] = array_values(array_filter(
    array_map(fn ($v) => clean($v, 20), array_slice((array) ($input['answers']['integrations'] ?? []), 0, 10))
));
$ref = preg_match('/^[a-z0-9][a-z0-9-]{0,48}$/', (string) ($input['ref'] ?? '')) ? $input['ref'] : '';

// ---------- Rate limiting ----------
// One small JSON file per day, locked for the read-modify-write. IPs are
// hashed so the counters never hold a raw address.

if (!is_dir($dataDir) && !mkdir($dataDir, 0700, true) && !is_dir($dataDir)) {
    respond(500, ['error' => 'Storage is not available.']);
}
$ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|lead');
$fh = fopen($dataDir . '/rl-' . gmdate('Ymd') . '.json', 'c+');
if ($fh === false || !flock($fh, LOCK_EX)) {
    respond(500, ['error' => 'Storage is not available.']);
}
$counts = json_decode(stream_get_contents($fh) ?: '{}', true) ?: [];
$hour = gmdate('H');
$counts['_total'] = ($counts['_total'] ?? 0) + 1;
$counts[$ip]['day'] = ($counts[$ip]['day'] ?? 0) + 1;
$counts[$ip][$hour] = ($counts[$ip][$hour] ?? 0) + 1;
ftruncate($fh, 0);
rewind($fh);
fwrite($fh, json_encode($counts));
flock($fh, LOCK_UN);
fclose($fh);
if ($counts['_total'] > GLOBAL_DAY || $counts[$ip]['day'] > PER_IP_DAY || $counts[$ip][$hour] > PER_IP_HOUR) {
    respond(429, ['error' => 'Too many sends for now.']);
}

// ---------- Store and notify ----------

$id = gmdate('Ymd-His') . '-' . bin2hex(random_bytes(3));
$record = [
    'id' => $id,
    'at' => gmdate('c'),
    'ref' => $ref,
    'name' => $name,
    'email' => $email,
    'answers' => $answers,
    'notes' => $notes,
    'scope' => $scope,
];
$stored = file_put_contents($dataDir . '/leads.jsonl', json_encode($record, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX) !== false;

$mailed = false;
if ($sendMail) {
    $body = implode("\n", [
        "New scope {$id}" . ($ref !== '' ? " (ref: {$ref})" : ''),
        'From: ' . ($name !== '' ? "{$name} " : '') . "<{$email}>",
        '',
        $scope,
    ]);
    $title = strtok($scope, "\n") ?: 'New scope';
    $subject = 'Scope: ' . mb_substr($title, 0, 80) . ($name !== '' ? " ({$name})" : '');
    $headers = [
        'From' => 'shezz77.com <scope@shezz77.com>',
        'Reply-To' => $email,
        'Content-Type' => 'text/plain; charset=utf-8',
    ];
    $mailed = @mail($notifyEmail, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
}

if (!$stored && !$mailed) {
    respond(500, ['error' => "That didn't go through."]);
}
respond(200, ['ok' => true, 'id' => $id]);
