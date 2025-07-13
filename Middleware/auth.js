// Middleware temporário para simular autenticação
const authMiddleware = (req, res, next) => {
  // Substitua este ID pelo ID real do usuário criado no MongoDB
  req.user = {
    _id: '67764642c412c4655ba639', // IMPORTANTE: Substitua pelo ID real do usuário
  };
  next();
};

module.exports = authMiddleware;
