const express = require("express");
const session = require("express-session");
const db = require("./banco"); // Conexão com o banco de dados
require("dotenv").config(); // Variáveis de ambiente

const app = express();

// Configuração segura de sessão
app.use(session({
    secret: process.env.SESSION_SECRET || "seu_segredo_super_seguro",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,  // Mude para "true" se estiver usando HTTPS
        sameSite: "strict"
    }
}));

// Middleware para verificar sessão
app.use((req, res, next) => {
    if (!req.session.nome_usuario) {
        return res.status(401).send("Usuário não autenticado!");
    }
    next(); // Se autenticado, prossegue
});

// Endpoint para exibir mensagem de boas-vindas
app.get("/bemvindo", (req, res) => {
    if (!req.session.nome_usuario) {
        return res.status(401).send("Acesso negado. Faça login primeiro!");
    }

    res.send(`<p style="font-family:Verdana; font-size:14px;">Bem-Vindo ${req.session.nome_usuario}!</p>`);
});

// Inicia servidor na porta 3000
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));