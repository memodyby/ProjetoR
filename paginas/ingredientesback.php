<?php
require('../banco.php');
$idIngrediente = $_POST['idIngrediente'];
$Ingrediente = $_POST['Ingrediente'];


try{
    if (isset($_POST['insIngre'])) {
        $sql = "INSERT INTO projectr.ingredientes (idIngrediente, Ingrediente) VALUES ($idIngrediente, '$Ingrediente');";
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