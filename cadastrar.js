const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Configuração do banco
const db = mysql.createPool({
    host: "localhost",
    user: "seu_usuario",
    password: "sua_senha",
    database: "projectr"
});

// ✅ Rota para processar o cadastro
app.post("/cadastrar", async (req, res) => {
    const { nov_nome: nome, nov_log: loguin, nov_senha: senha, n1: nivel } = req.body;

    if (!nome || !loguin || !senha || !nivel) {
        return res.status(400).send("⚠️ Todos os campos são obrigatórios!");
    }

    // ✅ Criptografa a senha
    const hash = await bcrypt.hash(senha, 10);

    // ✅ Confirma se login contém apenas números
    if (!/^\d+$/.test(loguin)) {
        return res.status(400).send("⚠️ O login deve conter apenas números!");
    }

    try {
        // ✅ Insere no banco
        await db.execute(
            "INSERT INTO usuarios (nome, loguin, senha, nivel) VALUES (?, ?, ?, ?)",
            [nome, loguin, hash, nivel]
        );

        res.redirect("/index.html"); // 🔥 Substitua `index.php` pelo novo arquivo
    } catch (error) {
        console.error("❌ Erro ao cadastrar usuário:", error);
        res.status(500).send("Erro interno no servidor.");
    }
});

// ✅ Inicializa o servidor
app.listen(3000, () => console.log("🚀 Servidor rodando em http://localhost:3000"));