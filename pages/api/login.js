import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import connectDB from "./connect";

export default async function loginHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }
  const { email, password } = req.body;
  const connection = await connectDB();
  const result = await connection`SELECT * FROM usuario WHERE email = ${email};`;
  let usuario;
  if(result.length>0){
    usuario = result[0];
  }

  if (!usuario) {
    console.log('Credenciais inválidas');
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  const desc =  await bcrypt.compare(password, usuario.senha);

  if (!desc) {
    console.log('Credenciais inválidas');
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
}

