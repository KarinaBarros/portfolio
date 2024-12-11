import connectDB from "./connect";

export default async function Comentar(req, res) {
    const connection = await connectDB();
    const {nome, conteudo, post_id} = req.body;

    try{
        await connection `INSERT INTO comentarios (autor, conteudo, post_id) VALUES (${nome}, ${conteudo}, ${post_id})`;
        res.status(200).json({ message: 'Comentario inserido com sucesso! Aguardando a aprovação do administrador.' });
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ error: 'Erro ao inserir o comentário.' });
    }  
}