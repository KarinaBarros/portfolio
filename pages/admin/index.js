import Head from 'next/head';
import '@/app/globals.css';
import NavAdmin from '@/components/nav-admin/nav-admin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

const Admin = () => {
  const [dados, setDados] = useState(null);
  const [numero, setNumero] = useState(null);
  const [iniciaStatus, setIniciaStatus] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  let intervalId;
  

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

  async function Deploy() {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('/api/deploy', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
      setIniciaStatus(true);
    } catch (error) {
      console.error('Ocorreu um erro ao fazer o deploy:', error);
    }
  }

  async function verificarStatus() {
    const token = localStorage.getItem('token');
    console.log('chamada');
    try {
      const response = await axios.get('/api/status-deploy', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const status = response.data;
      if(status === 'QUEUED'){
        setMensagem('O deploy está na fila, aguardando para ser iniciado.');
      }
      if(status === 'BUILDING'){
        setMensagem('O deploy está sendo construído.');
      }
      if(status === 'READY'){
        setMensagem('O deploy foi concluído com sucesso.');
        clearInterval(intervalId);
        localStorage.setItem('atualizacao', '0');
        setNumero('0');
      }
      if(status === 'ERROR'){
        setMensagem('Houve um erro durante o processo de deploy.');
        clearInterval(intervalId);
      }
      
    } catch (error) {
      console.error('Ocorreu um erro ao fazer o deploy:', error);
    }
  }

  useEffect(() => {
    const atualizacao = localStorage.getItem('atualizacao');
    if (atualizacao) {
      setNumero(atualizacao);
    } else (setNumero('0'));
    fetchDados();
  }, [])

  useEffect(() => {
    
    if (iniciaStatus) {
      verificarStatus();
      intervalId = setInterval(() => {
        verificarStatus();
      }, 10000);
    }
    return () => clearInterval(intervalId);
  }, [iniciaStatus]);

  return (
    <AdminLayout>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin</title>
      </Head>
      <div>
        <NavAdmin />
        <div className='ml-64 w-[calc(100%-16rem)] fixed bg-blue-500'>
          <h2 className='text-white text-2xl text-center py-2'>Início</h2>
        </div>
        <div className='ml-64 p-8 flex flex-col gap-4 text-pink-500 text-2xl text-center flex flex-colum pt-16  h-screen'>
          <div className='text-denter flex flex-col my-auto gap-8'>
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
            {numero && (
              (numero === '0') ? (
                <p>Você não tem atualização no blog</p>
              ) : (numero === '1') ? (
                <p>Você tem 1 nova atualização no blog</p>
              ) : (
                <p>Você tem {numero} novas atualizações no blog.</p>
              )
            )}
            <button onClick={Deploy} className='bg-blue-500 text-white w-[150px] text-l mx-auto py-2 rounded-lg'>Fazer Deploy</button>
            {mensagem && (<p>{mensagem}</p>)}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
};

export default Admin;
