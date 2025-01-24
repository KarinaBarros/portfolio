import jwt from 'jsonwebtoken';

export function authenticate(handler) {
  return async (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error('Erro ao verificar o token:', error.message);
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  };
}
