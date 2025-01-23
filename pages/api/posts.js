import connectDB from "./connect";

export default async function Posts(req, res) {
    try {
        const connection = await connectDB();
        const posts = await connection`SELECT * FROM blog ORDER BY data DESC;`;
        const comentarios = await connection`SELECT * FROM comentarios`;
        const data = {
          posts: posts,
          comentarios: comentarios
        }
        res.json(data); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter posts');
      }
}