import connectDB from "./connect";
import { authenticate } from '../../lib/auth';

async function ResponderComentario (req, res) {
    const {id, resposta} = req.body;
    try {
        const connection = await connectDB();
        await connection`UPDATE comentarios SET resposta = ${resposta} WHERE id_comentario = ${id}`;
        res.status(200).json({ message: 'Comentário respondido!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao responder comentário.' });
      }
}

export default authenticate(ResponderComentario);