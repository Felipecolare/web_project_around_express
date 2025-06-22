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
  res.json(users);
});

// GET /users/:id - Retorna usuário específico por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const users = getUsersData();

  const user = users.find((u) => u._id === id);

  if (!user) {
    return res.status(404).json({
      message: 'ID do usuário não encontrado',
    });
  }

  return res.json(user);
});

module.exports = router;
