import { authenticate } from "@/lib/auth";
import connectDB from "./connect";
import nodemailer from 'nodemailer';

async function Campanha(req, res) {
    const { contato, titulo, mensagem } = req.body;
    let bcc;
    const mensagemTratada = mensagem.split("\n").map((line) => "\t" + line).join("\n");
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },

    });

    try {
        const connection = await connectDB();
        if (contato === 'todos') {
            const dados = await connection`SELECT * FROM contatos`;
            let contatos = dados.map(item => item.email);
            contatos = contatos.join(",");
            bcc = contatos;
        } else {
            bcc = contato;
        }
        console.log(bcc);
        const mailOptions = {
            from: `"Karina Barros" <${process.env.EMAIL_USER}>`,
            bcc: bcc,
            subject: titulo,
            html: `<!DOCTYPE html>
                <html lang="pt-br">
    
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${titulo}</title>
                    <style>
                      body {
                          font-family: Arial, sans-serif;
                          margin: 0;
                      }
                      h1 {
                          margin: 30px auto;
                          font-size: 25px;
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
                      pre {
                        color: #222;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        font-size: 18px;
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
                        <h1>${titulo}</h1>
                        <pre>${mensagemTratada}</pre>
                        <p class="rodape"><b>Karina Ariane de Barros</b><br>Desenvolvedora Full Stack</p>
                    </div>
                </body>
    
                </html>`,
            headers: {
                "List-Unsubscribe": process.env.EMAIL_USER,
                "X-Mailer": "Nodemailer"
            },
            replyTo: process.env.EMAIL_USER,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Mensagens enviadas' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao enviar mensagens.' });
    }
}

export default authenticate(Campanha);