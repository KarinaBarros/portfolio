import React, { useEffect, useState } from "react";
import axios from 'axios';
import Head from 'next/head';
import '@/app/globals.css';
import NavAdmin from '@/components/nav-admin/nav-admin';
import AdminLayout from '@/components/AdminLayout';
import 'prismjs';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import '@/app/globals.css';
import '@/styles/slug.css';
import { format } from "date-fns";

const InserirPosts = () => {

    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");
    const [abrirEditar, setAbrirEditar] = useState(null);
    const [posicao, setPosicao] = useState(null);
    const [container, setContainer] = useState(true);
    const [containerEditar, setContainerEditar] = useState(false);
    const [containerDestaque, setContainerDestaque] = useState(false);
    const [botaoNovo, setBotaoNovo] = useState(true);
    const [botaoEditar, setBotaoEditar] = useState(false);
    const [botaoDestaque, setBotaoDestaque] = useState(false);
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState('');
    const [destaque, setDestaque] = useState([]);

    const [formData, setFormData] = useState({
        tema: '',
        autor: '',
        imagem: '',
        titulo: '',
        conteudo: '',
        descricao: '',
        tags: '',
        blocos: []
    });
    const [bloco, setBloco] = useState({
        titulo_bloco: '',
        conteudo_bloco: '',
        classe: '',
        codigo: ''
    });

    const [blocoEditar, setBlocoEditar] = useState({
        titulo_bloco: '',
        conteudo_bloco: '',
        classe: '',
        codigo: ''
    });

    function atualizar() {
        let atualizacao = localStorage.getItem('atualizacao');
        if (!atualizacao) {
            atualizacao = '0';
        }
        console.log(atualizacao);
        atualizacao = parseInt(atualizacao);
        atualizacao = atualizacao + 1;
        localStorage.setItem('atualizacao', atualizacao);
        console.log(atualizacao);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            const response = await axios.post('/api/novo-post', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            atualizar();
            alert(response.data.message);
            setId(null);
            setFormData({
                tema: '',
                autor: '',
                imagem: '',
                titulo: '',
                conteudo: '',
                descricao: '',
                tags: '',
                blocos: []
            })
            setBloco({
                titulo_bloco: '',
                conteudo_bloco: '',
                classe: '',
                codigo: ''
            })
        } catch (error) {
            alert(error.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    const handleBloco = (e) => {
        const { name, value } = e.target;
        setBloco({
            ...bloco,
            [name]: value,
        });
    };

    const handleBlocoEditar = (e) => {
        const { name, value } = e.target;
        setBlocoEditar({
            ...blocoEditar,
            [name]: value,
        });
    };

    function add(e) {
        e.preventDefault();
        Prism.highlightAll();
        const indice = posicao - 1;
        if (bloco.titulo_bloco === '' && bloco.conteudo_bloco === '' && bloco.codigo === '') {
            return
        }
        if (posicao && formData.blocos.length < indice) {
            alert('Escolha uma posição válida');
            return
        }
        if (bloco.codigo !== '' && bloco.classe === '') {
            alert('Você precisa escolher uma classe para adicionar o código');
            return
        }
        if (!posicao) {
            
            formData.blocos.push(bloco);
        } else {
            console.log(indice);
            formData.blocos.splice(indice, 0, bloco);
        }

        setBloco({
            titulo_bloco: '',
            conteudo_bloco: '',
            classe: '',
            codigo: ''
        });
        setPosicao('');
        console.log(formData);
    }

    useEffect(() => {
        Prism.highlightAll();
    }, [formData, bloco, blocoEditar]);

    useEffect(() => {
        const now = new Date();
        setDate(now);
    }, [])

    function editar(indice) {
        setBlocoEditar(formData.blocos[indice]);
        setAbrirEditar(indice);
    }


    function editarBloco(e, indice) {
        e.preventDefault();
        console.log(indice);
        if (blocoEditar.titulo_bloco === '' && blocoEditar.conteudo_bloco === '' && blocoEditar.codigo === '') {
            return
        }
        if (blocoEditar.codigo !== '' && blocoEditar.classe === '') {
            alert('Você precisa escolher uma classe para adicionar o código');
            return
        }
        const novoArray = [...formData.blocos];
        novoArray.splice(indice, 1, blocoEditar);
        console.log(novoArray);
        setFormData({
            ...formData,
            blocos: novoArray,
        })
        setAbrirEditar(null);
        console.log(formData);
    }


    function excluir(indice) {
        const novoArray = [...formData.blocos];
        novoArray.splice(indice, 1);
        console.log(novoArray);
        setFormData({
            ...formData,
            blocos: novoArray,
        })
    }

    function ContainerNovo() {
        setContainerEditar(false);
        setBotaoNovo(true);
        setBotaoEditar(false);
        setBotaoDestaque(false);
        setContainerDestaque(false);
        setId(null);
        setFormData({
            tema: '',
            autor: '',
            imagem: '',
            titulo: '',
            conteudo: '',
            descricao: '',
            tags: '',
            blocos: []
        })
        setBloco({
            titulo_bloco: '',
            conteudo_bloco: '',
            classe: '',
            codigo: ''
        })

        setContainer(true);
        setPosts([]);
    }


    async function ContainerEditar() {
        setBotaoNovo(false);
        setBotaoEditar(true);
        setContainer(false);
        setContainerEditar(true);
        setBotaoDestaque(false);
        setContainerDestaque(false);
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
        try {
            const response = await axios.get('/api/admin-posts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            setPosts(data);
        } catch (error) {
            console.error("Erro ao gerar os posts:", error.message);
        }
    }

    async function ContainerDestaque() {
        setBotaoDestaque(true);
        setContainerDestaque(true);
        setBotaoNovo(false);
        setBotaoEditar(false);
        setContainer(false);
        setContainerEditar(false);
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
        try {
            const response = await axios.get('/api/destaque', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            setDestaque(data);
        } catch (error) {
            console.error("Erro ao gerar os posts:", error.message);
        }
    }

    async function fetchPost(e, id) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
        try {
            const response = await axios.post('/api/admin-post', { id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            console.log(data);
            setFormData(data);
            setContainer(true);

        } catch (error) {
            console.error("Erro ao gerar os posts:", error.message);
        }
    }

    const handleSubmitEditar = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            const response = await axios.post('/api/atualizar-post', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            atualizar();
            alert(response.data.message);
            setId('');
            setFormData({
                tema: '',
                autor: '',
                imagem: '',
                titulo: '',
                conteudo: '',
                descricao: '',
                tags: '',
                blocos: []
            })
            setBloco({
                titulo_bloco: '',
                conteudo_bloco: '',
                classe: '',
                codigo: ''
            })
        } catch (error) {
            alert(error.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    async function excluirPost() {
        const resposta = window.confirm(`Tem certeza que deseja excluir ${formData.id} - ${formData.titulo} ?`);
        if (!resposta) {
            return
        }
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
        try {
            const response = await axios.post('/api/excluir-post', { id: formData.id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            atualizar();
            alert(response.data.message);
            setId('');
            setFormData({
                tema: '',
                autor: '',
                imagem: '',
                titulo: '',
                conteudo: '',
                descricao: '',
                tags: '',
                blocos: []
            })
            setBloco({
                titulo_bloco: '',
                conteudo_bloco: '',
                classe: '',
                codigo: ''
            })
        } catch (error) {
            console.error("Erro ao excluir o post:", error.message);
        }
    }

    async function alterarDestaque(id) {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
        try {
            const response = await axios.post('/api/alterar-destaque',{id}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data.message);
            ContainerDestaque();
        } catch (error) {
            console.error("Erro ao alterar o destaque:", error.message);
        }
    }


    return (
        <AdminLayout>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Novo post</title>
            </Head>
            <NavAdmin />
            <div className="ml-64 w-[calc(100%-16rem)] fixed">
                <button onClick={ContainerNovo} className={`${botaoNovo ? (' bg-blue-800') : (' bg-blue-500')} text-white text-2xl w-1/3 py-2`}>Novo Post</button>
                <button onClick={ContainerEditar} className={`${botaoEditar ? (' bg-blue-800') : (' bg-blue-500')} text-white text-2xl w-1/3 py-2`}>Editar Post</button>
                <button onClick={ContainerDestaque} className={`${botaoDestaque ? (' bg-blue-800') : (' bg-blue-500')} text-white text-2xl w-1/3 py-2`}>Destaque</button>
            </div>
            {(containerEditar && posts.length > 0) && (
                <form onSubmit={(e) => fetchPost(e, id)} className='flex flex-col gap-4 ml-64 pt-16'>
                    <label>Escolha o post</label>
                    <select name="id" value={id} onChange={(e) => setId(e.target.value)} required className='border border-gray-500 w-full px-2 py-1'>
                        <option></option>
                        {posts.map((post) => (
                            <option key={post.id} value={post.id}>{post.id} - {post.titulo}</option>
                        ))}
                    </select>
                    <button type="submit" className="bg-blue-800 px-4 py-2 rounded-lg mt-2 mx-auto text-white">Ok</button>
                </form>
            )}
            {container && (
                <div className="flex flex-col gap-4 ml-64 p-8 pt-16">
                    <p className="m-auto text-pink-500 text-2xl text-center">Itens obrigatórios</p>
                    <form onSubmit={!id ? handleSubmit : handleSubmitEditar} className='flex flex-col gap-4'>
                        <div>
                            <label>Tema</label>
                            <select name="tema" value={formData.tema} onChange={handleChange} required className='border border-gray-500 w-full px-2 py-1'>
                                <option></option>
                                <option value="html">html</option>
                                <option value="css">css</option>
                                <option value="javascript">javascript</option>
                                <option value="outros">outros</option>
                            </select>
                        </div>
                        <div>
                            <label>Autor</label>
                            <input name="autor" value={formData.autor} onChange={handleChange} required className='border border-gray-500 w-full px-2 py-1' />
                        </div>
                        <div>
                            <label>Imagem</label>
                            <select name="imagem" value={formData.imagem} onChange={handleChange} required className='border border-gray-500 w-full px-2 py-1'>
                                <option></option>
                                <option value="/imagem.png">imagem</option>
                                <option value="/html.png">imagem html</option>
                                <option value="/css.png">imagem css</option>
                                <option value="/javascript.png">imagem javascript</option>
                                <option value="/api.jpg">imagem api rest</option>
                            </select>
                        </div>
                        <div>
                            <p>O titulo será exibido na url.</p>
                            <label>Título</label>
                            <input name="titulo" value={formData.titulo} onChange={handleChange} required readOnly={!!id} className='border border-gray-500 w-full px-2 py-1' />
                        </div>
                        <div>
                            <label>Conteúdo</label>
                            <textarea name="conteudo" value={formData.conteudo} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1 h-32' />
                        </div>
                        <div>
                            <label>Descricao</label>
                            <input name="descricao" value={formData.descricao} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1' required />
                        </div>
                        <div>
                            <label>Tags</label>
                            <input name="tags" value={formData.tags} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1' required />
                        </div>
                        <button type="submit" disabled={loading} className="bg-blue-800 px-4 py-2 rounded-lg mt-2 mx-auto text-white">{loading ? 'Enviando...' : 'Enviar'}</button>
                    </form>
                    {id && (
                        <button className="bg-blue-800 px-4 py-2 rounded-lg mt-2 mx-auto text-white" onClick={excluirPost}>Excluir</button>
                    )}
                    <form onSubmit={add} className='flex flex-col gap-4 border border-gray-500 bg-gray-300 p-4'> <div>
                        <p className="m-auto text-pink-500 text-2xl text-center">Adicionar bloco</p>
                        <label>posicao:</label>
                        <input type="number" onChange={(e) => setPosicao(e.target.value)} value={posicao} className='border border-gray-500 px-2 py-1 w-16' />
                        <p>Se posição não estiver preenchida o bloco será adicionado no último lugar.</p>
                        <br /><br />
                        <label>Título</label>
                        <input name="titulo_bloco" value={bloco.titulo_bloco} onChange={handleBloco} className='border border-gray-500 w-full px-2 py-1' />
                    </div>
                        <div>
                            <label>Conteúdo</label>
                            <textarea name="conteudo_bloco" value={bloco.conteudo_bloco} onChange={handleBloco} className='border border-gray-500 w-full px-2 py-1 h-32' />
                        </div>
                        <div>
                            <label>Classe</label>
                            <select name="classe" value={bloco.classe} onChange={handleBloco} className='border border-gray-500 w-full px-2 py-1'>
                                <option>Selecione uma classe</option>
                                <option value="language-javascript">javascript</option>
                                <option value="language-css">css</option>
                                <option value="language-html">html</option>
                                <option value="language-shell">prompt</option>
                            </select>
                        </div>
                        <div>
                            <label>Código</label>
                            <textarea name="codigo" value={bloco.codigo} onChange={handleBloco} className='border border-gray-500 w-full px-2 py-1' />
                        </div>
                        <button type='submit' className="bg-blue-800 px-4 py-2 rounded-lg mt-2 mx-auto text-white">add</button>
                    </form>
                    <div className="slug">
                        <div className="container-posts">
                            {formData && (
                                <div>
                                    <h1>{formData.titulo}</h1>

                                    <img className="img-post" src={`/blog/${formData.imagem}`} alt={`imagem de linguagem ícone de ${formData.tema}`}></img>

                                    {formData.conteudo && (
                                        <pre className="conteudo">{formData.conteudo.split("\n").map((line) => "\t" + line).join("\n")}</pre>
                                    )}
                                    {formData.blocos.length > 0 && (
                                        formData.blocos.map((bloco, indice) => (
                                            <div key={indice}>
                                                {bloco.conteudo_bloco && (
                                                    <div>
                                                        {bloco.titulo_bloco && (<h2>{bloco.titulo_bloco}</h2>)}
                                                        <pre className="conteudo">{bloco.conteudo_bloco.split("\n").map((line) => "\t" + line).join("\n")}</pre>
                                                    </div>
                                                )}
                                                {bloco.codigo && (
                                                    <div className="codigo">
                                                        <div className="copy">
                                                            <button>Copy</button>
                                                        </div>
                                                        <pre>
                                                            <code className={bloco.classe}>{bloco.codigo}</code>
                                                        </pre>
                                                    </div>
                                                )}
                                                <div className="flex text-white gap-4">
                                                    <button onClick={() => editar(indice)}>Editar</button>
                                                    <button onClick={() => excluir(indice)}>Excluir</button>
                                                </div>
                                                {abrirEditar === indice && (
                                                    <form onSubmit={(e) => editarBloco(e, indice)} className='flex flex-col gap-4 border bg-white p-4'>
                                                        <button type="button" className="w-4 ml-auto mr-0 text-3xl" onClick={() => setAbrirEditar(null)}>x</button>
                                                        <div>
                                                            <label>Título</label>
                                                            <input name='titulo_bloco' value={blocoEditar.titulo_bloco} onChange={handleBlocoEditar} className='border border-gray-500 w-full px-2 py-1' />
                                                        </div>
                                                        <div>
                                                            <label>Conteúdo</label>
                                                            <textarea name='conteudo_bloco' value={blocoEditar.conteudo_bloco} onChange={handleBlocoEditar} className='border border-gray-500 w-full px-2 py-1 h-32' />
                                                        </div>
                                                        <div>
                                                            <label>Classe</label>
                                                            <select name='classe' value={blocoEditar.classe} onChange={handleBlocoEditar} className='border border-gray-500 w-full px-2 py-1'>
                                                                <option>Selecione uma classe</option>
                                                                <option value="language-javascript">javascript</option>
                                                                <option value="language-css">css</option>
                                                                <option value="language-html">html</option>
                                                                <option value="language-shell">prompt</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label>Código</label>
                                                            <textarea name='codigo' value={blocoEditar.codigo} onChange={handleBlocoEditar} className='border border-gray-500 w-full px-2 py-1' />
                                                        </div>
                                                        <button type='submit' className="bg-blue-800 px-4 py-2 rounded-lg mt-2 mx-auto text-white">editar</button>
                                                    </form>
                                                )}
                                            </div>
                                        ))
                                    )}

                                    <br /><br /><br />
                                    <p className="right">Data: {date ? format(new Date(date), 'dd/MM/yyyy') : 'Data não disponível'}</p>
                                    <p className="right">Autor: {formData.autor}</p>
                                    <br /><br />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {containerDestaque && (
                <div className="flex flex-col ml-64 p-8 pt-16 gap-4">
                    {destaque && (
                        destaque.map((item, indice) => (
                            item.destaque ? (
                                <div key={item.id} className="flex flex-col" style={{order: 1}}>
                                    <p className="mx-auto text-2xl">Destaque atual</p>
                                    <img src={`/blog/${item.imagem}`} className="w-64 mx-auto"/>
                                    <p className="mx-auto text-2xl mb-4">{item.titulo}</p>
                                    <p className="mx-auto text-2xl text-pink-500">Altere o destaque</p>
                                </div>
                            ) : (
                                <button key={item.id} onClick={() =>alterarDestaque(item.id)} className="bg-blue-500 px-4 py-2 rounded" style={{ order: indice + 2 }}>{item.titulo}</button>
                            )
                        ))
                    )}
                </div>
            )}
        </AdminLayout>
    )
};

export default InserirPosts;