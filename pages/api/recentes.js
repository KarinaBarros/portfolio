import connectDB from "./connect";

export default async function Javascript(req, res) {
    try {
        const connection = await connectDB();
        const result = await connection`SELECT * FROM blog ORDER BY data DESC;`;
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao autorizar comentário.' });
      }
}