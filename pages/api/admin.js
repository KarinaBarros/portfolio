import connectDB from "./connect";
import { authenticate } from '../../lib/auth';

async function Admin(req, res) {
    
    try {
        const connection = await connectDB();
        const mensagens = await connection`SELECT COUNT(*) FROM mensagens WHERE status = 'nao-respondida';`;
        const comentarios = await connection`SELECT COUNT(*) FROM comentariospost WHERE aprovado = FALSE;`;
        
        const data = {
            mensagens: mensagens[0].count,
            comentarios: comentarios[0].count
        }
        res.json(data); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados');
      }
    }

    export default authenticate(Admin);

    