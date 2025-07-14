const { Schema, model } = require('mongoose');
const { URL_REGEX } = require('./card');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return URL_REGEX.test(value);
      },
      message: 'Link inválido',
    },
  },
});

module.exports = model('user', userSchema);
