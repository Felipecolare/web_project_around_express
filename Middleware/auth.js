// Middleware temporário para simular autenticação
const authMiddleware = (req, res, next) => {
  // Substitua este ID pelo ID real do usuário criado no MongoDB
  req.user = {
    _id: '686481c08bc1145e2801bb2e', // IMPORTANTE: Substitua pelo ID real do usuário
  };
  next();
};

module.exports = authMiddleware;
