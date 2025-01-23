import { useRouter } from 'next/router';
import '@/app/globals.css';
import '@/styles/blog.css'
import Nav from '@/components/nav/nav';
import { useState, useEffect } from 'react';
import { useQuery, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { format } from "date-fns";
import { FaSearch } from "react-icons/fa";
import LottieAnimationLoading from '@/components/lottie/loading-lottie';
import LottieAnimationTopo from '@/components/lottie/topo-lottie';
import { queryClient } from '@/lib/queryClient';

export const fetchPosts = async () => {
  const response = await axios.get('/api/posts');
  console.log(response.data)
  return response.data;
};

function BlogContent() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
 

  const { data: fullData = {} = [], isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60,
  });

  


  function searchActive() {
    setActive(!active);
    setQuery('');
  }
  const posts = fullData.posts || [];
  const filterItens = posts.filter(post =>
    post.titulo.toLowerCase().includes(query.toLowerCase())
  );

  const pagePost = slug => {
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
      behavior: 'smooth',
    });
  };

  return (
    <div className="blog">
      <Nav />
      {isLoading ? (
        <div className="loading">
          <LottieAnimationLoading />
        </div>
      ) : (
        <div className='container-blog'>
          {isError && <p>Erro ao carregar os posts: {error.message}</p>}
          <div className={`pesquisa ${active ? 'pesquisa-active' : ''}`}>
            <input
              type="text"
              placeholder="Pesquisar..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={`pesquisa-input ${active ? 'pesquisa-active-input' : ''}`}
            />
            <button onClick={searchActive}>
              {active ? <p className="fechar">X</p> : <FaSearch />}
            </button>
          </div>
          <div className="container-posts">
            {filterItens.length > 0 ? (
              filterItens.map(post => (
                <div
                  className="card"
                  key={post.titulo}
                  onClick={() =>
                    pagePost(
                      post.titulo
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/[^a-zA-Z0-9\s]/g, '')
                        .replace(/ /g, '-')
                    )
                  }
                >
                  <div className="img-card"></div>
                  <img src={`/blog/${post.imagem}`} alt={`logotipo de ${post.tema}`} />
                  <br />
                  <p>{format(new Date(post.data), 'dd/MM/yyyy')}</p>
                  <h2>{post.titulo}</h2>
                  <pre>
                    {post.conteudo.length > 200
                      ? post.conteudo.substring(0, 200) + '...'
                      : post.conteudo}
                  </pre>
                </div>
              ))
            ) : (
              <div>Nenhum item corresponde à pesquisa.</div>
            )}
          </div>
        </div>
      )}
      <button
        className="topo"
        style={{ display: isVisible ? 'block' : 'none' }}
        onClick={handleScrollToTop}
      >
        <div className="topo-lottie">
          <LottieAnimationTopo />
        </div>
      </button>
    </div>
  );
}


export default function Blog() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogContent />
    </QueryClientProvider>
  );
}