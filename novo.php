<?php
	require 'banco.php';


    $sql = "Select * from niveis_a";
    $lista = mysqli_query($conn, $sql) or die(mysqli_error($conn));
   

?>
<form method="post" action="cadastrar.php">
    <?php
        echo "<select name=n1 value=''>Nome da Rua</option>";
        	foreach ($lista as $row){
        		echo "<option value=$row[idcess]>$row[nivel]</option>";
            }

        echo "</select>";
    ?>
<HTML>
<HEAD><TITLE>Restaurante Facil : Cadastro</TITLE></HEAD>
<BODY>
<form action="cadastrar.php" method="post">
Digite suas informacoes:<br>
Nome: <br><input type="text" name="nov_nome"><br>
Seu loguin (Apenas Numeros): <br><input type="text" name="nov_log"><br>
Sua senha: <br><input type="text" name="nov_senha"><br>

<input type="submit" value="Me cadastre!">
</form>
</BODY></HTML>