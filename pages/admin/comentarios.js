import { useState, useEffect } from "react";
import axios from "axios";
import '@/app/globals.css';
import NavAdmin from "@/components/nav-admin/nav-admin";
import { useRouter } from "next/router";
import { format } from 'date-fns';
import AdminLayout from '@/components/AdminLayout';
import Head from "next/head";

export default function Comentarios() {
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [comentariosEx, setComentariosEx] = useState([]);
    const [postId, setPostID] = useState();
    const [loadingEx, setLoadingEx] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [respostas, setRespostas] = useState({});
    const [colorAprovar, setColorAprovar] = useState('bg-blue-800');
    const [colorExcluir, setColorExcluir] = useState('bg-blue-500')

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);

        try {
            const response = await axios.get('/api/comentarios-false', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setComentarios(response.data);
            console.log(response.data);

        } catch (error) {
            console.error('Ocorreu um erro ao recuperar os dados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const handleSubmit = async (e, id) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }

        try {
            const response = await axios.post('/api/aprovar', { id: id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            alert(response.data.message);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.error);
        }
    }

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        setLoadingEx(true);
        if (!token) {
            router.push('/login');
        }

        try {
            const response = await axios.post('/api/comentarios-true', { id: postId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            setComentariosEx(response.data);
            if (response.data.length === 0) {
                setMensagem('Esse post não possui comentários');
            }
            console.log(response.data);

        } catch (error) {
            alert(error.response?.data?.error);
        } finally {
            setLoadingEx(false);
        }
    }

    const handleSubmitExcluir = async (e, id) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }

        try {
            const response = await axios.post('/api/excluir-comentario', { id: id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            alert(response.data.message);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.error);
        }
    }

    const handleRespostaChange = (id, value) => {
        setRespostas((prevRespostas) => ({
            ...prevRespostas,
            [id]: value,
        }));
    };

    const handleSubmitResponder = async (e, id) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }

        const respostaTexto = respostas[id]; // Usar a resposta específica do comentário

        try {
            const response = await axios.post('/api/responder-comentario', { id: id, resposta: respostaTexto }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data.message);
            handleSubmitPost(e);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.error);
        }
    };

    function Aprovar() {
        setColorAprovar('bg-blue-800');
        setColorExcluir('bg-blue-500');
    }

    function Excluir() {
        setColorAprovar('bg-blue-500');
        setColorExcluir('bg-blue-800');
    }



    return (
        <AdminLayout>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Comentários</title>
            </Head>
            <NavAdmin />

            <div className="flex flex-col ml-64">
                <div className="flex">
                    <button onClick={Aprovar} className={`text-white w-1/2 p-2 text-lg ${colorAprovar}`}>Aprovar</button>
                    <button onClick={Excluir} className={`text-white w-1/2 p-2 text-lg ${colorExcluir}`}>Excluir</button>
                </div>
                {loading ? (
                    <div className="ml-64">Carregando...</div>
                ) : (colorAprovar === 'bg-blue-800' && (
                    <div>
                        <h2 className="m-auto text-pink-500 text-2xl">Aprovar comentários</h2>
                        {comentarios.length > 0 ? (
                            comentarios.map((comentario) => (
                                <div key={comentario.id_comentario} className="p-2 bg-gray-200 leading-tight rounded-md">
                                    <form onSubmit={(e) => handleSubmit(e, comentario.id_comentario)} className="flex flex-col">
                                        <p>Post id: {comentario.post_id}</p>
                                        <p>Autor: {comentario.autor_comentario}</p>
                                        <p>Criado em: {format(new Date(comentario.criado), 'dd/MM/yyyy')}</p>
                                        <p>{comentario.conteudo_comentario}</p>
                                        <div className="m-auto">
                                            <button
                                                type="button"
                                                onClick={(e) => handleSubmit(e, comentario.id_comentario)}
                                                className="bg-blue-800 px-4 py-1 text-white rounded-md"
                                            >
                                                Aprovar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => handleSubmitExcluir(e, comentario.id_comentario)}
                                                className="bg-pink-500 px-4 py-1 text-white rounded-md ml-4"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ))
                        ) : (
                            <div>Sem novos comentários</div>
                        )}
                    </div>
                )
                )}
                {colorExcluir === 'bg-blue-800' && (
                    <div className="flex flex-col gap-2 ">
                        <h2 className="m-auto text-pink-500 text-2xl">Excluir comentários</h2>
                        <form onSubmit={handleSubmitPost}>
                            <label>Código do post:
                                <input
                                    placeholder="id"
                                    value={postId}
                                    onChange={(e) => setPostID(e.target.value)}
                                    required
                                    className="w-16 p-2 border border-gray-500 rounded mx-4"
                                />
                            </label>
                            <button type="submit" className="bg-blue-800 px-4 py-2 text-white rounded-md m-auto">Exibir Comentários</button>
                        </form>
                        {loadingEx ? (<div>Carregando...</div>) : (<div>
                            {comentariosEx.length > 0 ? (
                                comentariosEx.map((comentario) => (
                                    <div key={comentario.id_comentario} className="p-2 bg-gray-200 leading-tight rounded-md mb-2">
                                        <p>Post id: {comentario.post_id}</p>
                                        <p>Autor: {comentario.autor_comentario}</p>
                                        <p>Criado em: {format(new Date(comentario.criado), 'dd/MM/yyyy')}</p>
                                        <p>{comentario.conteudo_comentario}</p>
                                        <div className="m-auto">
                                            <button
                                                type="button"
                                                className="bg-pink-500 px-4 py-1 text-white rounded-md mr-4"
                                                onClick={(e) => handleSubmitExcluir(e, comentario.id_comentario)}
                                            >
                                                Excluir
                                            </button>
                                        </div>

                                        <form onSubmit={(e) => handleSubmitResponder(e, comentario.id_comentario)} className="flex flex-col">
                                            <label>Resposta:
                                                <textarea
                                                    className="border border-gray-800 w-full h-16"
                                                    value={respostas[comentario.id_comentario] || ''}
                                                    onChange={(e) => handleRespostaChange(comentario.id_comentario, e.target.value)}
                                                    required
                                                />
                                            </label>
                                            <button type="submit" className="bg-blue-800 px-4 py-1 text-white rounded-md ml-1 mr-auto">Responder</button>
                                        </form>
                                    </div>

                                ))
                            ) : (
                                <div>{mensagem}</div>
                            )}
                        </div>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}    