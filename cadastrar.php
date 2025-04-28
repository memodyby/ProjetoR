<?php

require "banco.php";

$nome = $_POST['nov_nome'];
$loguin = $_POST['nov_log'];
$senha = $_POST['nov_senha'];
$nivel = $_POST['n1'];

$hash = password_hash($senha, PASSWORD_DEFAULT);

if(ctype_digit($loguin))
{
    $sql = "INSERT INTO `projectr`.`usuarios` (`nome`, `loguin`, `senha`, `nivel`) VALUES ('$nome', '$loguin', '$hash', $nivel);";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
    header("Location: index.php");
    exit;
}

mysqli_close($conn);
?>