
/*// Conexão com o banco de dados
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

//echo password_hash("$senha", PASSWORD_DEFAULT);

// Caso o usuário tenha digitado um login válido
if ($total) {
    // Obtém os dados do usuário
    $dados = $result->fetch_assoc();

    // Agora verifica a senha usando password_verify()
    if (password_verify($senha, $dados["senha"])) {
        if ($dados["nivel"] === "1") {

        // Tudo OK! Agora, passa os dados para a sessão e redireciona o usuário
        $_SESSION["id_usuario"] = $dados["id"];
        $_SESSION["nome_usuario"] = stripslashes($dados["nome"]);
        $_SESSION["permissao"] = $dados["nivel"];
        header("Location: menu1/menu/menu.html");
        exit;
        }else{
        echo "Sem acesso";
        exit;
        }
    } else {
        echo "Senha inválida!";
        exit;
    }
} else {
    echo "O login fornecido por você é inexistente!";
    exit;
}*/

const express = require("express");
const session = require("express-session");
const db = require("./banco"); // Importando conexão de banco.js
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de sessão segura
app.use(session({
    secret: process.env.SESSION_SECRET || "seu_segredo_aqui",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, // Evita acesso via JavaScript no frontend
        secure: false,  // Altere para "true" se estiver usando HTTPS
        sameSite: "strict" // Protege contra ataques CSRF
    }
}));

app.post("/login", (req, res) => {
    const login = req.body.login?.trim() || null;
    const senha = req.body.senha?.trim() || null;

    if (!login || !senha) {
        return res.status(400).send("Você deve digitar sua senha e login!");
    }

    const sql = "SELECT id, nome, loguin, senha, nivel FROM usuarios WHERE loguin = ?";
    db.execute(sql, [login], (err, results) => {
        if (err) return res.status(500).send("Erro interno ao acessar o banco!");

        if (results.length === 0) {
            return res.status(404).send("O login fornecido é inexistente!");
        }

        const dados = results[0];

        // Verifica a senha com bcrypt
        bcrypt.compare(senha, dados.senha, (err, match) => {
            if (err) return res.status(500).send("Erro interno na verificação!");

            if (!match) {
                return res.status(401).send("Senha inválida!");
            }

            if (dados.nivel === "1") {
                req.session.id_usuario = dados.id;
                req.session.nome_usuario = dados.nome;
                req.session.permissao = dados.nivel;
                return res.redirect("/menu1/menu/menu.html");
            } else {
                return res.status(403).send("Sem acesso!");
            }
        });
    });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));