import connectDB from "./connect";

export default async function Css(req, res) {
    try {
        const connection = await connectDB();
        const result = await connection`SELECT * FROM blog WHERE tema = 'css'`;
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao autorizar comentário.' });
      }
}