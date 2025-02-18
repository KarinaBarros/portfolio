import { useRouter } from 'next/router';
import '@/styles/blog.css'
import Nav from '@/components/nav/nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from "date-fns";
import { FaSearch } from "react-icons/fa";
import LottieAnimationTopo from '@/components/lottie/topo-lottie';
import HeadBlog from '@/components/head-blog';

export async function getStaticProps() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/posts` );
        const posts = response.data;
        return {
            props: { posts }
        };
    } catch (error) {
        console.error("Erro ao gerar os posts:", error.message);
        return {
            props: { posts: [] },
            revalidate: 60,
        };
    }
}

export default function Blog({ posts }) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    function searchActive() {
        setActive(!active);
        setQuery('');
    }
    const filterItens = posts.filter(post =>
        post.titulo.toLowerCase().includes(query.toLowerCase())
    );

    const pagePost = slug => {
        router.push(`/blog/${slug}`);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const toggleVisibility = () => setIsVisible(window.scrollY > 300);
            window.addEventListener('scroll', toggleVisibility);
            return () => window.removeEventListener('scroll', toggleVisibility);
        }
    }, []);

    const handleScrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <HeadBlog/>
            <div className="blog">
                <Nav />
                <div className='container-blog'>
                    {(posts.length === 0) ? <p className='erro'>Erro ao carregar os posts</p> : (<>
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
                                                post.slug
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
                    </>)}
                </div>

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
        </>
    );
}