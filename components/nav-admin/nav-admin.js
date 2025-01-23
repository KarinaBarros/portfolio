import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '@/app/globals.css';

export default function NavAdmin(){
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
            router.push('/login');
          }
        };
    
        fetchData();
      }, []);
    
      const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
      }
    return(
        <div className='w-64 bg-blue-500 h-screen fixed top-0 left-0 flex flex-col p-4 gap-4 font-sans text-white text-lg'>
            <Link href='/admin/aprovar-comentarios'>Aprovar comentários</Link>
            <Link href='/admin/novo-post'>Novo post</Link>
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}