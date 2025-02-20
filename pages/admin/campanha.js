import Head from 'next/head';
import '@/app/globals.css';
import NavAdmin from '@/components/nav-admin/nav-admin';
import axios from 'axios';
import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

const Campanha = () => {
    const [contato, setContato] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [titulo, setTitulo] = useState('');
    const [loading, setLoading] = useState(false);
    const [campanha, setCampanha] = useState('bg-blue-800');
    const [contatos, setContatos] = useState('bg-blue-500');
    const [dados, setDados] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        setLoading(true);

        try {
            const response = await axios.post('/api/campanha', { contato, titulo, mensagem }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data.message);
            setContato('');
            setMensagem('');
            setTitulo('');
        } catch (error) {
            alert('Ocorreu um erro enviar a mensagem:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDados = async (e) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('/api/contatos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setDados(response.data);

        } catch (error) {
            console.log('Ocorreu um erro ao obter os contatos:', error);
        }
    };

    return (
        <AdminLayout>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Campanha</title>
            </Head>
            <div>
                <NavAdmin />
                <div className='ml-64 w-[calc(100%-16rem)] fixed flex'>
                    <button onClick={() => { setCampanha('bg-blue-800'); setContatos('bg-blue-500'); }} className={`text-white text-2xl text-center py-2 w-1/2 ${campanha}`}>Campanha</button>
                    <button onClick={() => { setCampanha('bg-blue-500'); setContatos('bg-blue-800'); fetchDados();}} className={`text-white text-2xl text-center py-2 w-1/2 ${contatos}`}>Contatos</button>
                </div>
                <div className='ml-64 pt-16'>
                    {campanha === 'bg-blue-800' ? (
                        <form onSubmit={handleSubmit} className='flex flex-col p-4 gap-4'>
                            <div>
                                <label>Contatos:
                                    <input
                                        className='border border-gray-500 rounded p-2 w-[calc(100%-65px)] ml-[2px]'
                                        value={contato}
                                        onChange={(e) => setContato(e.target.value)}
                                        placeholder='todos envia para todos os contatos da lista'
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>Titulo:
                                    <input
                                        className='border border-gray-500 rounded p-2 w-[calc(100%-65px)] ml-5'
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>Mensagem</label><br />
                                <textarea
                                    className='border border-gray-500 rounded p-4 w-full h-64'
                                    value={mensagem}
                                    onChange={(e) => setMensagem(e.target.value)}
                                    required
                                />
                            </div>
                            <button type='submit' disabled={loading} className='bg-blue-500 text-white py-2 px-4 rounded text-2xl w-32 mx-auto'>{loading ? 'Enviando...' : 'Enviar'}</button>
                        </form>
                    ) : (
                        <ul className='flex flex-col p-4 gap-2'>
                            {dados.length>0 && (
                                (dados.map((dado) => (
                                    <li key={dado.id}>{dado.nome}: {dado.email}</li>
                                )))
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
};

export default Campanha;