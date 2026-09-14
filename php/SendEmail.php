<?php
session_start();

// Load PHPMailer classes
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load configuration
$config = include('/home/neeiuta1/credenciais/config.php');

// Setup logging
$log_dir = '/home/neeiuta1/logs';
$log_file = $log_dir . '/upload.log';

if (!is_dir($log_dir)) {
    mkdir($log_dir, 0700, true);
}

function escrever_log($mensagem) {
    global $log_file;
    $data = date('Y-m-d H:i:s');
    file_put_contents($log_file, "[$data] - $mensagem\n", FILE_APPEND);
    chmod($log_file, 0600);
}

// Server mode toggle
$modo_servidor = true;

// Database configuration
$servername = $modo_servidor ? $config['DB_HOST'] : "localhost";
$username = $modo_servidor ? $config['DB_USER'] : "root";
$password = $modo_servidor ? $config['DB_PASS'] : "";
$dbname = $modo_servidor ? $config['DB_NAME'] : "apontamentos";

// Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");
if ($conn->connect_error) {
    escrever_log("Falha na conexão à base de dados: " . $conn->connect_error);
    die("Falha na conexão à base de dados: " . $conn->connect_error);
}

// CSRF token functions
function gerar_csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
}

function validar_csrf($token) {
    if (!isset($token) || $token !== $_SESSION['csrf_token']) {
        $_SESSION['error'] = 'Erro: Token CSRF inválido.';
        escrever_log("Erro: Token CSRF inválido.");
        header("Location: ../Apontamentos/EmaiSendedFail.html");
        exit();
    }
}

// Check if email is disposable using Hunter.io API
function is_disposable_email($email) {
    global $config;
    $api_key = $config['HUNTER_API_KEY'];
    $api_url = "https://api.hunter.io/v2/email-verifier?email=$email&api_key=$api_key";
    
    $response = file_get_contents($api_url);
    $result = json_decode($response, true);
    
    if (isset($result['data']['disposable']) && $result['data']['disposable'] == true) {
        return true;
    }
    return false;
}

// File validation function
function validar_ficheiro($file) {
    if (!isset($file) || $file["size"] === 0) {
        $_SESSION['error'] = 'Erro: Por favor, selecione um ficheiro.';
        escrever_log("Erro: Por favor, selecione um ficheiro.");
        header("Location: ../Apontamentos/EmaiSendedFail.html");
        exit();
    }

    $maxFileSize = 75 * 1024 * 1024; // 75MB in bytes
    if ($file["size"] > $maxFileSize) {
        $_SESSION['error'] = 'Erro: O tamanho do ficheiro excede o limite de 75MB.';
        escrever_log("Erro: O tamanho do ficheiro excede o limite de 75MB.");
        header("Location: ../Apontamentos/EmaiSendedFail.html");
        exit();
    }

    $extensoesPermitidas = array('zip', 'rar', 'tar', 'tar.bz2', 'tar.gz', 'tar.zip');
    $extensaoFicheiro = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

    if (preg_match('/\.tar\.(bz2|gz|zip)$/', $file["name"])) {
        $extensaoFicheiro = strtolower(pathinfo($file["name"], PATHINFO_FILENAME) . '.' . pathinfo($file["name"], PATHINFO_EXTENSION));
    }

    if (!in_array($extensaoFicheiro, $extensoesPermitidas)) {
        $_SESSION['error'] = 'Erro: Por favor, carregue um ficheiro de arquivo válido (.zip, .rar, .tar, .tar.bz2, .tar.gz, .tar.zip).';
        escrever_log("Erro: Tipo de ficheiro inválido.");
        header("Location: ../Apontamentos/EmaiSendedFail.html");
        exit();
    }

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file["tmp_name"]);
    finfo_close($finfo);
    $allowedMimeTypes = [
        'application/zip', 
        'application/x-rar-compressed', 
        'application/x-tar', 
        'application/x-bzip2', 
        'application/gzip', 
        'application/x-zip-compressed',
        'application/octet-stream',
        'application/x-rar'
    ];
    if (!in_array($mime, $allowedMimeTypes)) {
        $_SESSION['error'] = 'Erro: Tipo de ficheiro MIME inválido.';
        escrever_log("Erro: Tipo de ficheiro MIME inválido. MIME detected: " . $mime);
        header("Location: ../Apontamentos/EmaiSendedFail.html");
        exit();
    }
}

// Clean uploads directory
function limpar_pasta_uploads($target_dir) {
    $files = glob($target_dir . '*');
    if (count($files) >= 5) {
        usort($files, function($a, $b) {
            return filemtime($a) - filemtime($b);
        });
        foreach (array_slice($files, 0, count($files) - 8) as $file) {
            unlink($file);
        }
        escrever_log("Limpeza automática: mais de 8 arquivos na pasta uploads, os arquivos mais antigos foram removidos.");
    }
}

// Send confirmation email
function enviar_email_confirmacao($nome, $emailDes, $token_confirmacao, $target_file) {
    global $config, $modo_servidor;

    $mail = new PHPMailer(true);
    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host       = $config['SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['SMTP_USER'];
        $mail->Password   = $config['SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = $config['SMTP_PORT'];

        $mail->CharSet = 'UTF-8';

        // Set sender and recipient
        $mail->setFrom($config['SMTP_USER'], 'NEEI-Apontamentos');
        $mail->addAddress($emailDes, $nome);

        $linkConfirmacao = ($modo_servidor ? 'https://neei-utad.pt/php/confirm.php' : 'https://localhost/WebSiteNeei/php/confirm.php') . '?token=' . $token_confirmacao . '&target_file=' . urlencode($target_file);

        $mail->isHTML(true);
        $mail->Subject = 'Email de Confirmação';
        $template = file_get_contents('../Apontamentos/EmailTamplete/templateConf.php');
        $template = str_replace('%confirmationLink%', $linkConfirmacao, $template);
        $template = str_replace('%name%', $nome, $template);
        $mail->Body = $template;

        // Send email
        $mail->send();
        $_SESSION['message'] = 'Email enviado com sucesso!';
        escrever_log("Email enviado com sucesso para $emailDes.");
        header("Location: ../Apontamentos/EmaiSendedSuccessfully.html");
        exit();
    } catch (Exception $e) {
        $_SESSION['error'] = 'Erro: O email não pôde ser enviado. Erro do Mailer: ' . $mail->ErrorInfo;
        escrever_log("Erro: O email não pôde ser enviado. Erro do Mailer: " . $mail->ErrorInfo);
        header("Location: ../Apontamentos/EmaiSendedFail.html");
        exit();
    }
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    gerar_csrf_token();
    validar_csrf($_POST['csrf_token']);

    $emailDes = htmlspecialchars($conn->real_escape_string($_POST['email']));
    if (is_disposable_email($emailDes)) {
        $_SESSION['error'] = 'Disposable email addresses are not allowed.';
        escrever_log("Attempt to use a disposable email: $emailDes");
        header("Location: ../Apontamentos/EmaiSendedFail.html");
        exit();
    }

    validar_ficheiro($_FILES["file"]);
    limpar_pasta_uploads("python/uploads/");

    // Sanitize file name
    $target_file = "python/uploads/" . basename(preg_replace("/[^a-zA-Z0-9.]/", "_", $_FILES["file"]["name"]));
    if (!move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $_SESSION['error'] = 'Erro: Falha ao carregar ficheiro.';
        escrever_log("Erro: Falha ao carregar ficheiro.");
        header("Location: ../Apontamentos/EmaiSendedFail.html");
        exit();
    }

    // Generate confirmation token
    $token_confirmacao = hash_hmac('sha256', uniqid(rand(), true), $config['SECRET_KEY']);

    // Insert data into database
    $sql = "INSERT INTO submit (Nome, Email, Estado, ConfirmationToken) VALUES (?, ?, 0, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        $_SESSION['error'] = 'Erro: Não foi possível preparar a instrução SQL.';
        escrever_log("Erro: Não foi possível preparar a instrução SQL.");
        header("Location: ../Apontamentos/EmaiSendedFail.html");
        exit();
    }

    $nome = htmlspecialchars($conn->real_escape_string($_POST['name']));
    $stmt->bind_param("sss", $nome, $emailDes, $token_confirmacao);
    if ($stmt->execute()) {
        enviar_email_confirmacao($nome, $emailDes, $token_confirmacao, $target_file);
    } else {
        $_SESSION['error'] = 'Erro: Não foi possível inserir o registo na base de dados.';
        escrever_log("Erro: Não foi possível inserir o registo na base de dados.");
        header("Location: ../Apontamentos/EmaiSendedFail.html");
        exit();
    }
} else {
    $_SESSION['error'] = 'Erro: Método de requisição inválido.';
    escrever_log("Erro: Método de requisição inválido.");
    header("Location: ../Apontamentos/EmaiSendedFail.html");
    exit();
}
?>
