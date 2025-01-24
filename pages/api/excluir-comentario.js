import connectDB from "./connect";
import { authenticate } from '../../lib/auth';

async function Excluir (req, res) {
    const {id} = req.body;
    try {
        const connection = await connectDB();
        await connection`DELETE FROM comentarios WHERE id_comentario = ${id}`;
        res.status(200).json({ message: 'Comentário excluído!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir comentário.' });
      }
}

export default authenticate(Excluir);