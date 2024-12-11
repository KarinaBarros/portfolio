import { authenticate } from '../../lib/auth';

export default function protectedHandler(req, res) {
  authenticate(req, res, () => {
    res.status(200).json({ message: 'Você tem acesso a esta rota protegida', user: req.user });
  });
}
