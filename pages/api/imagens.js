import fs from 'fs';
import path from 'path';
import { authenticate } from "@/lib/auth";

async function Imagens(req, res) {
    const pastaPublica = path.join(process.cwd(), 'public/blog');
    fs.readdir(pastaPublica, (err, arquivos) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao ler a pasta' });
        }
        console.log(arquivos);
        res.status(200).json({ arquivos });
      });
}

export default authenticate(Imagens);