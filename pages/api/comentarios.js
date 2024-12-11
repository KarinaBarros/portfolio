import connectDB from "./connect";

export default async function Comentarios(req, res) {
    const {post_id }= req.body;
    try {
        const connection = await connectDB();
        const comentarios = await connection`SELECT * FROM comentarios WHERE post_id = ${post_id} AND aprovado = true`;
        
        res.json(comentarios); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os comentarios');
      }
}