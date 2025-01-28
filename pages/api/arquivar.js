import connectDB from "./connect";
import { authenticate } from '../../lib/auth';

async function Arquivar (req, res) {
    const {id} = req.body;
    
    try {
        const connection = await connectDB();
        await connection`UPDATE mensagens SET status = 'arquivada' WHERE id = ${id}`;
        res.status(200).json({ message: 'Mensagem Arquivada!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao arquivar mensagem.' });
      }
}

export default authenticate(Arquivar);