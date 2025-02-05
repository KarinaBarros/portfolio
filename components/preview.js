import React, { useEffect, useState } from "react";
import 'prismjs';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import '@/app/globals.css';
import '@/styles/slug.css';
import { format } from "date-fns";

export default function Preview({ formData }) {
    const [post, setPost] = useState(null);
    const [date, setDate] = useState("");

    useEffect(() => {
        if (formData) {
            setPost(formData);
        }
    }, [formData])

    useEffect(() => {
        Prism.highlightAll();
    }, [post]);

  useEffect(() => {
    const now = new Date();
    setDate(now);
  }, [])


    return (
        <>
            <div className="slug">
                <div className="container-posts">
                    {post && (
                        <div>
                            <h1>{post.titulo}</h1>

                            <img className="img-post" src={`/blog/${post.imagem}`} alt={`imagem de linguagem ícone de ${post.tema}`}></img>

                            {post.conteudo && (
                                <pre className="conteudo indent-16">{post.conteudo}</pre>
                            )}
                            {post.codigo && (
                                <div className="codigo">
                                    <div className="copy">
                                        <button>Copy</button>
                                    </div>
                                    <pre>
                                        <code className={post.classe}>{post.codigo}</code>
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
                                        <button>Copy</button>
                                    </div>
                                    <pre>
                                        <code className={post.classe2}>{post.codigo2}</code>
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
                                        <button>Copy</button>
                                    </div>
                                    <pre>
                                        <code className={post.classe3}>{post.codigo3}</code>
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
                                        <button>Copy</button>
                                    </div>
                                    <pre>
                                        <code className={post.classe4}>{post.codigo4}</code>
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
                            <p className="right">Data: {date ? format(new Date(date), 'dd/MM/yyyy') : 'Data não disponível'}</p>
                            <p className="right">Autor: {post.autor}</p>
                            <br /><br />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}