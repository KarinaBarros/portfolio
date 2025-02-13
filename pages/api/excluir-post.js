import { authenticate } from "@/lib/auth";
import connectDB from "./connect";

async function ExcluirPost(req, res) {
    const {id} = req.body;
    try {
        const connection = await connectDB();
        await connection`DELETE FROM blog WHERE id = ${id}`;
        res.status(200).json({ message: 'Post Excluído!' });
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os posts');
      }
}

export default authenticate(ExcluirPost);