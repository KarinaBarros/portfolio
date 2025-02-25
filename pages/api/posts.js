import connectDB from "./connect";
let postsCache;
let timeCache = 0;
//tempo máximo de cache 20 minutos

export default async function Posts(req, res) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    if (token !== `Bearer ${process.env.API_TOKEN}`){
        return res.status(403).json({ error: 'Token inválido' });
    }
    const { slug } = req.body;
    const now = Date.now();
    const tempo = 20 * 60 * 1000;
    if (!postsCache || now - timeCache > tempo) {
        try {
            const connection = await connectDB();
            const data = await connection`SELECT 
                                                p.*,
                                                COALESCE(
                                                    (SELECT json_agg(b) 
                                                    FROM bloco b 
                                                    WHERE b.post_id = p.id), '[]'
                                                ) AS blocos,
                                                COALESCE(
                                                    (SELECT json_agg(c) 
                                                    FROM comentariospost c 
                                                    WHERE c.post_id = p.id AND c.aprovado = TRUE), '[]'
                                                ) AS comentarios
                                            FROM posts p
                                            ORDER BY p.id DESC`;
            postsCache = data;
            timeCache = now;
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao obter posts');
        }
    }
    if (req.method === 'GET') {
        const post = postsCache.map(({ slug, imagem, data, titulo, conteudo, destaque }) => ({
            slug, imagem, data, titulo, conteudo, destaque
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