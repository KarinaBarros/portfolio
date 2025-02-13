import { authenticate } from "@/lib/auth";
import connectDB from "./connect";

async function AtualizarPost(req, res) {
    const connection = await connectDB();
    const { id, imagem, conteudo, classe, codigo, titulo2,
        conteudo2, classe2, codigo2, titulo3, conteudo3, classe3, codigo3,
        titulo4, conteudo4, classe4, codigo4, titulo5, conteudo5, descricao, tags } = req.body;
    const conteudoFormatado = conteudo.split("\n").map((line) => "\t" + line).join("\n");
    const conteudoFormatado2 = conteudo2.split("\n").map((line) => "\t" + line).join("\n");
    const conteudoFormatado3 = conteudo3.split("\n").map((line) => "\t" + line).join("\n");
    const conteudoFormatado4 = conteudo4.split("\n").map((line) => "\t" + line).join("\n");
    const conteudoFormatado5 = conteudo5.split("\n").map((line) => "\t" + line).join("\n");

    try {
        await connection`UPDATE blog SET imagem = ${imagem},
                            conteudo = ${conteudoFormatado},
                            classe = ${classe},
                            codigo = ${codigo},
                            titulo2 = ${titulo2},
                            conteudo2 = ${conteudoFormatado2},
                            classe2 = ${classe2},
                            codigo2 = ${codigo2},
                            titulo3 = ${titulo3},
                            conteudo3 = ${conteudoFormatado3},
                            classe3 = ${classe3},
                            codigo3 = ${codigo3},
                            titulo4 = ${titulo4},
                            conteudo4 = ${conteudoFormatado4},
                            classe4 = ${classe4},
                            codigo4 = ${codigo4},
                            titulo5 = ${titulo5},
                            conteudo5 = ${conteudoFormatado5},
                            descricao = ${descricao},
                            tags = ${tags}
                            WHERE id = ${id}`;

        res.status(200).json({ message: 'Post atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        res.status(500).json({ error: 'Erro ao atualizar dados no banco de dados.' });
    }
}

export default authenticate(AtualizarPost);