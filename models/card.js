const { Schema, model } = require('mongoose');

// Regex para validação de URLs
const URL_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return URL_REGEX.test(value);
      },
      message: 'Link inválido',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);

// Exportar também o regex para reutilização
module.exports.URL_REGEX = URL_REGEX;
