import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import '@/app/globals.css';
import NavAdmin from '@/components/nav-admin/nav-admin';
import AdminLayout from '@/components/AdminLayout';
import Preview from '@/components/preview';

const InserirPosts = () => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        tema: '',
        autor: '',
        imagem: '',
        titulo: '',
        conteudo: '',
        classe: '',
        codigo: '',
        titulo2: '',
        conteudo2: '',
        classe2: '',
        codigo2: '',
        titulo3: '',
        conteudo3: '',
        classe3: '',
        codigo3: '',
        titulo4: '',
        conteudo4: '',
        classe4: '',
        codigo4: '',
        titulo5: '',
        conteudo5: '',
        descricao: '',
        tags: ''
    });

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
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Novo post</title>
            </Head>
            <NavAdmin />
            <div className="flex flex-col gap-4 ml-64 p-8">
                <h2 className="m-auto text-pink-500 text-2xl">Inserir Post</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
                        </select>
                    </div>
                    <div>
                        <p>O titulo será exibido na url.</p>
                        <label>Título</label>
                        <input name="titulo" value={formData.titulo} onChange={handleChange} required className='border border-gray-500 w-full px-2 py-1' />
                    </div>
                    <div>
                        <label>Conteúdo</label>
                        <textarea name="conteudo" value={formData.conteudo} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1 h-32' />
                    </div>
                    <div>
                        <label>Classe</label>
                        <select name="classe" value={formData.classe} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1'>
                            <option>Selecione uma classe</option>
                            <option value="language-javascript">javascript</option>
                            <option value="language-css">css</option>
                            <option value="language-html">html</option>
                            <option value="language-shell">prompt</option>
                        </select>
                    </div>
                    <div>
                        <label>Código</label>
                        <textarea name="codigo" value={formData.codigo} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1 h-32' />
                    </div>
                    <div>
                        <label>Título 2</label>
                        <input name="titulo2" value={formData.titulo2} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1' />
                    </div>
                    <div>
                        <label>Conteúdo 2</label>
                        <textarea name="conteudo2" value={formData.conteudo2} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1 h-32' />
                    </div>
                    <div>
                        <label>Classe 2</label>
                        <select name="classe2" value={formData.classe2} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1'>
                            <option>Selecione uma classe</option>
                            <option value="language-javascript">javascript</option>
                            <option value="language-css">css</option>
                            <option value="language-html">html</option>
                            <option value="language-shell">prompt</option>
                        </select>
                    </div>
                    <div>
                        <label>Código 2</label>
                        <textarea name="codigo2" value={formData.codigo2} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1 h-32' />
                    </div>
                    <div>
                        <label>Título 3</label>
                        <input name="titulo3" value={formData.titulo3} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1' />
                    </div>
                    <div>
                        <label>Conteúdo 3</label>
                        <textarea name="conteudo3" value={formData.conteudo3} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1 h-32' />
                    </div>
                    <div>
                        <label>Classe 3</label>
                        <select name="classe3" value={formData.classe3} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1'>
                            <option>Selecione uma classe</option>
                            <option value="language-javascript">javascript</option>
                            <option value="language-css">css</option>
                            <option value="language-html">html</option>
                            <option value="language-shell">prompt</option>
                        </select>
                    </div>
                    <div>
                        <label>Código 3</label>
                        <textarea name="codigo3" value={formData.codigo3} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1 h-32' />
                    </div>
                    <div>
                        <label>Título 4</label>
                        <input name="titulo4" value={formData.titulo4} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1' />
                    </div>
                    <div>
                        <label>Conteúdo 4</label>
                        <textarea name="conteudo4" value={formData.conteudo4} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1 h-32' />
                    </div>
                    <div>
                        <label>Classe 4</label>
                        <select name="classe4" value={formData.classe4} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1'>
                            <option>Selecione uma classe</option>
                            <option value="language-javascript">javascript</option>
                            <option value="language-css">css</option>
                            <option value="language-html">html</option>
                            <option value="language-shell">prompt</option>
                        </select>
                    </div>
                    <div>
                        <label>Código 4</label>
                        <textarea name="codigo4" value={formData.codigo4} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1 h-32' />
                    </div>
                    <div>
                        <label>Título 5</label>
                        <input name="titulo5" value={formData.titulo5} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1' />
                    </div>
                    <div>
                        <label>Conteúdo 5</label>
                        <textarea name="conteudo5" value={formData.conteudo5} onChange={handleChange} className='border border-gray-500 w-full px-2 py-1 h-32' />
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
                <Preview formData={formData} />
            </div>
        </AdminLayout>
    )
};

export default InserirPosts;