import '@/app/globals.css';
import '@/styles/home.css';
import Nav from '@/components/nav/nav';
import { useState, useEffect } from 'react';
import LottieAnimation from '@/components/lottie/lottie';
import Header from '@/components/home/header/Header';
import Main from '@/components/home/main/main';

export default function Home() {
    const [tema, setTema] = useState('');
    const [animacao, setAnimacao] = useState(false);

    useEffect(() => {
        const animaExibida = sessionStorage.getItem('animacaoExibida');

        if (!animaExibida) {
            // Define a animação para ser exibida após 6 segundos
            const timer = setTimeout(() => {
                setAnimacao(true); // Exibe a animação
                sessionStorage.setItem('animacaoExibida', 'true'); // Marca a animação como exibida
            }, 6000);

            // Limpa o timer ao desmontar o componente
            return () => clearTimeout(timer);
        } else {
            // Se a animação já foi exibida, definimos animacao como true imediatamente
            setAnimacao(true);
        }
    }, []);

    const temaNav = (dados) => {
        setTema(dados);
    }

    return (
        <>
        {!animacao ? (<LottieAnimation/>) : (
            <div>
            <Nav Tema={temaNav} />
            <div className='home'>
                <Header tema={tema}/>
                <Main/>
            </div>
        </div>
        )}
        
        </>
    )
}