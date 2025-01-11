import connectDB from "./connect";

export default async function Posts(req, res) {
    try {
        const connection = await connectDB();
        const posts = await connection`SELECT * FROM blog ORDER BY data DESC;`;
        res.json(posts); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter posts');
      }
}