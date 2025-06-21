const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Rota básica
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Rota para usuários
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'João' },
    { id: 2, name: 'Maria' },
  ]);
});

// Rota para usuário específico
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: `Usuário ${id}` });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
  next();
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
