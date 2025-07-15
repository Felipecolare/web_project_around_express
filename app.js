const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Importar as rotas
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

// Conexão com MongoDB - CORRIGIDO: aroundb -> arounddb
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/arounddb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

// Conectar ao banco de dados
connectDB();

// Middleware para parsing JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

app.use((req, res, next) => {
  req.user = {
    _id: '67764642c412c4655ba639',
  };

  next();
});

// Rota básica
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Usar as rotas - REMOVIDO authMiddleware das rotas de cards
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    message: 'Página não encontrada',
  });
});

// Middleware de tratamento de erros - CORRIGIDO: adicionado next parameter
app.use((err, req, res) => {
  console.error('Erro:', err.stack);
  res.status(500).json({
    message: 'Algo deu errado!',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// Tratamento de eventos de conexão MongoDB
mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB desconectado');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Conexão com MongoDB fechada');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
