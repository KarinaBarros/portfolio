import connectDB from "./connect";

export default async function Slug(req, res) {
    const { postSlug }= req.body;
    const titulo = postSlug.replace(/-/g, " ");
    
    try {
        if (!postSlug || typeof postSlug !== "string") {
            return res.status(400).json({ error: "Parâmetro postSlug inválido" });
          }
        const connection = await connectDB();
        const post = await connection`SELECT * FROM blog WHERE unaccent(LOWER(titulo)) = ${titulo};`;
        const comentarios = await connection`SELECT c.*
                                              FROM comentarios c
                                              INNER JOIN blog b ON b.id = c.post_id
                                              WHERE unaccent(LOWER(b.titulo)) = ${titulo}
                                              AND c.aprovado = true
                                              ORDER BY c.id_comentario`;
        const data = {
          post: post[0],
          comentarios: comentarios
        }
        res.json(data); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter o post');
      }
    }