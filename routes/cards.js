const express = require('express');
const {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
// eslint-disable-next-line import/no-unresolved, import/extensions
} = require('../controllers/card');

const router = express.Router();

// GET /cards - Retorna todos os cartões
router.get('/', findCards);

// POST /cards - Cria um novo cartão
router.post('/', createCard);

// DELETE /cards/:cardId - Deleta um cartão por ID
router.delete('/:cardId', deleteCard);

// PUT /cards/:cardId/likes - Adiciona like a um cartão
router.put('/:cardId/likes', likeCard);

// DELETE /cards/:cardId/likes - Remove like de um cartão
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
