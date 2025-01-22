import { useRouter } from 'next/router';
import '@/app/globals.css';
import '@/styles/blog.css'
import Nav from '@/components/nav/nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from "date-fns";
import { FaSearch } from "react-icons/fa";
import LottieAnimationLoading from '@/components/lottie/loading-lottie';
import LottieAnimationTopo from '@/components/lottie/topo-lottie';

export default function Blog() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

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
                <div className='card' key={postItem.titulo} onClick={() => pagePost(postItem.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9\s]/g, "").replace(/ /g, '-'))}>
                  <div className='img-card'></div>
                  <img src={`/blog/${postItem.imagem}`} alt={`logotipo de ${postItem.tema}`} />
                  <br/>
                  <p>{format(new Date(postItem.data), 'dd/MM/yyyy')}</p>
                  <h2>{postItem.titulo}</h2>
                  <pre>{postItem.conteudo.length > 200 ? postItem.conteudo.substring(0, 200) + '...' : postItem.conteudo}</pre>
                </div>
              ))
            ) : (<div>Nenhum item corresponde a pesquisa</div>)}
          </div>
        ) : (<div className='loading'><LottieAnimationLoading /></div>)}
      </div>
      <button className='topo' style={{display: isVisible ? 'block' : 'none'}} onClick={handleScrollToTop}>
        <div className='topo-lottie'>
          <LottieAnimationTopo/>
        </div>
      </button>
    </div>
  );
}