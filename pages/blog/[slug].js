import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import 'prismjs';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import Nav from "@/components/nav/nav";
import '@/app/globals.css';
import '@/styles/slug.css';
import { format } from "date-fns";
import HeadSlug from "@/components/head-slug";

export async function getStaticPaths() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
        });
        const posts = response.data;

        const paths = posts.map(post => ({
            params: { slug: post.slug },
        }));

        return {
            paths,
            fallback: 'blocking',
        };
    } catch (error) {
        console.error('Erro ao buscar os posts:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/posts`, { slug: params.slug }, {
            headers:{
                Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
        });
        const post = response.data;
        return {
            props: { post },
            revalidate: false
        };
    } catch (error) {
        console.error("Erro ao gerar os posts:", error.message);
        return {
            props: { post: null },
        };
    }
}

export default function Post({ post }) {
    const codeRefs = useRef([]);
    if (post?.blocos?.length > 0) {
        codeRefs.current = post.blocos.map((_, i) => codeRefs.current[i] || React.createRef());
    }    
    const [messages, setMessages] = useState({});
    const [nome, setNome] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
        
    }, [post]);

    const handleCopy = async (index) => {
        const ref = codeRefs.current[index];

        if (ref && ref.current) {
            try {
                await navigator.clipboard.writeText(ref.current.innerText); // Copia o conteúdo

                // Atualiza a mensagem indicando sucesso
                setMessages({ [index]: 'Copiado para a área de transferência!' });
            } catch (err) {
                console.error("Erro ao copiar:", err);
                setMessages({ [index]: 'Erro ao copiar' });
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        try {
            const res = await axios.post('/api/comentar', { nome, conteudo, post_id: post.id });
            alert(res.data.message);
            setNome('');
            setConteudo('');
            setDisabled(false);
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert('Erro ao conectar ao servidor.');
            }
            setDisabled(false);
        }
    }

    return (
        <>
            {post && (
                <HeadSlug
                    title={post.titulo}
                    description={post.descricao}
                    keywords={post.tags}
                    slug={post.slug}
                    imagem={post.imagem}
                    data={post.data} />
            )}
            <Nav />
            <article className="slug">
                <div className="container-posts">
                    {post && (
                        <div>
                            <h1>{post.titulo}</h1>

                            <img className="img-post" src={`/blog/${post.imagem}`} alt={`imagem de linguagem ícone de ${post.tema}`}></img>

                            {post.conteudo && (
                                <pre className="conteudo">{post.conteudo.split("\n").map((line) => "\t" + line).join("\n")}</pre>
                            )}
                            {post.blocos.length > 0 && (post.blocos.map((bloco, index) => (
                                <div key={bloco.id_bloco}>
                                    {bloco.conteudo_bloco && (
                                        <div>
                                            {bloco.titulo_bloco && (<h2>{bloco.titulo_bloco}</h2>)}
                                            <pre className="conteudo">{bloco.conteudo_bloco.split("\n").map((line) => "\t" + line).join("\n")}</pre>
                                        </div>
                                    )}
                                    {bloco.codigo && (
                                        <div className="codigo">
                                            <div className="copy">

                                                <button onClick={() => handleCopy(index)}>Copy</button>
                                                <p>{messages[index]}</p>
                                            </div>
                                            <pre className={bloco.classe}>
                                                <code ref={codeRefs.current[index]} className={bloco.classe}>{bloco.codigo}</code>
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            )))}
                            <br /><br /><br />
                            <p className="right">Data: {post.data ? format(new Date(post.data), 'dd/MM/yyyy') : 'Data não disponível'}</p>
                            <p className="right">Autor: {post.autor}</p>
                            <br /><br />
                            {post.comentarios?.length > 0 && (
                                post.comentarios.map((comentario) => (
                                    <div key={comentario.id_comentario} className="comentario">
                                        <p>{comentario.autor_comentario}</p>
                                        <p>{format(new Date(comentario.criado), 'dd/MM/yyyy')}</p>
                                        <p>{comentario.conteudo_comentario}</p>
                                        {comentario.resposta && (
                                            <div className="resposta">
                                                <p>Resposta de Karina Barros:</p>
                                                <p>{comentario.resposta}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}

                            <form className="formulario" onSubmit={handleSubmit}>
                                <p>Deixe seu comentário</p><br />
                                <label>Nome<br />
                                    <input
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </label>
                                <br />
                                <label>Conteúdo<br />
                                    <textarea
                                        value={conteudo}
                                        onChange={(e) => setConteudo(e.target.value)}
                                    />
                                </label>
                                <br />
                                <button type="submit" disabled={disabled}>{!disabled ? 'Enviar' : 'Enviando'}</button>
                            </form>
                        </div>


                    )}
                </div>
            </article>
        </>
    )
}