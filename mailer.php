<?php
/**
 * mailer.php — Contact Form Mail Handler
 * ========================================
 * Receives a POST from the contact form and sends an email
 * directly via PHP's mail() function — no third-party required.
 *
 * REQUIREMENTS
 *   • PHP 7.4+ running on your web server (Apache / Nginx + PHP-FPM)
 *   • PHP's mail() function enabled (standard on most shared-hosting plans)
 *   • NOT compatible with static hosting (GitHub Pages, Netlify static, etc.)
 *     → On static hosts the form falls back to FormSubmit.co automatically.
 *
 * CONFIGURATION (lines marked ✏️ below)
 *   1. Set $to   → the address you want to receive messages
 *   2. Set $from → a valid address on YOUR domain (avoids spam filtering)
 *   3. Set $siteUrl → your public domain (used for CORS)
 *
 * SMTP NOTE
 *   PHP's built-in mail() relies on the server's sendmail/MTA.
 *   For more reliable delivery (e.g. with an SMTP provider) replace the
 *   mail() call with PHPMailer or Symfony Mailer and supply SMTP credentials.
 */

// ── ✏️ Configuration ────────────────────────────────────────────────────
$to      = 'me@raahul.com.np';       // destination email
$from    = 'noreply@raahul.com.np';  // sender (must be on your domain)
$siteUrl = 'https://raahul.com.np';  // your site URL (for CORS header)
// ────────────────────────────────────────────────────────────────────────

// ── Response headers ─────────────────────────────────────────────────
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: ' . $siteUrl);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('X-Content-Type-Options: nosniff');

// CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ── Method guard ──────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// ── Sanitisation helpers ──────────────────────────────────────────────
/**
 * Remove CR/LF from values used in mail headers to prevent header injection.
 */
function sanitiseHeader(string $value): string {
    return trim(preg_replace('/[\r\n]/', '', $value));
}

/**
 * Strip HTML tags and normalise whitespace for mail body fields.
 */
function sanitiseText(string $value): string {
    return trim(strip_tags($value));
}

// ── Read inputs ───────────────────────────────────────────────────────
$name    = sanitiseText($_POST['name']    ?? '');
$email   = sanitiseHeader($_POST['email'] ?? '');
$subject = sanitiseText($_POST['subject'] ?? 'General Inquiry');
$message = sanitiseText($_POST['message'] ?? '');
$gotcha  = sanitiseText($_POST['_gotcha'] ?? '');

// Honeypot check (bots often fill hidden fields)
if ($gotcha !== '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Spam check failed.']);
    exit;
}

// ── Validate ──────────────────────────────────────────────────────────
if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email, and message are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Truncate to reasonable lengths
$name    = mb_substr($name,    0, 120);
$subject = mb_substr($subject, 0, 200);
$message = mb_substr($message, 0, 5000);

// ── Build email ───────────────────────────────────────────────────────
$emailSubject = 'Contact: ' . $subject . ' (from ' . $name . ' via raahul.com.np)';

$emailBody  = "Name:    {$name}\n";
$emailBody .= "Email:   {$email}\n";
$emailBody .= "Subject: {$subject}\n";
$emailBody .= str_repeat('-', 50) . "\n";
$emailBody .= "{$message}\n";
$emailBody .= str_repeat('-', 50) . "\n";
$emailBody .= 'Sent via: ' . $siteUrl . "\n";
$emailBody .= 'Date:     ' . date('Y-m-d H:i:s T') . "\n";

$headers  = 'From: '     . $from  . "\r\n";
$headers .= 'Reply-To: ' . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= 'X-Mailer: PHP/' . PHP_VERSION . "\r\n";

// ── Send ──────────────────────────────────────────────────────────────
$sent = @mail($to, $emailSubject, $emailBody, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail server error. Please try emailing directly.']);
}
