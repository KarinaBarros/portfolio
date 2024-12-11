import '../../app/globals.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import './nav_blog.css';

export default function NavBlog() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('pesquisa', inputValue);
    if (router.pathname === '/blog/pesquisa') {
      window.location.reload();
    }
    router.push('/blog/pesquisa');
  };

  return (
    <div className='nav-blog'>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Digite algo..."
        required
      />
      <button type="submit">Pesquisar</button>
    </form>
    <Link href='/blog'>blog</Link>
    <Link href='/blog/posts-sobre-html'>HTML</Link>
    <Link href='/blog/posts-sobre-css'>CSS</Link>
    <Link href='/blog/posts-sobre-javascript'>Javascript</Link>
    <Link href='/blog/posts-recentes'>Posts recentes</Link>
    </div>
  );
}
