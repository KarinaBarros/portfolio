import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { senha } = req.body;

    if (!senha) {
      return res.status(400).json({ error: 'Senha não fornecida' });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const senhaCriptografada = await bcrypt.hash(senha, salt);

      return res.status(200).json({ senhaCriptografada });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criptografar a senha' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
