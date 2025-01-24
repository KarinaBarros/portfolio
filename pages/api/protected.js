import { authenticate } from '../../lib/auth';

async function handler(req, res) {
  return res.status(200).json({ message: 'Você tem acesso a esta rota protegida', user: req.user });
}

export default authenticate(handler);

