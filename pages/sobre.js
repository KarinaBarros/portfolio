import '@/app/globals.css';
import '@/styles/sobre.css';
import { useEffect, useState } from 'react';
import Github from "@/components/github/github";
import Nav from "@/components/nav/nav";
import { FaHtml5, FaCss3, FaJs, FaBootstrap, FaReact, FaNode, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { IoLogoGithub } from "react-icons/io";
import Footer from '@/components/footer/footer';
import HeadSobre from '@/components/head-sobre';

export default function Sobre() {
    const [image, setImage] = useState('');
    const [display, setDisplay] = useState('none');

    function Curso(src) {
        setImage(src);
        setDisplay('flex');
    }

    return (
        <>
            <HeadSobre/>
            <Nav />
            <div className="sobre">
                <div className='curso' style={{ display: display }}>
                    <img src={image} />
                    <button onClick={() => setDisplay('none')}>x</button>
                </div>
                <div className='header-sobre'>
                    <div className='header-descr'>
                        <h1>Sobre mim</h1>
                        <p>Olá, meu nome é Karina Barros! Sou desenvolvedora fullstack com foco em JavaScript e tenho me dedicado a aprimorar minhas habilidades em tecnologias modernas para criar aplicações web robustas e eficientes.</p>
                        <p>No front-end, meu principal foco é React.js, explorando suas possibilidades para criar interfaces dinâmicas e interativas. No back-end, trabalho com Node.js e Next.js, construindo APIs e sistemas que garantem alta performance e escalabilidade.</p>
                        <p>Além disso, possuo experiência com bibliotecas e frameworks que complementam o ecossistema JavaScript, buscando sempre boas práticas e soluções inovadoras para oferecer experiências completas em cada projeto.</p>
                        <p>Estou constantemente em busca de novos conhecimentos e desafios, acreditando que o aprendizado contínuo é essencial para o sucesso no desenvolvimento de software. Meu objetivo é desenvolver soluções que impactem positivamente pessoas e negócios, combinando tecnologia e criatividade.</p>
                    </div>
                    <img src='/imagem-ia.webp' />
                </div>
                <div className='container-sobre'>
                    <h2>Skills</h2>
                    <div className='container-icons-sobre'>
                        <div className='descr'>
                            <div className="icon" title='HTML 5'><FaHtml5 /></div>
                            <p>HTML 5</p>
                        </div>
                        <div className='descr'>
                            <div className="icon" title='CSS'><FaCss3 /></div>
                            <p>CSS</p>
                        </div>
                        <div className='descr'>
                            <div className="icon" title='Javascript'><FaJs /></div>
                            <p>Javascript</p>
                        </div>
                        <div className='descr'>
                            <div className="icon" title='Typescript'><SiTypescript /></div>
                            <p>Typescript</p>
                        </div>
                        <div className='descr'>
                            <div className="icon" title='Bootstrap'><FaBootstrap /></div>
                            <p>Bootstrap</p>
                        </div>
                        <div className='descr'>
                            <div className="icon" title='Tailwind'><SiTailwindcss /></div>
                            <p>Tailwind</p>
                        </div>
                        <div className='descr'>
                            <div className="icon" title='React.js'><FaReact /></div>
                            <p>React.js</p>
                        </div>
                        <div className='descr'>
                            <div className='icon' title='React Native'><TbBrandReactNative /></div>
                            <p>React Native</p>
                        </div>
                        <div className='descr'>
                            <div className='icon' title='Next.js'><SiNextdotjs /></div>
                            <p>Next.js</p>
                        </div>
                        <div className='descr'>
                            <div className="icon" title='Node.js'><FaNode /></div>
                            <p>Node.js</p>
                        </div>
                        <div className='descr'>
                            <div className="icon" title='Database'><FaDatabase /></div>
                            <p>SQL</p>
                        </div>
                        <div className='descr'>
                            <div className='icon' title='Github'><IoLogoGithub /></div>
                            <p>Git</p>
                        </div>
                    </div>
                </div>
                <div className='container-sobre'>
                    <h2>Formação</h2>
                    <div className='formacao'>
                        <p>Tecnólogo em análise e desenvolvimento de sistemas</p>
                        <p>JUL 2023 - DEZ 2025</p>
                    </div>
                </div>
                <div className='container-sobre'>
                    <h2>Cursos</h2>
                    <div className='cursos'>
                        <button onClick={() => Curso('/logica.png')}><img src='/logica.png' /></button>
                        <button onClick={() => Curso('/github.png')}><img src='/github.png' /></button>
                        <button onClick={() => Curso('/front-end.png')}><img src='/front-end.png' /></button>
                        <button onClick={() => Curso('/certificado-ia.png')}><img src='/certificado-ia.png' /></button>
                        <button onClick={() => Curso('/ingles.png')}><img src='/ingles.png' /></button>
                    </div>
                </div>
                <Github />
            </div>
            <Footer/>
        </>
    )
}