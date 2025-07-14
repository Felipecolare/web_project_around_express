const express = require('express');
const {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  updateAvatar,

} = require('../controllers/users');

const router = express.Router();

// GET /users - Retorna todos os usuários
router.get('/', findUsers);

// GET /users/:id - Retorna um usuário específico por ID
router.get('/:id', findUserById);

// POST /users - Cria um novo usuário
router.post('/', createUser);

// PATCH /users/me - Atualiza o usuário atual
router.patch('/me', updateUser);

// PATCH /users/me/avatar - Atualiza o avatar do usuário atual
router.patch('/me/avatar', updateAvatar);

module.exports = router;
