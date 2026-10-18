<?php
// Exibição de erros desativada para produção
ini_set('display_errors', 0); // Desativar exibição de erros
ini_set('display_startup_errors', 0); // Desativar erros de inicialização
error_reporting(E_ALL); // Reportar todos os erros

// Carregar configuração a partir de um ficheiro externo
$config = include('/home/neeiuta1/credenciais/config.php');

// Definir constantes de configuração para a base de dados
define("DB_HOST", $config['DB_HOST']);
define("DB_USER", $config['DB_USER']);
define("DB_PASS", $config['DB_PASS']);
define("DB_NAME", $config['DB_NAME']);

// Configuração de logs
$log_dir = '/home/neeiuta1/logs'; // Diretório para logs
$log_file = $log_dir . '/confirm.log'; // Ficheiro de log específico para confirmações
if (!is_dir($log_dir)) {
    mkdir($log_dir, 0777, true); // Criar o diretório se não existir
}

// Função para escrever no log
function escrever_log($mensagem) {
    global $log_file;
    $data = date('Y-m-d H:i:s'); // Obter data e hora atuais
    file_put_contents($log_file, "[$data] - $mensagem\n", FILE_APPEND); // Escrever mensagem no log
}

// Função para redirecionar para uma URL especificada
function redirecionar_para($url) {
    header("Location: $url"); // Enviar cabeçalho HTTP para redirecionar
    exit(); // Terminar execução do script
}

// Função para obter uma conexão à base de dados
function obter_conexao_bd() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME); // Criar conexão
    if ($conn->connect_error) {
        throw new Exception("Falha na ligação à base de dados: " . $conn->connect_error); // Lançar exceção se falhar
    }
    $conn->set_charset("utf8mb4"); // Definir conjunto de caracteres
    return $conn; // Retornar conexão
}

// Função para verificar o token de confirmação na base de dados
function verificar_token($conn, $token) {
    $sql = "SELECT id, Nome, Email, Estado FROM submit WHERE ConfirmationToken = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Falha ao preparar a declaração: " . $conn->error); // Lançar exceção se falhar
    }
    $stmt->bind_param("s", $token); // Associar parâmetro
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows != 1) {
        throw new Exception("Token inválido"); // Lançar exceção se não houver exatamente um resultado
    }
    $stmt->bind_result($id, $nome, $email, $estado); // Associar resultados
    $stmt->fetch();
    if ($estado == 1) {
        throw new Exception("Token já utilizado"); // Lançar exceção se o token já foi utilizado
    }
    $stmt->close();
    return [$id, $nome, $email]; // Retornar dados do utilizador
}

// Função para confirmar a submissão na base de dados
function confirmar_submissao($conn, $token) {
    $update_sql = "UPDATE submit SET Estado = 1 WHERE ConfirmationToken = ?";
    $update_stmt = $conn->prepare($update_sql);
    if (!$update_stmt) {
        throw new Exception("Falha ao preparar a declaração de atualização: " . $conn->error); // Lançar exceção se falhar
    }
    $update_stmt->bind_param("s", $token); // Associar parâmetro
    $update_stmt->execute();
    if ($update_stmt->affected_rows != 1) {
        throw new Exception("Falha ao atualizar o estado da submissão"); // Lançar exceção se não houver exatamente uma linha afetada
    }
    $update_stmt->close();
}

// Função para executar um script Python com dados fornecidos
function executar_script_python($target_file, $folder_name, $nome, $email) {
    $url = 'https://neei-utad.pt/'; // URL do script Python
    $data = array(
        'target_file' => $target_file,
        'folder_name' => $folder_name,
        'name' => $nome,
        'email' => $email
    );

    escrever_log("Dados enviados para o script Python: " . json_encode($data)); // Log dos dados enviados

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data, '', '&', PHP_QUERY_RFC3986), // Construir query string dos dados
        ),
    );

    $context = stream_context_create($options); // Criar contexto de stream
    $result = @file_get_contents($url, false, $context); // Enviar pedido HTTP POST

    if ($result === FALSE) {
        $error = error_get_last();
        escrever_log("Erro ao executar o script Python: " . $error['message']); // Log do erro
        redirecionar_para('../Apontamentos/ConfirmacionFail.html'); // Redirecionar para página de falha
    }

    escrever_log("Resposta recebida do script Python: " . $result); // Log da resposta recebida

    $response = json_decode($result, true); // Decodificar resposta JSON
    if ($response === null) {
        escrever_log("Erro ao decodificar a resposta JSON do script Python"); // Log de erro na decodificação
        redirecionar_para('../Apontamentos/ConfirmacionFail.html'); // Redirecionar para página de falha
    }

    if ($response['status'] === 'SUCESSO') {
        redirecionar_para('../Apontamentos/ConfirmacionSuccesfully.html'); // Redirecionar para página de sucesso
    } else {
        escrever_log("O script Python reportou falha: " . (isset($response['erro']) ? $response['erro'] : 'Erro desconhecido')); // Log de erro reportado pelo script Python
        redirecionar_para('../Apontamentos/ConfirmacionFail.html'); // Redirecionar para página de falha
    }
}

// Função para validar parâmetros recebidos
function validar_parametros($params) {
    foreach ($params as $param) {
        if (!isset($param) || empty($param)) {
            throw new Exception("Parâmetro ausente ou vazio"); // Lançar exceção se algum parâmetro estiver ausente ou vazio
        }
    }
}

try {
    // Validar os parâmetros recebidos via GET
    validar_parametros([$_GET['token'], $_GET['target_file']]);

    // Validar que target_file está dentro do diretório de uploads esperado
    $target_file = $_GET['target_file'];
    $real = realpath(dirname(__FILE__) . '/../' . $target_file);
    $allowed_base = realpath(dirname(__FILE__) . '/../php/python/uploads');
    if ($real === false || strpos($real, $allowed_base) !== 0) {
        throw new Exception("Caminho de ficheiro inválido");
    }

    // Obter conexão à base de dados
    $conn = obter_conexao_bd();

    // Verificar o token de confirmação
    list($id, $nome, $email) = verificar_token($conn, $_GET['token']);

    // Confirmar a submissão na base de dados
    confirmar_submissao($conn, $_GET['token']);

    // Executar o script Python com os dados necessários
    executar_script_python($target_file, $id, $nome, $email);
} catch (Exception $e) {
    // Registar o erro no log e redirecionar para a página de falha
    error_log($e->getMessage());
    escrever_log($e->getMessage());
    redirecionar_para('../Apontamentos/ConfirmacionFail.html');
}
?>
