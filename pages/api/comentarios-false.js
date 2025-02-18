import { authenticate } from "@/lib/auth";
import connectDB from "./connect";

async function ComentariosFalse(req, res) {
    try {
        const connection = await connectDB();
        const comentarios = await connection`SELECT * FROM comentariospost WHERE aprovado = false`;
        res.json(comentarios); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os comentarios');
      }
}

export default authenticate(ComentariosFalse);