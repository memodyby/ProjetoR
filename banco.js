const mysql = require("mysql2/promise");

// Variáveis de ambiente para segurança
require("dotenv").config(); 

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "SQLsenha",
    database: process.env.DB_NAME || "js",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testando conexão com segurança
db.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar ao banco:", err.message);
        process.exit(1); // Encerra o processo em caso de falha crítica
    } else {
        console.log("Conexão com o banco de dados estabelecida!");
        connection.release(); // Libera a conexão após o teste
    }
});

// Exporta a conexão para outros módulos
module.exports = db;