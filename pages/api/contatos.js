import { authenticate } from "@/lib/auth";
import connectDB from "./connect";

async function Contatos(req, res) {
    try {
        const connection = await connectDB();
        const contatos = await connection`SELECT * FROM contatos`;
        res.json(contatos); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os contatos');
      }
}

export default authenticate(Contatos);