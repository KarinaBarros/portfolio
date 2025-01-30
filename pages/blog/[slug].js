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
import { useQuery, QueryClientProvider } from '@tanstack/react-query';
import { fetchPosts } from ".";
import { queryClient } from "@/lib/queryClient";


function PostsContent() {
    const { query } = useRouter();
    const postSlug = query?.slug;
    const [post, setPost] = useState(null);
    const codeRefs = useRef([useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],);
    const [messages, setMessages] = useState({});
    const [nome, setNome] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [post_id, setPost_id] = useState();
    const [disabled, setDisabled] = useState(false);

    const { data: posts = {}, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60,
    });

    
    useEffect(() => {
        if(posts.length > 0 && postSlug) {
            for (let i = 0; i < posts.length; i++) {
                const postcache = posts[i]
                
                if(postcache.slug === postSlug){
                    console.log('cache: ' +postcache.titulo + postSlug);
                    setPost(postcache);
                    setPost_id(postcache.id);
                    break;
                }
            };
        }
       
    },[postSlug, posts]);


    useEffect(() => {
        Prism.highlightAll();
    }, [post]);

    const handleCopy = async (index) => {
        const ref = codeRefs.current[index];
    
        if (ref && ref.current) {
            try {
                await navigator.clipboard.writeText(ref.current.innerText); // Copia o conteúdo
    
                // Atualiza a mensagem indicando sucesso
                setMessages((prev) => ({
                    ...prev,
                    [index]: 'Copiado para a área de transferência!'
                }));
            } catch (err) {
                console.error("Erro ao copiar:", err);
                setMessages((prev) => ({
                    ...prev,
                    [index]: 'Erro ao copiar'
                }));
            }
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
        <>
            <Nav />
            <div className="slug">
                {isLoading ? (<div className="loading"><LottieAnimationLoading /></div>) : (
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

                                            <button onClick={() => handleCopy(0)}>Copy</button>
                                            <p>{messages[0]}</p>
                                        </div>
                                        <pre>
                                            <code ref={codeRefs.current[0]} className={post.classe}>{post.codigo}</code>
                                        </pre>
                                    </div>
                                )}

                                {post.conteudo2 && (
                                    <div>
                                        {post.titulo2 && (<h2>{post.titulo2}</h2>)}
                                        <pre className="conteudo">{post.conteudo2}</pre>
                                    </div>
                                )}
                                {post.codigo2 && (
                                    <div className="codigo">
                                        <div className="copy">

                                            <button onClick={() => handleCopy(1)}>Copy</button>
                                            <p>{messages[1]}</p>
                                        </div>
                                        <pre>
                                            <code ref={codeRefs.current[1]} className={post.classe2}>{post.codigo2}</code>
                                        </pre>
                                    </div>
                                )}

                                {post.conteudo3 && (
                                    <div>
                                        {post.titulo3 && (<h2>{post.titulo3}</h2>)}
                                        <pre className="conteudo">{post.conteudo3}</pre>
                                    </div>
                                )}
                                {post.codigo3 && (
                                    <div className="codigo">
                                        <div className="copy">

                                            <button onClick={() => handleCopy(2)}>Copy</button>
                                            <p>{messages[2]}</p>
                                        </div>
                                        <pre>
                                            <code ref={codeRefs.current[2]} className={post.classe3}>{post.codigo3}</code>
                                        </pre>
                                    </div>
                                )}

                                {post.conteudo4 && (
                                    <div>
                                        {post.titulo4 && (<h2>{post.titulo4}</h2>)}
                                        <pre className="conteudo">{post.conteudo4}</pre>
                                    </div>
                                )}
                                {post.codigo4 && (
                                    <div className="codigo">
                                        <div className="copy">

                                            <button onClick={() => handleCopy(3)}>Copy</button>
                                            <p>{messages[3]}</p>
                                        </div>
                                        <pre>
                                            <code ref={codeRefs.current[3]} className={post.classe4}>{post.codigo4}</code>
                                        </pre>
                                    </div>
                                )}
                                {post.conteudo5 && (
                                    <div>
                                        {post.titulo5 && (<h2>{post.titulo5}</h2>)}
                                        <pre className="conteudo">{post.conteudo5}</pre>
                                    </div>
                                )}
                                <br /><br /><br />
                                <p className="right">Data: {post.data ? format(new Date(post.data), 'dd/MM/yyyy') : 'Data não disponível'}</p>
                                <p className="right">Autor: {post.autor}</p>
                                <br /><br />
                                {post.comentarios?.length > 0 && (
                                    post.comentarios.map((comentario) => (
                                        <div key={comentario.id} className="comentario">
                                            <p>Comentário de {comentario.autor}:</p>
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
                                    <button type="submit" disabled={disabled}>{!disabled ? 'Enviar' : 'Enviando'}</button>
                                </form>
                            </div>


                        )}
                    </div>
                )}

            </div>
        </>
    )
}

export default function Posts() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsContent />
    </QueryClientProvider>
  );
}