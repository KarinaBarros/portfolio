import { authenticate } from "@/lib/auth";
import connectDB from "./connect";

async function AdminPost(req, res) {
    const {id} = req.body;
    try {
        const connection = await connectDB();
        const result = await connection`SELECT * FROM blog WHERE id = ${id}`;
        const post = Object.fromEntries(
            Object.entries(result[0]).map(([key, value]) => [
                key,
                typeof value === "string"
                    ? value.split("\n").map(line => line.trimStart()).join("\n") 
                    : value
            ])
        );
        res.json(post); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter o post');
      }
}

export default authenticate(AdminPost);