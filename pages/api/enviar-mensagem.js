import connectDB from "./connect";
import { Limiter } from "@/lib/limiter";

export default async function EnviarMensagem(req, res) {
    const connection = await connectDB();
    const {nome, email, assunto, mensagem} = req.body;

    try{
        if (Limiter(req, res)) return;
        await connection `INSERT INTO mensagens (nome, email, assunto, mensagem) VALUES (${nome}, ${email}, ${assunto}, ${mensagem})`;
        res.status(200).json({ message: 'Mensagem enviada com sucesso. Entraremos em contato em breve.' });
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    }  
}