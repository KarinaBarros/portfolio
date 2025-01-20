import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import 'prismjs';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import Nav from "@/components/nav/nav";
import '@/app/globals.css';
import '@/styles/slug.css';
import { format } from "date-fns";

export default function Posts() {
    const { query } = useRouter();
    const postSlug = query?.slug;
    const [post, setPost] = useState(null);
    const codeRef = useRef(null);
    const codeRef2 = useRef(null);
    const codeRef3 = useRef(null);
    const codeRef4 = useRef(null);
    const [nome, setNome] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [post_id, setPost_id] = useState();
    const [comentarios, setComentarios] = useState([]);


    useEffect(() => {
        if (postSlug) {
            console.log('id do post: '+postSlug);
            const fetchPost = async () => {
                try {
                    const response = await axios.post('/api/slug', { postSlug });
                    setPost(response.data);
                    console.log(response.data);

                } catch (error) {
                    console.error('Ocorreu um erro ao recuperar os dados:', error);
                }
            };

            fetchPost();
        }
    }, [postSlug]);



    useEffect(() => {
        // Atualize o Prism.js quando o componente for montado ou quando o post for atualizado
        Prism.highlightAll();
    }, [post]);

    const handleCopy = (ref) => {
        if (ref && ref.current) {
            const range = document.createRange();
            range.selectNode(ref.current);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/comentar', { nome, conteudo, post_id });
            alert(res.data.message);
            window.location.reload();
        } catch (err) {
            alert(err.response.data.error);
        }
    }

    return (
        <div className="posts">
            <Nav />
            <div className="container-posts">
                <h2>Post</h2>
                {post && ( 
                    <div>
                        <p>Tema: {post[0].tema}</p>
                        <p>Título: {post[0].titulo}</p>
                        <p>Data: {post[0].data ? format(new Date(post[0].data), 'dd/MM/yyyy') : 'Data não disponível'}</p>

                        <img className="img-post" src={`/blog/${post[0].imagem}`} alt={`imagem de linguagem ícone de ${post[0].tema}`}></img>
                        <p>id do post: {post[0].id}</p>

                        {post[0].conteudo && (
                            <p>Conteúdo: {post[0].conteudo}</p>
                        )}
                        {post[0].codigo && (
                            <div className="codigo">
                                <div className="copy">

                                    <button onClick={() => handleCopy(codeRef)}>Copy</button>
                                </div>
                                <pre>
                                    <code ref={codeRef} className={post[0].classe}>{post[0].codigo}</code>
                                </pre>
                            </div>
                        )}

                        {post[0].conteudo2 && (
                            <div>
                                {post[0].titulo2 && (<p>{post[0].titulo2}</p>)}
                                <p>Conteúdo: {post[0].conteudo2}</p>
                            </div>
                        )}
                        {post[0].codigo2 && (
                            <div className="codigo">
                                <div className="copy">

                                    <button onClick={() => handleCopy(codeRef2)}>Copy</button>
                                </div>
                                <pre>
                                    <code ref={codeRef2} className={post[0].classe2}>{post[0].codigo2}</code>
                                </pre>
                            </div>
                        )}

                        {post[0].conteudo3 && (
                            <div>
                                {post[0].titulo3 && (<p>{post[0].titulo3}</p>)}
                                <p>Conteúdo: {post[0].conteudo3}</p>
                            </div>
                        )}
                        {post[0].codigo3 && (
                            <div className="codigo">
                                <div className="copy">

                                    <button onClick={() => handleCopy(codeRef3)}>Copy</button>
                                </div>
                                <pre>
                                    <code ref={codeRef3} className={post[0].classe3}>{post[0].codigo3}</code>
                                </pre>
                            </div>
                        )}

                        {post[0].conteudo4 && (
                            <div>
                                {post[0].titulo4 && (<p>{post[0].titulo4}</p>)}
                                <p>Conteúdo: {post[0].conteudo4}</p>
                            </div>
                        )}
                        {post[0].codigo4 && (
                            <div className="codigo">
                                <div className="copy">

                                    <button onClick={() => handleCopy(codeRef4)}>Copy</button>
                                </div>
                                <pre>
                                    <code ref={codeRef4} className={post[0].classe4}>{post[0].codigo4}</code>
                                </pre>
                            </div>
                        )}
                        {post[0].conteudo5 && (
                            <div>
                                {post[0].titulo5 && (<p>{post[0].titulo5}</p>)}
                                <p>Conteúdo: {post[0].conteudo5}</p>
                            </div>
                        )}

                        <p>Autor: {post[0].autor}</p>
                        <br /><br />
                        {/* {comentarios.length > 0 && (
                            comentarios.map((comentario) => (
                                <div key={comentario.id}>
                                    <p>Comentário de {comentario.autor}</p>
                                    <p>{comentario.conteudo}</p>
                                    <br />
                                </div>
                            ))
                        )} */}

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
                            <button type="submit">Enviar</button>
                        </form>
                    </div>


                )}
            </div>
        </div>
    )
}