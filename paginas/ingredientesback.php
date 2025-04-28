<?php
require('../banco.php');

$Ingrediente = $_POST['Ingrediente'];
$quant = $_POST['quantidade'];
$custo = $_POST['custo'];


try{
    if (isset($_POST['insIngre'])) {
        /*$sql = "INSERT INTO projectr.ingredientes (idIngrediente, Ingrediente) VALUES ($idIngrediente, '$Ingrediente');";*/
        $tipoop = "Inserido com Sucesso !!!";
        $sql = "INSERT INTO `projectr`.`ingredientes` ( `Ingrediente`, `Quantidade`, `cust`) VALUES ('$Ingrediente ', '$quant', '$custo')";
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