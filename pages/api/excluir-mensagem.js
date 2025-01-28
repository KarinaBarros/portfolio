import connectDB from "./connect";
import { authenticate } from '../../lib/auth';

async function ExcluirMensagem (req, res) {
    const {id} = req.body;
    try {
        const connection = await connectDB();
        await connection`DELETE FROM mensagens WHERE id = ${id}`;
        res.status(200).json({ message: 'Mensagem excluida!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir mensagem.' });
      }
}

export default authenticate(ExcluirMensagem);