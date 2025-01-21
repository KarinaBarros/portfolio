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
import LottieAnimationLoading from "@/components/lottie/loading-lottie";

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
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (postSlug) {
            const fetchPost = async () => {
                setLoading(true);
                try {
                    const response = await axios.post('/api/slug', { postSlug });
                    setPost(response.data.post);
                    setPost_id(response.data.post.id);
                    setComentarios(response.data.comentarios);
                    console.log(response.data);

                } catch (error) {
                    console.error('Ocorreu um erro ao recuperar os dados:', error);
                } finally {
                    setLoading(false);
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
        setDisabled(true);
        try {
            const res = await axios.post('/api/comentar', { nome, conteudo, post_id });
            alert(res.data.message);
            setNome('');
            setConteudo('');
            setDisabled(false)
        } catch (err) {
            alert(err.response.data.error);
            setDisabled(false);
        }
    }

    return (
        <div className="slug">
            <Nav />
            {loading ? (<div className="loading"><LottieAnimationLoading/></div>) : (
                <div className="container-posts">
                    {post && (
                        <div>
                            <h1>{post.titulo}</h1>

                            <img className="img-post" src={`/blog/${post.imagem}`} alt={`imagem de linguagem ícone de ${post.tema}`}></img>

                            {post.conteudo && (
                                <pre className="conteudo">{post.conteudo}</pre>
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
                                    <pre className="conteudo">{post.conteudo2}</pre>
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
                                    <pre className="conteudo">{post.conteudo3}</pre>
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
                                    <pre className="conteudo">{post.conteudo4}</pre>
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
                                    <pre className="conteudo">{post.conteudo5}</pre>
                                </div>
                            )}
                            <br/><br/><br/>
                            <p className="right">Data: {post.data ? format(new Date(post.data), 'dd/MM/yyyy') : 'Data não disponível'}</p>
                            <p className="right">Autor: {post.autor}</p>
                            <br /><br />
                            {comentarios.length > 0 && (
                                comentarios.map((comentario) => (
                                    <div key={comentario.id_comentario}>
                                        <p>Comentário de {comentario.autor_comentario}</p>
                                        <p>{comentario.conteudo_comentario}</p>
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
                                <button type="submit" disabled={disabled}>{!disabled ? 'Enviar' : 'Enviando'}</button>
                            </form>
                        </div>


                    )}
                </div>
            )}

        </div>
    )
}