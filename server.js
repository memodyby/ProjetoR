const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const argon2 = require("argon2");
const db = require("./banco");
require("dotenv").config();

// ✅ Inicializa o Express
const app = express();

// ✅ Configuração de middlewares essenciais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Configuração de sessões (antes das rotas)
app.use(session({
    secret: process.env.SESSION_SECRET || "seu_segredo_super_seguro",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false, sameSite: "strict" }
}));

// ✅ Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// ✅ Importação das rotas corretamente
const ingredientesRouter = require("./paginas/ingredientesback");
const pratosRouter = require("./paginas/pratos/pratoback");

app.use("/api/ingredientes", ingredientesRouter);
app.use("/api/pratos", pratosRouter);

// ✅ Rota de login com `async/await` corretamente implementado
app.post("/login", async (req, res) => {
    try {
        console.log("📌 Dados recebidos:", req.body);

        const { login, senha } = req.body;
        if (!login || !senha) {
            return res.status(400).json({ mensagem: "Você deve digitar sua senha e login!" });
        }

        // ✅ Ajuste para usar `await db.query()`
        try {
            const [results] = await db.query("SELECT id, nome, login, senha, nivel FROM usuario WHERE login = ?", [login]);

            if (results.length === 0) {
                console.log("⚠️ Login inexistente:", login);
                return res.status(404).json({ mensagem: "O login fornecido é inexistente!" });
            }

            const dados = results[0];
            console.log("🔐 Hash salvo no banco:", dados.senha);

            // ✅ Verificação de senha com Argon2
            const match = await argon2.verify(dados.senha, senha);

            if (!match) {
                console.log("❌ Senha incorreta:", senha);
                return res.status(401).json({ mensagem: "Senha inválida!" });
            }

            console.log("✅ Senha correta! Login bem-sucedido!");
            req.session.id_usuario = dados.id;
            req.session.nome_usuario = dados.nome;
            req.session.permissao = dados.nivel;

            return res.json({ mensagem: "Login bem-sucedido!", redirecionar: "/paginas/menu/menu.html" });

        } catch (error) {
            console.error("❌ Erro na consulta SQL:", error);
            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }

    } catch (error) {
        console.error("❌ Erro inesperado:", error);
        res.status(500).json({ mensagem: "Erro interno no servidor!" });
    }
});

// ✅ Rota para verificar sessão do usuário
app.get("/verificar", (req, res) => {
    if (!req.session.id_usuario) {
        return res.status(401).json({ mensagem: "Usuário não autenticado!" });
    }
    res.json({ mensagem: `Bem-vindo, ${req.session.nome_usuario}!` });
});

// ✅ Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));