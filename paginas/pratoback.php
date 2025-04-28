<?php
require('../banco.php');
$idPrato = $_POST['idPrato'];
$Prato = $_POST['Prato'];


try{
    if (isset($_POST['insPrato'])) {
        $sql = "INSERT INTO projectr.pratos (idPrato, Prato) VALUES ($idPrato, '$Prato');";
        $tipoop = "Inserido com Sucesso !!!";
    }
    if (isset($sql) && $sql) {
        mysqli_query($conn, $sql);
        echo $tipoop . " OK !!";
    }
} catch (Exception $e) {
    echo 'Erro: ' . $e->getMessage();
}
mysqli_close($conn);
?>