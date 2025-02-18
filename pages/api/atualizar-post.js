import { authenticate } from "@/lib/auth";
import connectDB from "./connect";



async function AtualizarPost(req, res) {
    const connection = await connectDB();
    const { id, autor, imagem, conteudo, descricao, tags, blocos, tema } = req.body;

    try {    
    
      await connection`UPDATE posts SET
                            tema = ${tema}, 
                            autor = ${autor}, 
                            imagem = ${imagem}, 
                            conteudo = ${conteudo}, 
                            descricao =${descricao}, 
                            tags = ${tags}
                            WHERE id = ${id};
                        `;
        await connection`DELETE FROM bloco WHERE post_id = ${id}`;
      if(blocos.length > 0){
        await connection`INSERT INTO bloco (post_id, titulo_bloco, conteudo_bloco, classe, codigo)
      VALUES ${connection(blocos.map(b => [id, b.titulo_bloco, b.conteudo_bloco, b.classe, b.codigo]))}`;
    }
        res.status(200).json({ message: 'Post editado com sucesso!' });
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ error: 'Erro ao inserir dados no banco de dados.' });
    }
}

export default authenticate(AtualizarPost);