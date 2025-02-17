import connectDB from "./connect";
import { Limiter } from "@/lib/limiter";
import sanitize from "sanitize-html";

export default async function Comentar(req, res) {
    const connection = await connectDB();
    const {nome, conteudo, post_id} = req.body;
    const nomeSeguro = sanitize(nome);
    const conteudoSeguro = sanitize(conteudo);

    try{
        if (Limiter(req, res)) return;
        await connection `INSERT INTO comentarios (autor_comentario, conteudo_comentario, post_id) VALUES (${nomeSeguro}, ${conteudoSeguro}, ${post_id})`;
        res.status(200).json({ message: 'Comentario inserido com sucesso! Aguardando a aprovação do administrador.' });
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ error: 'Erro ao inserir o comentário.' });
    }  
}