<?php
// Conexão com o banco de dados
require "banco.php";

// Inicia sessões
session_start();

// Recupera o login
$login = isset($_POST["login"]) ? addslashes(trim($_POST["login"])) : FALSE;
// Recupera a senha sem hashá-la ainda
$senha = isset($_POST["senha"]) ? trim($_POST["senha"]) : FALSE;

// Usuário não forneceu a senha ou o login
if (!$login || !$senha) {
    echo "Você deve digitar sua senha e login!";
    exit;
}

// Executa a consulta no banco de dados com segurança
$sql = "SELECT id, nome, loguin, senha, nivel FROM usuarios WHERE loguin = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $login);
$stmt->execute();
$result = $stmt->get_result();
$total = $result->num_rows;

echo password_hash("$senha", PASSWORD_DEFAULT);

// Caso o usuário tenha digitado um login válido
if ($total) {
    // Obtém os dados do usuário
    $dados = $result->fetch_assoc();

    // Agora verifica a senha usando password_verify()
    if (password_verify($senha, $dados["senha"])) {
        // Tudo OK! Agora, passa os dados para a sessão e redireciona o usuário
        $_SESSION["id_usuario"] = $dados["id"];
        $_SESSION["nome_usuario"] = stripslashes($dados["nome"]);
        $_SESSION["permissao"] = $dados["nivel"];
        header("Location: menu1/menu/menu.html");
        exit;
    } else {
        echo "Senha inválida!";
        exit;
    }
} else {
    echo "O login fornecido por você é inexistente!";
    exit;
}
?>
