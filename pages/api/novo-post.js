import { authenticate } from "@/lib/auth";
import connectDB from "./connect";

async function NovoPost(req, res){
    const connection = await connectDB();
    const { tema, autor, imagem, titulo, conteudo, descricao, tags, blocos } = req.body;
    
    const slug = titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9\s]/g, '').replace(/ /g, '-');
  
    try {    
      const Titulo = await connection`SELECT * FROM posts WHERE slug = ${slug}`;
      if (Titulo[0]) {
        return res.status(404).json({ error: 'Título já existe, escolha outro título' });
    }
  
    const response = await connection`
    INSERT INTO posts (
        tema, autor, imagem, titulo, conteudo, slug, descricao, tags
    ) VALUES (
        ${tema}, ${autor}, ${imagem}, ${titulo}, ${conteudo}, ${slug}, ${descricao}, ${tags}
    ) RETURNING id`;
     const id = response[0].id;
    if(blocos.length > 0){
        await connection`INSERT INTO bloco (post_id, titulo_bloco, conteudo_bloco, classe, codigo)
      VALUES ${connection(blocos.map(b => [id, b.titulo_bloco, b.conteudo_bloco, b.classe, b.codigo]))}`;
    }
      res.status(200).json({ message: 'Post inserido com sucesso!' });
  } catch (error) {
      console.error('Erro ao inserir dados:', error);
      res.status(500).json({ error: 'Erro ao inserir dados no banco de dados.' });
  }
}

export default authenticate(NovoPost);