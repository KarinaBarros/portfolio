import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Servidor correto para Hotmail/Outlook/Office 365
  port: 587, // Porta SMTP correta para envio seguro
  secure: false, // Deve ser false para porta 587 (true só para 465)
  auth: {
    user: process.env.EMAIL_USER, // Seu e-mail Hotmail/Outlook
    pass: process.env.EMAIL_APP_PASSWORD, // Use a Senha de Aplicativo gerada
  },
  tls: {
    rejectUnauthorized: false, // Evita erros de TLS em alguns servidores
  },
});

export default transporter;
