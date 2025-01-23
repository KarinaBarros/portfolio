import jwt from 'jsonwebtoken';

export function authenticate(handler) {
  return async (req, res) => {
    const authHeader = req.headers['authorization'];  // Certifique-se de usar 'authorization' em minúsculas

    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];  // Extrai o token do cabeçalho
    if (!token) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // Anexa o usuário decodificado ao objeto `req`
      return handler(req, res);  // Chama o manipulador original
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  };
}
