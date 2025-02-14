import connectDB from "./connect";
import { authenticate } from '../../lib/auth';
import nodemailer from 'nodemailer';

async function Responder(req, res) {
  const { mensagen, resposta } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
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
                  body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                  }
                  h1 {
                      color: #333;
                      margin: 15px auto;
                      font-size: 15px;
                  }
                  h2 {
                      margin: 0;
                  }
                  p {
                      color: #555;
                      font-size: 14px;
                  }
                  .imagem {
                      display: flex;
                      background-color: #3230c2;
                  }
                  img {
                      margin: 20px auto 0;
                      width: 30%;
                  }
                  .container {
                      width: calc(100% - 50px);
                      border: 15px solid #3230c2;
                      padding: 10px;
                  }
                  .response {
                      border-left: 3px solid #ccc;
                      padding-left: 10px;
                      background-color: #f4f4f4;
                      padding: 10px;
                      border-radius: 5px;
                  }
                  .rodape{
                      width: 190px;
                      margin-left: auto;
                      margin-right: 10px;
                  }
                </style>
            </head>

            <body>
                <div class="imagem">
                    <img src="https://karinabarros.dev.br/avatar.png" alt="avatar karina barros"/>
                </div>
                <div class="container">
                    <h2>Olá <b>${mensagen.nome}</b>,<h2>
                    <h1>Em resposta à ${mensagen.assunto}:</h1>
                    <p class="response">${mensagen.mensagem.replace(/\n/g, "<br>")}</p>
                    <p><b>Minha resposta:</b></p>
                    <p class="response">${resposta.replace(/\n/g, "<br>")}<br></p>
                    <p class="rodape">Atenciosamente,<br><b>Karina Ariane de Barros</b><br>Desenvolvedora Full Stack</p>
                </div>
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