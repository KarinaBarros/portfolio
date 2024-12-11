import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import 'prismjs';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import Nav from "@/components/nav/nav";
import NavBlog from "@/components/nav_blog/nav_blog";
import '@/app/globals.css';
import '@/styles/slug.css';
import { format } from "date-fns";

export default function Posts() {
    const { query } = useRouter();
    const postid = query?.slug;
    const [postagens, setPostagens] = useState([]);
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
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/posts');
                setPostagens(response.data);

            } catch (error) {
                console.error('Ocorreu um erro ao recuperar os dados:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (postagens.length > 0 && postid) {
            const foundPost = postagens.find(post => post.titulo.toLowerCase().replace(/ /g, '-') === postid);
            setPost(foundPost);
            setPost_id(foundPost.id);
            const fetchComentarios = async () => {
                try {
                    const response = await axios.post('/api/comentarios', { post_id: foundPost.id });
                    setComentarios(response.data);
                    console.log(response.data);

                } catch (error) {
                    console.error('Ocorreu um erro ao recuperar os dados:', error);
                }
            };

            fetchComentarios();
        }
    }, [postagens, postid]);



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
            <NavBlog />
            <div className="container-posts">
                <h2>Post</h2>
                {post && (
                    <div>
                        <p>Tema: {post.tema}</p>
                        <p>Título: {post.titulo}</p>
                        <p>Data: {post.data ? format(new Date(post.data), 'dd/MM/yyyy') : 'Data não disponível'}</p>

                        <img className="img-post" src={post.imagem} alt={`imagem de linguagem ícone de ${post.tema}`}></img>
                        <p>id do post: {post.id}</p>

                        {post.conteudo && (
                            <p>Conteúdo: {post.conteudo}</p>
                        )}
                        {post.codigo && (
                            <div className="codigo">
                                <div className="copy">

                                    <button onClick={() => handleCopy(codeRef)}>Copy</button>
                                </div>
                                <pre>
                                    <code ref={codeRef} className={post.classe}>{post.codigo}</code>
                                </pre>
                            </div>
                        )}

                        {post.conteudo2 && (
                            <div>
                                {post.titulo2 && (<p>{post.titulo2}</p>)}
                                <p>Conteúdo: {post.conteudo2}</p>
                            </div>
                        )}
                        {post.codigo2 && (
                            <div className="codigo">
                                <div className="copy">

                                    <button onClick={() => handleCopy(codeRef2)}>Copy</button>
                                </div>
                                <pre>
                                    <code ref={codeRef2} className={post.classe2}>{post.codigo2}</code>
                                </pre>
                            </div>
                        )}

                        {post.conteudo3 && (
                            <div>
                                {post.titulo3 && (<p>{post.titulo3}</p>)}
                                <p>Conteúdo: {post.conteudo3}</p>
                            </div>
                        )}
                        {post.codigo3 && (
                            <div className="codigo">
                                <div className="copy">

                                    <button onClick={() => handleCopy(codeRef3)}>Copy</button>
                                </div>
                                <pre>
                                    <code ref={codeRef3} className={post.classe3}>{post.codigo3}</code>
                                </pre>
                            </div>
                        )}

                        {post.conteudo4 && (
                            <div>
                                {post.titulo4 && (<p>{post.titulo4}</p>)}
                                <p>Conteúdo: {post.conteudo4}</p>
                            </div>
                        )}
                        {post.codigo4 && (
                            <div className="codigo">
                                <div className="copy">

                                    <button onClick={() => handleCopy(codeRef4)}>Copy</button>
                                </div>
                                <pre>
                                    <code ref={codeRef4} className={post.classe4}>{post.codigo4}</code>
                                </pre>
                            </div>
                        )}
                        {post.conteudo5 && (
                            <div>
                                {post.titulo5 && (<p>{post.titulo5}</p>)}
                                <p>Conteúdo: {post.conteudo5}</p>
                            </div>
                        )}

                        <p>Autor: {post.autor}</p>
                        <br /><br />
                        {comentarios.length > 0 && (
                            comentarios.map((comentario) => (
                                <div key={comentario.id}>
                                    <p>Comentário de {comentario.autor}</p>
                                    <p>{comentario.conteudo}</p>
                                    <br />
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
                            <button type="submit">Enviar</button>
                        </form>
                    </div>


                )}
            </div>
        </div>
    )
}