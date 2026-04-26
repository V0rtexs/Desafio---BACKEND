// Importa o framework Express, Mongoose e CORS
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Cria a aplicação servidor
const app = express();

// 1. MIDDLEWARES (Sempre devem vir antes das rotas)
// Libera o CORS para o Frontend conseguir fazer as requisições
app.use(cors());

// Converte automaticamente o corpo da requisição em JSON
app.use(express.json());

// 2. CONFIGURAÇÃO DO BANCO DE DADOS
// Pega a URL de conexão da variável de ambiente do Railway
// Certifique-se de criar a variável DATABASE_URL lá no painel do Railway
const mongoURL = process.env.DATABASE_URL;

// Faz a conexão com o MongoDB
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', (error) => {
    console.log("Erro ao conectar no banco:", error);
});
db.once('connected', () => {
    console.log('Database Connected');
});

// 3. ROTAS
// Importa o arquivo de rotas localizado em "./routes/routes"
const routes = require('./routes/routes');
app.use('/api', routes);

// 4. INICIA O SERVIDOR
// Define a porta do servidor baseada no Railway ou 3000 local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});