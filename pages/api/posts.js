import connectDB from "./connect";
let postsCache;
let timeCache = 0;
//tempo máximo de cache 20 minutos

export default async function Posts2(req, res) {
    const { slug } = req.body;
    const now = Date.now();
    const tempo = 20 * 60 * 1000;
    if (!postsCache || now - timeCache > tempo) {
        try {
            const connection = await connectDB();
            const data = await connection`SELECT 
                                            bl.*, 
                                            COALESCE(
                                                JSON_AGG(
                                                    JSON_BUILD_OBJECT(
                                                        'id', co.id_comentario,
                                                        'autor', co.autor_comentario,
                                                        'conteudo', co.conteudo_comentario,
                                                        'resposta', co.resposta
                                                    )
                                                ) FILTER (WHERE co.aprovado = TRUE),
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
                                            bl.id DESC;
                                        `;
            postsCache = data;
            timeCache = now;
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao obter posts');
        }
    }
    if (slug === 'todos') {
        const post = postsCache.map(({ slug, imagem, data, titulo, conteudo }) => ({
            slug, imagem, data, titulo, conteudo
        }));
        res.json(post);
    } else {
        const post = postsCache.find(item => item.slug === slug)
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Nenhum post encontrado');
        }
    }
}