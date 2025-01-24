import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '@/app/globals.css';

export default function NavAdmin() {
  const router = useRouter();

  const isActive = (path) => router.pathname === path ? 'bg-blue-800' : '';

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
  return (
    <div className='w-64 bg-blue-500 h-screen fixed top-0 left-0 flex flex-col font-sans text-white text-lg pt-4'>
      <Link href="/admin" className={`p-2 ${isActive('/admin')}`}>
        Início
      </Link>
      <Link href="/admin/comentarios" className={`p-2 ${isActive('/admin/comentarios')}`}>
        Comentários
      </Link>
      <Link href="/admin/novo-post" className={`p-2 ${isActive('/admin/novo-post')}`}>
        Novo post
      </Link>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}