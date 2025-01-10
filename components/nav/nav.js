import '@/app/globals.css';
import './nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Nav({ Tema }) {
    const [tema, setTema] = useState('dark');
    const [click] = useState(typeof Audio !== 'undefined' && new Audio('/click.mp3'));
    const [ expand, setExpand ] = useState(false);


    useEffect(() => {
        const temaStorage = localStorage.getItem('tema');
        console.log('Tema armazenado:', temaStorage);
        if (temaStorage) {
            setTema(temaStorage);
            if (Tema) Tema(temaStorage);
        } else {
            setTema('dark');
            if (Tema) Tema('dark');
        }
       
    }, [])

    useEffect(() => {
        if (tema === 'dark') {
            document.documentElement.style.setProperty('--color-background', '#010101');
            document.documentElement.style.setProperty('--color-text', '#fff');
            document.documentElement.style.setProperty('--color-shadow', 'rgba(64, 64, 64, 0.5)');
        }
        if (tema === 'light') {
            document.documentElement.style.setProperty('--color-background', '#fff');
            document.documentElement.style.setProperty('--color-text', '#010101');
            document.documentElement.style.setProperty('--color-shadow', 'rgba(0, 0, 0, 0.5)');
        }
        console.log('Tema atualizado:', tema);
    }, [tema])

    function TrocarTema() {
        click.play();
        if (tema === 'dark') {
            setTema('light');
            localStorage.setItem('tema', 'light');
            if (Tema) Tema('light');
            
        }
        if (tema === 'light') {
            setTema('dark');
            localStorage.setItem('tema', 'dark');
            if (Tema) Tema('dark');
            
        }
    }

    function Menu() {
        setExpand(!expand);
    }

    function closeMenu() {
        
        setExpand(false);
        
    }

    useEffect(() => {
        document.body.addEventListener('click', closeMenu);

        return () => {
            document.body.removeEventListener('click', closeMenu);
        };
    }, []);

    function Expand(event) {
        event.stopPropagation(); // Impede que o clique no botão feche o menu
        Menu();
    }


    return (
        <nav className='nav'>
            <h2>Portfólio Karina Barros</h2>
            <div className='links-nav' style={{display: expand ? 'flex' : 'none'}}>
                <Link href='/' className='link-nav'>Home</Link>
                <Link href='/sobre' className='link-nav'>Sobre</Link>
                <Link href='/projetos' className='link-nav'>Projetos</Link>
                <Link href='/contatos' className='link-nav'>Contatos</Link>
                <Link href='/blog' className='link-nav'>Blog</Link>
                <button onClick={TrocarTema}><FontAwesomeIcon icon={faLightbulb} className='icon-nav' /></button>
            </div>
            <button onClick={Expand} className='menu' style={{backgroundColor: expand ? 'var(--color-nav2)' : 'var(--color-nav1)'}}><FontAwesomeIcon icon={faBars} className='icon-menu' /></button>
        </nav>
    )
}