const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Caminho para o arquivo users.json
const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

// Função para ler dados dos usuários
const getUsersData = () => {
  try {
    const data = fs.readFileSync(usersDataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler arquivo users.json:', error);
    return [];
  }
};

// GET /users - Retorna todos os usuários
router.get('/', (req, res) => {
  const users = getUsersData();
  return res.json(users);
});

// GET /users/:id - Retorna um usuário específico por ID
router.get('/:id', (req, res) => {
  const users = getUsersData();
  const userId = req.params.id;

  // Procura o usuário pelo ID
  const user = users.find((u) => u._id === userId);

  if (!user) {
    return res.status(404).json({
      message: 'Usuário não encontrado',
    });
  }

  return res.json(user);
});

module.exports = router;
