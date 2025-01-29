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
        from: `"Karina Barros" <${process.env.EMAIL_USER}>`, 
        to: mensagen.email,
        subject: `Resposta a ${mensagen.assunto}`,
        html: `<!DOCTYPE html>
        <html lang="pt-br">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Resposta ao seu contato</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
              h1 { color: #333; }
              p { color: #555; font-size: 14px; }
              .response { border-left: 3px solid #ccc; padding-left: 10px; background-color: #f4f4f4; padding: 10px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <h1>Olá <b>${mensagen.nome}</b>,</h1>
            <p>Em resposta à sua mensagem:</p>
            <p class="response">${mensagen.mensagem.replace(/\n/g, "<br>")}</p>
            <p><b>Minha resposta:</b></p>
            <p class="response">${resposta.replace(/\n/g, "<br>")}</p>
            <p>Atenciosamente,<br><b>Karina Ariane de Barros</b><br>Desenvolvedora Full Stack</p>
          </body>
        </html>`,
        headers: {
          "List-Unsubscribe": process.env.EMAIL_USER, 
          "X-Mailer": "Nodemailer"
        },
        replyTo: process.env.EMAIL_USER, 
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