import connectDB from "./connect";

export default async function Admin (req, res){
    const connection = await connectDB();
    const { tema, autor, imagem, titulo, conteudo, classe, codigo, titulo2,
         conteudo2, classe2, codigo2, titulo3, conteudo3, classe3, codigo3,
          titulo4, conteudo4, classe4, codigo4, titulo5, conteudo5 } = req.body;
    const tituloSlug = titulo.toLowerCase();
    const conteudoFormatado = conteudo.split("\n").map((line) => "\t" + line).join("\n");
    const conteudoFormatado2 = conteudo2.split("\n").map((line) => "\t" + line).join("\n");
    const conteudoFormatado3 = conteudo3.split("\n").map((line) => "\t" + line).join("\n");
    const conteudoFormatado4 = conteudo4.split("\n").map((line) => "\t" + line).join("\n");
    const conteudoFormatado5 = conteudo5.split("\n").map((line) => "\t" + line).join("\n");
  
    try {    
      const Titulo = await connection`SELECT * FROM blog WHERE LOWER(titulo) = ${tituloSlug}`;
      if (Titulo[0]) {
        console.log('Título já existe');
        return res.status(404).json({ error: 'Título já existe, escolha outro título' });
    }
  
    await connection`
    INSERT INTO blog (
        tema, autor, imagem, titulo, conteudo, classe, codigo, 
        titulo2, conteudo2, classe2, codigo2, titulo3, conteudo3, 
        classe3, codigo3, titulo4, conteudo4, classe4, codigo4, 
        titulo5, conteudo5
    ) VALUES (
        ${tema}, ${autor}, ${imagem}, ${titulo}, ${conteudoFormatado}, ${classe}, ${codigo}, 
        ${titulo2}, ${conteudoFormatado2}, ${classe2}, ${codigo2}, ${titulo3}, ${conteudoFormatado3}, 
        ${classe3}, ${codigo3}, ${titulo4}, ${conteudoFormatado4}, ${classe4}, ${codigo4}, 
        ${titulo5}, ${conteudoFormatado5}
    )`;
      res.status(200).json({ message: 'Post inserido com sucesso!' });
  } catch (error) {
      console.error('Erro ao inserir dados:', error);
      res.status(500).json({ error: 'Erro ao inserir dados no banco de dados.' });
  }
}