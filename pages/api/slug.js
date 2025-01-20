import connectDB from "./connect";

export default async function Slug(req, res) {
    const { postSlug }= req.body;
    console.log(postSlug);
    try {
        if (!postSlug || typeof postSlug !== "string") {
            return res.status(400).json({ error: "Parâmetro postSlug inválido" });
          }
        const connection = await connectDB();
        const post = await connection`SELECT * FROM blog WHERE titulo = ${postSlug};`;
        res.json(post); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter o post');
      }
    }