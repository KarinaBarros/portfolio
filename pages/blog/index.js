import { useRouter } from 'next/router';
import '@/app/globals.css';
import '@/styles/blog.css'
import Nav from '@/components/nav/nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from "date-fns";
import { FaSearch } from "react-icons/fa";
import LottieAnimationLoading from '@/components/lottie/loading-lottie';

export default function Blog() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);

  function searchActive() {
    setActive(!active);
    setQuery('');
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setLoading(true);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  const filterItens = posts.filter(post => post.titulo.toLowerCase().includes(query.toLowerCase()));

  const pagePost = (slug) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div className='blog'>
      <Nav />
      {loading &&
        <div className={`pesquisa ${active ? 'pesquisa-active' : ''}`}>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`pesquisa-input ${active ? 'pesquisa-active-input' : ''}`}
          />
          <button onClick={searchActive}>{active ? <p className='fechar'>X</p> : <FaSearch />}</button>
        </div>}
      <div className='container-blog'>
        {loading ? (
          <div className='container-posts'>
            {error && <p>Erro: {error}</p>}
            {filterItens.length > 0 ? (
              filterItens.map((postItem) => (
                <div className='card' key={postItem.titulo} onClick={() => pagePost(postItem.titulo.toLowerCase().replace(/ /g, '-'))}>
                  <img src={`/blog/${postItem.imagem}`} alt={`logotipo de ${postItem.tema}`} />
                  <p>{format(new Date(postItem.data), 'dd/MM/yyyy')}, {postItem.tema}</p>
                  <p>{postItem.titulo}</p>
                  <p>{postItem.conteudo.length > 200 ? postItem.conteudo.substring(0, 200) + '...' : postItem.conteudo}</p>
                </div>
              ))
            ) : (<div>Nenhum item corresponde a pesquisa</div>)}
          </div>
        ) : (<div className='loading'><LottieAnimationLoading /></div>)}
      </div>
    </div>
  );
}