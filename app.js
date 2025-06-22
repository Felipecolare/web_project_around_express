const express = require('express');
const path = require('path');

// Importar as rotas
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Middleware para servir arquivos estáticos (se necessário)
app.use(express.static(path.join(__dirname, 'public')));

// Rota básica
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Usar as rotas importadas
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

// Middleware de tratamento de erros
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Algo deu errado!',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    message: 'Página não encontrada',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
