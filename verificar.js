const express = require("express");
const session = require("express-session");
require("dotenv").config(); // Para usar variáveis de ambiente

const app = express();

// Configuração segura de sessão
app.use(session({
    secret: process.env.SESSION_SECRET || "seu_segredo_super_seguro",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // Altere para "true" se estiver usando HTTPS
        sameSite: "strict"
    }
}));

// Middleware de verificação de login
const verificarSessao = (req, res, next) => {
    if (!req.session.id_usuario || !req.session.nome_usuario) {
        return res.redirect("/index.html"); // Redireciona para página de login se não autenticado
    }
    next();
};

// Exemplo de uso do middleware em uma rota protegida
app.get("/area-protegida", verificarSessao, (req, res) => {
    res.send(`Bem-vindo, ${req.session.nome_usuario}!`);
});

// Inicia servidor na porta 3000
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

module.exports = verificarSessao; // Exporta para uso em outras rotas