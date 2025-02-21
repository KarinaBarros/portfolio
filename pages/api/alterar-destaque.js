import connectDB from "./connect";
import { authenticate } from '../../lib/auth';

async function AlterarDestaque(req, res) {
    const {id} = req.body;
    try {
        const connection = await connectDB();
        await connection`UPDATE posts SET destaque = false`;
        await connection`UPDATE posts SET destaque = true WHERE id = ${id}`;
        res.status(200).json({ message: 'Destaque alterado!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao alterar destaque.' });
      }
}

export default authenticate(AlterarDestaque);