import { useRouter } from 'next/router';
import '@/app/globals.css';
import '@/styles/blog.css'
import Nav from '@/components/nav/nav';
import NavBlog from '@/components/nav_blog/nav_blog.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from "date-fns";

export default function Blog() {
  const router = useRouter();
  const [post, setPost] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPost(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  const pagePost = (slug) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div className='blog'>
      <Nav />
      <NavBlog />
      <h2>Blog </h2>
      <div className='container-blog'>
        {error && <p>Erro: {error}</p>}
        {post.length > 0 && (
          post.map((postItem) => (
            <div className='card' key={postItem.titulo} onClick={() => pagePost(postItem.titulo.toLowerCase().replace(/ /g, '-'))}>
              <img src={postItem.imagem} alt= {`logotipo de ${postItem.tema}`}/>
              <p>{format(new Date(postItem.data), 'dd/MM/yyyy')}, {postItem.tema}</p>
              <p>{postItem.titulo}</p>
              <p>{postItem.conteudo.length > 200 ? postItem.conteudo.substring(0, 200) + '...' : postItem.conteudo}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}