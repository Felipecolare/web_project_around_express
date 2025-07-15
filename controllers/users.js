const mongoose = require('mongoose');
const User = require('../models/user');

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  if (!(name && about && avatar)) {
    return res.status(400).send({ message: 'Dados inválidos' });
  }

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      console.error('Erro ao criar usuário:', err);
      return res.status(500).send({ message: err.message });
    });
}

function findUsers(req, res) {
  return User.find({})
    .then((users) => {
      if (!users) {
        return res.status(404).send({ message: 'Usuários não encontrados' });
      }
      return res.status(200).json(users);
    })
    .catch((err) => {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).send({ message: err.message });
    });
}

function findUserById(req, res) {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: 'ID inválido' });
  }
  return User.findById(userId)
    .orFail()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).send({ message: err.message });
    });
}

function updateUser(req, res) {
  const userId = req.user._id;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail(() => {
      const error = new Error('Nenhum usuário encontrado com esse id');
      error.statusCode = 404;
      throw error;
    })
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((err) => {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).send({ message: err.message });
    });
}

function updateAvatar(req, res) {
  const userId = req.user._id;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .orFail(() => {
      const error = new Error('Nenhum usuário encontrado com esse id');
      error.statusCode = 404;
      throw error;
    })
    .then((updatedAvatar) => res.status(200).json(updatedAvatar))
    .catch((err) => {
      console.error('Erro ao atualizar avatar:', err);
      return res.status(500).send({ message: err.message });
    });
}

module.exports = {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  updateAvatar,
};
