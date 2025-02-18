import { authenticate } from "@/lib/auth";
import connectDB from "./connect";

async function AdminPosts(req, res) {
    try {
        const connection = await connectDB();
        const posts = await connection`SELECT id, titulo FROM posts ORDER BY id ASC`;
        res.json(posts); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os posts');
      }
}

export default authenticate(AdminPosts);