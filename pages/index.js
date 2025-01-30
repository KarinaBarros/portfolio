'use client';
import '@/app/globals.css';
import '@/styles/home.css';
import Nav from '@/components/nav/nav';
import { useState, useEffect } from 'react';
import LottieAnimation from '@/components/lottie/lottie';
import Header from '@/components/home/header/Header';
import Main from '@/components/home/main/main';
import Footer from '@/components/footer/footer';

export default function Home() {
    const [tema, setTema] = useState('');
    const [animacao, setAnimacao] = useState(false);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const animacaoExibida = sessionStorage.getItem('animacaoExibida');
        if (!animacaoExibida) {
            setCarregando(true);
            // Define a animação para ser exibida após 6 segundos
            const timer = setTimeout(() => {
                setAnimacao(true); // Exibe a animação
                sessionStorage.setItem('animacaoExibida', 'true'); // Marca a animação como exibida
            }, 6000);   

            // Limpa o timer ao desmontar o componente
            return () => clearTimeout(timer);
        } else {
            setCarregando(true);
            // Se a animação já foi exibida, definimos animacao como true imediatamente
            setAnimacao(true);
        }
    }, []);

    const temaNav = (dados) => {
        setTema(dados);
    }

    return (
        <>
        {carregando && (<div>
            {!animacao ? (<LottieAnimation />) : (
                <div>
                    <Nav Tema={temaNav} />
                    <div className='home'>
                        <Header tema={tema} />
                        <Main />
                        <Footer />
                    </div>
                </div>
            )}
        </div>)}
        </>
    )
}