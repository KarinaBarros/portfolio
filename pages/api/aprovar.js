import connectDB from "./connect";
import { authenticate } from '../../lib/auth';

async function Aprovar (req, res) {
    const {id} = req.body;
    try {
        const connection = await connectDB();
        await connection`UPDATE comentarios SET aprovado = true WHERE id_comentario = ${id}`;
        res.status(200).json({ message: 'Comentário autorizado!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao autorizar comentário.' });
      }
}

export default authenticate(Aprovar);