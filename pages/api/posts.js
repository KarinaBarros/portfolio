import connectDB from "./connect";

export default async function Posts(req, res) {
  try {
    const connection = await connectDB();
    const posts = await connection`SELECT 
                                    bl.*, 
                                    COALESCE(
                                        JSON_AGG(
                                            CASE 
                                                WHEN co.aprovado = TRUE THEN 
                                                    JSON_BUILD_OBJECT(
                                                        'id', co.id_comentario,
                                                        'autor', co.autor_comentario,
                                                        'conteudo', co.conteudo_comentario
                                                    )
                                                ELSE NULL
                                            END
                                            ) FILTER (WHERE co.aprovado = TRUE), -- Filtro para garantir que só comentários aprovados sejam agregados
                                        '[]'::JSON
                                    ) AS comentarios
                                FROM 
                                    blog AS bl
                                LEFT JOIN 
                                    comentarios AS co 
                                ON 
                                    bl.id = co.post_id
                                GROUP BY 
                                    bl.id
                                ORDER BY 
                                    bl.id DESC;`;
   
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter posts');
  }
}