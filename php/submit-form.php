<?php
header('Content-Type: application/json');

$errors = [];
$response = ['success' => false, 'errors' => []];

function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['errors']['general'] = 'Méthode non autorisée';
    echo json_encode($response);
    exit;
}

$honeypot = $_POST['website_url'] ?? '';
if (!empty($honeypot)) {
    $response['success'] = true;
    $response['message'] = 'Votre message a bien été envoyé.';
    echo json_encode($response);
    exit;
}

$prenom = sanitize($_POST['Pr-nom'] ?? '');
$nom = sanitize($_POST['Nom'] ?? '');
$email = sanitize($_POST['Adresse-e-mail'] ?? '');
$telephone = sanitize($_POST['T-l-phone'] ?? '');
$cours = sanitize($_POST['Cours-souhait'] ?? '');
$message = sanitize($_POST['Message'] ?? '');
$cgu = $_POST['Checkbox-2'] ?? $_POST['Checkbox'] ?? '';
$formSource = sanitize($_POST['form_source'] ?? 'inconnu');

if (empty($prenom)) {
    $response['errors']['prenom'] = 'Le prénom est requis';
}
if (empty($nom)) {
    $response['errors']['nom'] = 'Le nom est requis';
}
if (empty($email)) {
    $response['errors']['email'] = 'L\'email est requis';
} elseif (!validateEmail($email)) {
    $response['errors']['email'] = 'L\'email n\'est pas valide';
}
if (empty($message)) {
    $response['errors']['message'] = 'Le message est requis';
}
if (empty($cgu)) {
    $response['errors']['cgu'] = 'Vous devez accepter les conditions générales';
}

if (!empty($response['errors'])) {
    echo json_encode($response);
    exit;
}

$to = 'julien@vert-menthe.fr';
$subject = 'Nouveau message depuis le site - ' . $formSource;

$emailBody = "
Nouveau message depuis le formulaire de contact ($formSource)

========================================
INFORMATIONS DU VISITEUR
========================================

Prénom: $prenom
Nom: $nom
Email: $email
Téléphone: " . ($telephone ?: 'Non fourni') . "
Cours concerné: " . ($cours ?: 'Aucun') . "

========================================
MESSAGE
========================================

$message

---
Envoyé depuis: " . ($_SERVER['HTTP_REFERER'] ?? 'Inconnu') . "
";

$headers = [
    'From: noreply@cours-febus.fr',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    $response['success'] = true;
    $response['message'] = 'Votre message a bien été envoyé. Nous répondons habituellement sous 24h.';
} else {
    $response['errors']['general'] = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
}

echo json_encode($response);
exit;
