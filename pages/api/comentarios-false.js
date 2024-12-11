import connectDB from "./connect";

export default async function ComentariosFalse(req, res) {
    try {
        const connection = await connectDB();
        const comentarios = await connection`SELECT * FROM comentarios WHERE aprovado = false`;
        res.json(comentarios); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os comentarios');
      }
}