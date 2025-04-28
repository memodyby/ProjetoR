


<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurante Fácil : Login</title>
    <style>
        /* Definir imagem de fundo */
        body {
            background-image: url('sof_log.jpg'); /* Substitua pelo caminho da sua imagem */
            background-size: cover;
            background-position: center;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        /* Caixa de login centralizada */
        .login-container {
            background: rgba(255, 255, 255, 0.8); /* Fundo semi-transparente */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            text-align: center;
            width: 300px;
        }

        /* Estilizando inputs e botão */
        input {
            width: 90%;
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        input[type="submit"] {
            background: #4CAF50;
            color: white;
            cursor: pointer;
            font-size: 16px;
        }

        input[type="submit"]:hover {
            background: #45a049;
        }
    </style>
</head>
<body>

    <div class="login-container">
        <h2>Bem-vindo ao Restaurante Fácil</h2>
        <p>Digite suas informações para prosseguir</p>
        <form action="login_vai.php" method="post">
            <input type="text" name="login" placeholder="Login"><br>
            <input type="password" name="senha" placeholder="Senha"><br>
            <input type="submit" value="OK!">
        </form>
    </div>

</body>
</html>





