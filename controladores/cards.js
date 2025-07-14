const Card = require('../models/card');

function createCard(req, res) {
  const { name, link } = req.body;

  if (!(name && link)) {
    return res.status(400).send({ message: 'Dados inválidos' });
  }

  // Usar um ID fixo por enquanto (substitua pelo ID real do seu usuário)
  const ownerId = req.user ? req.user._id : '67764642c412c4655ba639';

  return Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      console.error('Erro ao criar cartão:', err);
      return res.status(500).send({ message: err.message });
    });
}

function findCards(req, res) {
  return Card.find({})
    .populate('owner', 'name about avatar')
    .then((cards) => res.status(200).json(cards))
    .catch((err) => {
      console.error('Erro ao buscar cartões:', err);
      return res.status(500).send({ message: err.message });
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  return Card.findByIdAndDelete(cardId)
    .orFail(() => {
      const error = new Error('Nenhum cartão encontrado com esse id');
      error.statusCode = 404;
      throw error;
    })
    .then(() => res.status(200).send({ message: 'Cartão deletado com sucesso' }))
    .catch((err) => {
      console.error('Erro ao deletar cartão:', err);
      return res.status(500).send({ message: err.message });
    });
}

function likeCard(req, res) {
  const { cardId } = req.params;
  const userId = req.user ? req.user._id : '67764642c412c4655ba639';

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Nenhum cartão encontrado com esse id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      console.error('Erro ao curtir cartão:', err);
      return res.status(500).send({ message: err.message });
    });
}

function dislikeCard(req, res) {
  const { cardId } = req.params;
  const userId = req.user ? req.user._id : '67764642c412c4655ba639';

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Nenhum cartão encontrado com esse id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      console.error('Erro ao descurtir cartão:', err);
      return res.status(500).send({ message: err.message });
    });
}

module.exports = {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
