<?php

$servername = "localhost";
      $database = "projectr"; //Nome da query
      $username = "root";
      $password = "SQLsenha";
      // Create connection
      $conn = mysqli_connect($servername, $username, $password, $database);
      // Check connection
      if (!$conn) {
            echo "Connection failed: " . mysqli_connect_error();
      }
      else  
            echo "Conexão com Sucesso!!+<br>";

?>