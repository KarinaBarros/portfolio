import connectDB from "./connect";

export default async function Aprovar(req, res) {
    const {id} = req.body;
    try {
        const connection = await connectDB();
        await connection`UPDATE comentarios SET aprovado = true WHERE id = ${id}`;
        res.status(200).json({ message: 'Comentário autorizado!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao autorizar comentário.' });
      }
}