import connectDB from "./connect";

export default async function Pesquisa(req, res) {
    const {pesquisa} = req.body;
    console.log('pesquisa', pesquisa);
    try {
        const connection = await connectDB();
        const result = await connection`
            SELECT * FROM blog WHERE titulo ILIKE ${`%${pesquisa}%`}
        `;
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao autorizar comentário.' });
      }
}