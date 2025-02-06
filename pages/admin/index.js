import Head from 'next/head';
import '@/app/globals.css';
import NavAdmin from '@/components/nav-admin/nav-admin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

const Admin = () => {
  const [dados, setDados] = useState(null);

  async function fetchDados() {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('/api/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setDados(response.data);

    } catch (error) {
      console.error('Ocorreu um erro ao recuperar os dados:', error);
    }
  }

  useEffect(() => {
    fetchDados();
  }, [])

  return (
    <AdminLayout>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin</title>
      </Head>
      <div>
        <NavAdmin />
        <div className='ml-64 p-8 flex flex-col gap-4 text-pink-500 text-2xl text-center items-center justify-center h-screen'>
          {dados && (
            <div>
              {(dados.mensagens === '0' && dados.comentarios === '0') ?
                <div>Você não tem novas mensagens e comentários.</div> :
                <div>
                  {dados.mensagens !== '0' && <p>Você tem {dados.mensagens} {dados.mensagens === '1' ? ' nova mensagem' : ' novas mensagens'}</p>}
                  {dados.comentarios !== '0' && <p>{dados.mensagens === '0' ? 'Você tem ' : 'e '}{dados.comentarios} {dados.comentarios === '1' ? ' novo comentário' : ' novos comentários'}</p>}
                </div>}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
};

export default Admin;
