import React, { useEffect } from 'react';
import './main.css';
import '@/app/globals.css'
import Link from 'next/link';
import { FaHtml5, FaCss3, FaJs, FaBootstrap, FaReact, FaNode, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const Main = () => {


    useEffect(() => {

        import("gsap").then(({ gsap }) => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);
                gsap.to(".image-ia", {
                    x: 0,
                    opacity: 1,
                    rotate: "0deg",
                    scrollTrigger: {
                        trigger: ".image",
                        start: "top 500px",
                        end: "bottom 650px",
                        scrub: true
                    }
                });
            });
        });

    }, []);

    useEffect(() => {

        import("gsap").then(({ gsap }) => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);
                gsap.to(".text-animation", {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: ".main-text",
                        start: "top 500px",
                        end: "bottom 650px",
                        scrub: true,
                    }
                });
            });
        });

    }, []);

    
    useEffect(() => {

        import("gsap").then(({ gsap }) => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);
                gsap.to(".image-ia2", {
                    x: 0,
                    opacity: 1,
                    rotate: "0deg",
                    scrollTrigger: {
                        trigger: ".image2",
                        start: "top 500px",
                        end: "bottom 650px",
                        scrub: true
                    }
                });
            });
        });

    }, []);

    useEffect(() => {

        import("gsap").then(({ gsap }) => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);
                gsap.to(".text-animation2", {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: ".main-text2",
                        start: "top 500px",
                        end: "bottom 650px",
                        scrub: true,
                    }
                });
            });
        });

    }, []);

    return (
        <>
            <div className="main">
                <div className="image">
                    <img className='image-ia' src='/ia.png' alt="inteligência artificial" />
                </div>
                <div className="main-text">
                    <div className="text-animation">
                        <h2 className="main-title">Seja bem vindo ao meu portifólio!</h2>
                        <p className="main-p">Criado para demonstrar todas as minhas habilidades no mundo do desenvolvimento.</p>
                        <p className="main-p">Este espaço é dedicado a quem procura um desenvolvedor autodidata, apaixonado por programação, que ama resolver problemas e está sempre em busca de conhecimento.</p>
                        <div className="main-icons">
                            <div className="icons" title='HTML 5'><FaHtml5 /></div>
                            <div className="icons" title='CSS'><FaCss3 /></div>
                            <div className="icons" title='Javascript'><FaJs /></div>
                            <div className="icons" title='Typescript'><SiTypescript /></div>
                            <div className="icons" title='Bootstrap'><FaBootstrap /></div>
                            <div className="icons" title='Tailwind'><SiTailwindcss /></div>
                            <div className="icons" title='React.js'><FaReact /></div>
                            <div className='icons' title='React Native'><TbBrandReactNative /></div>
                            <div className='icons' title='Next.js'><SiNextdotjs /></div>
                            <div className="icons" title='Node.js'><FaNode /></div>
                            <div className="icons" title='Database'><FaDatabase /></div>
                        </div>
                        <div className="main-link">
                            <Link href='/sobre' className='link'>Saiba mais sobre minhas habilidades</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="main-text2">
                    <div className="text-animation2">
                        <p className="main-p">Aqui você encontrará uma seleção dos meus projetos, desenvolvidos para aplicar e expandir meus conhecimentos em tecnologias front-end e back-end. Cada um deles reflete minha evolução como desenvolvedora fullstack, com foco em React.js, Node.js e Next.js, além de práticas que garantem código limpo e eficiente.</p>
                        <p className="main-p">Explore as soluções que já criei e acompanhe meu progresso na construção de aplicações modernas e funcionais.</p>
                        <div className="main-link">
                            <Link href='/projetos' className='link'>Saiba mais sobre meus projetos</Link>
                        </div>
                    </div>
                </div>
                <div className="image2">
                    <img className='image-ia2' src='/web-apps.webp' alt="inteligência artificial" />
                </div>
            </div>
        </>
    );
}

export default Main;


