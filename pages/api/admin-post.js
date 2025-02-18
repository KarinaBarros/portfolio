import { authenticate } from "@/lib/auth";
import connectDB from "./connect";

async function AdminPost(req, res) {
  const { id } = req.body;
  try {
    const connection = await connectDB();
    const result = await connection`SELECT 
                                          p.*,  -- Retorna todos os campos da tabela posts
                                          COALESCE(json_agg(b) FILTER (WHERE b.id_bloco IS NOT NULL), '{}') AS blocos
                                      FROM posts p
                                      LEFT JOIN bloco b ON p.id = b.post_id
                                      WHERE p.id = ${id}
                                      GROUP BY p.id;`;

    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter o post');
  }
}

export default authenticate(AdminPost);