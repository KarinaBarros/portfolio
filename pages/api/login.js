import jwt from 'jsonwebtoken';

export default async function loginHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, password } = req.body;

  if (
    email !== process.env.USER_EMAIL ||
    password !== process.env.USER_PASSWORD
  ) {
    console.log('Credenciais inválidas');
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
}

