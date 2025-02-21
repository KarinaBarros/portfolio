import { authenticate } from "@/lib/auth";
import connectDB from "./connect";

async function Destaque(req, res) {
    try {
        const connection = await connectDB();
        const comentarios = await connection`SELECT * FROM posts`;
        res.json(comentarios); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter o destaque');
      }
}

export default authenticate(Destaque);