import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import '@/app/globals.css';

const Admin = () => {
  
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.get('/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
      } catch (err) {
        setError('Você não tem acesso a esta página');
        router.push('/login');
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <div>
        <Head>
        <title>Admin</title>
        <meta name="description" content="pagina para inserir posts." />
        </Head>
        {(error) ? (<div>Você não tem acesso a essa página.</div>) : (
            <div className="flex flex-col gap-2 mt-4">
                <Link href='/admin/aprovar-comentarios'>Aprovar comentários</Link>
                <Link href='/admin/novo-post'>Novo post</Link>
                <button onClick={handleLogout}>Sair</button>
            </div>
        )}
    </div>
  )
};

export default Admin;
