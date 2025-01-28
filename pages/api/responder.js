import connectDB from "./connect";
import { authenticate } from '../../lib/auth';
import nodemailer from 'nodemailer';

async function Responder(req, res) {
    const { mensagen, resposta } = req.body;
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },

    });
    const mailOptions = {
        from: `Karina Barros <${process.env.EMAIL_USER}>`,
        to: mensagen.email,
        subject: `Resposta a ${mensagen.assunto}`,
        html: `<p>Olá <b>${mensagen.nome}</b>,</p>
       <p>Em resposta à sua mensagem:</p>
       <p style="border-left: 3px solid #ccc; padding-left: 10px; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
           ${mensagen.mensagem.replace(/\n/g, "<br>")}
       </p>
       <p><b>Minha resposta:</b></p>
       <p style="border-left: 3px solid #ccc; padding-left: 10px; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
           ${resposta.replace(/\n/g, "<br>")}
       </p>
       <p>Atenciosamente,<br><b>Karina Ariane de Barros</b><br>Desenvolvedora Full Stack</p>`

    };
    try {
        await transporter.sendMail(mailOptions);
        const connection = await connectDB();
        await connection`UPDATE mensagens SET status = 'respondida' WHERE id = ${mensagen.id}`;
        res.status(200).json({ message: 'Email enviado!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao enviar o email.' });
    }
}

export default authenticate(Responder);