import { useRouter } from 'next/router';
import Link from 'next/link';
import '@/app/globals.css';

export default function NavAdmin() {
  const router = useRouter();

  const isActive = (path) => router.pathname === path ? 'bg-blue-800' : '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }
  return (
    <div className='w-64 bg-blue-500 h-screen fixed top-0 left-0 flex flex-col font-sans text-white text-lg pt-8'>
      <Link href="/admin" className={`py-2 px-8 ${isActive('/admin')}`}>
        Início
      </Link>
      <Link href="/admin/comentarios" className={`py-2 px-8 ${isActive('/admin/comentarios')}`}>
        Comentários
      </Link>
      <Link href="/admin/novo-post" className={`py-2 px-8 ${isActive('/admin/novo-post')}`}>
        Novo post
      </Link>
      <Link href="/admin/mensagens" className={`py-2 px-8 ${isActive('/admin/mensagens')}`}>
        Mensagens
      </Link>
      <button onClick={handleLogout} className='mt-auto mb-8'>Sair</button>
    </div>
  )
}