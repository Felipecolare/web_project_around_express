const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Caminho para o arquivo cards.json
const cardsDataPath = path.join(__dirname, '..', 'data', 'cards.json');

// Função para ler dados dos cards
const getCardsData = () => {
  try {
    const data = fs.readFileSync(cardsDataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler arquivo cards.json:', error);
    return [];
  }
};

// GET /cards - Retorna todos os cards
router.get('/', (req, res) => {
  const cards = getCardsData();
  res.json(cards);
});

module.exports = router;
