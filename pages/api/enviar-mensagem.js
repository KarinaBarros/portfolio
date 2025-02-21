import connectDB from "./connect";
import { Limiter } from "@/lib/limiter";
import sanitize from "sanitize-html";
import nodemailer from 'nodemailer';

export default async function EnviarMensagem(req, res) {
    const connection = await connectDB();
    const {nome, email, assunto, mensagem} = req.body;
    const nomeSeguro = sanitize(nome);
    const emailSeguro = sanitize(email).trim();
    const assuntoSeguro = sanitize(assunto);
    const mensagemSegura = sanitize(mensagem);

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
        to: emailSeguro,
        subject: `Confirmação de recebimento de mensagem`,
        html: `<!DOCTYPE html>
            <html lang="pt-br">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmação de recebimento de e-mail</title>
                <style>
                  body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                      text-align: center;
                  }
                  h1 {
                      color: #333;
                      margin: 30px auto;
                      font-size: 22px;
                      text-align: center;
                  }
                  h2 {
                      margin: 30px 0 30px;
                      text-align: center;
                  }
                  p {
                      color: #555;
                      text-align: center;
                      font-size: 20px;
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
                  a{
                    margin: 0 auto;
                  }
                  .rodape{
                      width: 230px;
                      margin-left: auto;
                      margin-right: 30px;
                      margin-top: 50px;
                      font-size: 18px;
                  }
                </style>
            </head>

            <body>
                <div class="imagem">
                    <img src="https://karinabarros.dev.br/avatar.png" alt="avatar karina barros"/>
                </div>
                <div class="container">
                    <h1>Confirmação de recebimento de mensagem:</h1>
                    <h2>Olá <b>${nomeSeguro}</b>,</h2>
                    <p>Recebemos seu e-mail e agradecemos pelo contato. Assim que possível, retornaremos com uma resposta.</p>
                    <p><b>Se sua mensagem for urgente, entre em contato pelo WhatsApp clicando no link abaixo:</b></p>
                    <a href="https://wa.me/5516997872488" target="_blank">Fale comigo no WhatsApp</a>
                    <p>Caso não tenha sido você quem enviou este e-mail, favor desconsiderar esta mensagem.</p>
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

    try{
        if (Limiter(req, res)) return;
        await connection `INSERT INTO mensagens (nome, email, assunto, mensagem) VALUES (${nomeSeguro}, ${emailSeguro}, ${assuntoSeguro}, ${mensagemSegura})`;
        const response = await connection `SELECT * FROM contatos WHERE email = ${emailSeguro}`;
        if(response.length === 0){
            await connection `INSERT INTO contatos (nome, email) VALUES (${nomeSeguro}, ${emailSeguro})`;
        }
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Mensagem enviada com sucesso. Entraremos em contato em breve.' });
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ message: error.message || 'Erro ao enviar o email.' });
    }  
}