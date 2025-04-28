<?php
// Verificador de sessão
echo "E agora";


require "verificar.php";

// Conexão com o banco de dados
require "banco.php";

// Imprime mensagem de boas vindas
echo "<font face=\"Verdana\" size=2>Bem-Vindo " . $_SESSION["nome_usuario"] . "!<BR>\n";
?>