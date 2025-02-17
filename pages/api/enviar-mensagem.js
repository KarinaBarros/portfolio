import connectDB from "./connect";
import { Limiter } from "@/lib/limiter";
import sanitize from "sanitize-html";

export default async function EnviarMensagem(req, res) {
    const connection = await connectDB();
    const {nome, email, assunto, mensagem} = req.body;
    const nomeSeguro = sanitize(nome);
    const emailSeguro = sanitize(email);
    const assuntoSeguro = sanitize(assunto);
    const mensagemSegura = sanitize(mensagem);

    try{
        if (Limiter(req, res)) return;
        await connection `INSERT INTO mensagens (nome, email, assunto, mensagem) VALUES (${nomeSeguro}, ${emailSeguro}, ${assuntoSeguro}, ${mensagemSegura})`;
        res.status(200).json({ message: 'Mensagem enviada com sucesso. Entraremos em contato em breve.' });
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    }  
}