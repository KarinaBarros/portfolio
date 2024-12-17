import Nav from "@/components/nav/nav";
import '@/app/globals.css';
import '@/styles/projetos.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from "react";

export default function Projetos() {
    const [visibleEstudai, setVisibleEstudai] = useState(false);
    const [visibleCrud, setVisibleCrud] = useState(false);
    const [visibleAula, setVisibleAula] = useState(false);
    const [visibleVelha, setVisibleVelha] = useState(false);
    const [visibleArquivos, setVisibleArquivos] = useState(false);

    function showEstudai() {
        setVisibleEstudai(!visibleEstudai);
    }

    function showCrud() {
        setVisibleCrud(!visibleCrud);
    }

    function showAula() {
        setVisibleAula(!visibleAula);
    }

    function showVelha() {
        setVisibleVelha(!visibleVelha);
    }

    function showArquivos() {
        setVisibleArquivos(!visibleArquivos);
    }

    return (
        <div className="proj">
            <Nav />
            <div className="projetos">
                <h1>Principais projetos</h1>
                <div className="container-projeto">
                    <button onClick={showEstudai}><img src="/estudai.png" alt="imagem projeto estudai" />
                        <div className="container-titulo">
                            <div className="titulo">
                                <h2>Estudai</h2>
                                <p>Ferramenta de estudos com conteúdo dinâmico gerado por inteligência artificial.</p>
                            </div>
                            {visibleEstudai ? <FaChevronUp className="icone" /> : <FaChevronDown className="icone" />}
                        </div>
                    </button>

                    <div className={`container-descricao ${visibleEstudai ? 'visible' : ''}`}>
                        <p>Este projeto é uma ferramenta de estudos poderosa, desenvolvida com Next.js e Node.js, integrando a inteligência artificial generativa do Google para criar respostas e interações automatizadas inteligentes.</p>
                        <p>Utilizando tecnologias modernas tanto no front-end quanto no back-end e banco de dados neon, o projeto visa proporcionar uma experiência interativa e de alto desempenho.</p>
                        <p>O back-end emprega uma série de bibliotecas que garantem segurança, escalabilidade e performance, incluindo autenticação segura, criptografia de senhas e WebTokens, além de notificações por e-mail.</p>
                        <p>No front-end, o foco está na interação e usabilidade, com formulários dinâmicos e eficientes, uma navegação intuitiva e um design responsivo estilizado com CSS puro.</p>
                        <p>Confira o código-fonte e contribua para o projeto no GitHub:</p>
                        <p>Backend:</p>
                        <a href="https://github.com/KarinaBarros/Simulado_backend" target="_blank">https://github.com/KarinaBarros/Simulado_backend</a>
                        <p>Frontend:</p>
                        <a href="https://github.com/KarinaBarros/estudai" target="_blank">https://github.com/KarinaBarros/estudai</a>
                        <iframe width="560" height="315"
                            src="https://www.youtube.com/embed/9oPwUUp2B54?si=zzto9-0IwYzsknOD"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen></iframe>
                    </div>
                </div>

                <div className="container-projeto">
                    <button onClick={showCrud}>
                        <div className="container-titulo">
                            {visibleCrud ? <FaChevronUp className="icone" /> : <FaChevronDown className="icone" />}
                            <div className="titulo">
                                <h2>Crud</h2>
                                <p>App web de controle de estoque e vendas para depósito de bebidas.</p>
                            </div>
                        </div>
                        <img src="/crud.png" alt="imagem projeto crud depósito de bebidas" />
                    </button>
                    <div className={`container-descricao ${visibleCrud ? 'visible' : ''}`}>
                        <p>Este é um sistema CRUD desenvolvido com Node.js, com uma interface frontend utilizando HTML e CSS. O sistema integra um banco de dados PostgreSQL para armazenamento e gerenciamento de dados.</p>
                        <p>A aplicação inclui funcionalidades de autenticação de usuários, com suporte à emissão de tokens para garantir sessões seguras e controle eficiente de acessos.</p>
                        <p>Confira o código-fonte e contribua para o projeto no GitHub::</p>
                        <a href="https://github.com/KarinaBarros/crud_deposito_bebidas" target="_blank">https://github.com/KarinaBarros/crud_deposito_bebidas</a>
                        <iframe
                            src="https://www.youtube.com/embed/fPMymB79zF8?si=Yu5RlrJa8xcVCAcy"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>

                <div className="container-projeto">
                    <button onClick={showAula}>
                        <img src="/aula.png" alt="imagem do projeto aula interativa" />
                        <div className="container-titulo">
                            <div className="titulo">
                                <h2>Aula Interativa</h2>
                                <p>App web para projeto social de inclusão ao conteúdo de programação.</p>
                            </div>
                            {visibleAula ? <FaChevronUp className="icone" /> : <FaChevronDown className="icone" />}
                        </div>
                    </button>
                    <div className={`container-descricao ${visibleAula ? 'visible' : ''}`}>
                        <p>App web educacional para projeto social que visa incluir crianças matriculadas no ensino fundamental público nas noções básicas de programação. Aplicado em escola estadual com crianças com idade média de 12 anos.</p>
                        <p>Local de aplicação do projeto: EE Ergília Micelli, Araraquara SP.</p>
                        <p>Projeto usa o frame next.js para a construção de uma interface moderna e responsiva, unificando frontend e backend em uma solução integrada. Os dados são armazenados em um banco de dados PostgreSQL, gerenciado pela plataforma Neon. </p>
                        <p>Deploy na Vercel: Implementação ágil e escalável para facilitar o acesso ao aplicativo em tempo real.</p>
                        <p>O projeto oferece um ambiente interativo e educativo, promovendo a inclusão digital e incentivando o interesse por programação desde cedo, contribuindo para o desenvolvimento de habilidades valiosas para o futuro das crianças</p>
                        <p>Confira o código-fonte e contribua para o projeto no GitHub:</p>
                        <a href="https://github.com/KarinaBarros/aula-interativa" target="_blank">https://github.com/KarinaBarros/aula-interativa</a>
                        <div className="imagens">
                            <img src="/Imagem do WhatsApp de 2024-10-03 à(s) 15.55.56_4a6691bf.jpg" alt="Sala de aula" className="fotos" />
                            <img src="/Imagem do WhatsApp de 2024-10-03 à(s) 15.55.56_df6a2db2.jpg" alt="Sala de aula" className="fotos" />
                        </div>
                        <iframe width="560" height="315"
                            src="https://www.youtube.com/embed/eedxfgOmYPY?si=MqGsQyrSnUUwmef0"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>

                <div className="container-projeto">
                    <button onClick={showVelha}>
                        <div className="container-titulo">
                            {visibleVelha ? <FaChevronUp className="icone" /> : <FaChevronDown className="icone" />}
                            <div className="titulo">
                                <h2>Jogo da velha</h2>
                                <p>App mobile com salas multiplayer para 2 jogadores.</p>
                            </div>
                        </div>
                        <img src="/velha.png" alt="imagem do projeto jogo da velha" />
                    </button>
                    <div className={`container-descricao ${visibleVelha ? 'visible' : ''}`}>
                        <p>Desenvolvido utilizando Expo e Firebase Realtime Database, o aplicativo oferece uma experiência de jogabilidade em tempo real, permitindo partidas dinâmicas e interativas. O sistema gerencia salas de jogo de forma eficiente, garantindo controle total sobre a entrada e saída de jogadores.</p>
                        <p>Confira o código-fonte e contribua para o projeto no GitHub:</p>
                        <a href="https://github.com/KarinaBarros/velha_multiplayer" target="_blank">https://github.com/KarinaBarros/velha_multiplayer</a>
                        <iframe width="560" height="315"
                            src="https://www.youtube.com/embed/QgLj4Dz_6eE?si=v-kewXT-dhl1aPxZ"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>

                <div className="container-projeto">
                    <button onClick={showArquivos}>
                        <img src="/arquivos.png" alt="imagem projeto monitoramento de arquivos" />
                        <div className="container-titulo">
                            <div className="titulo">
                                <h2>Monitoramento de arquivos</h2>
                                <p>Armazenamento de logs de alterações em arquivos.</p>
                            </div>
                            {visibleArquivos ? <FaChevronUp className="icone"/> : <FaChevronDown className="icone"/>}
                        </div>
                    </button>

                    <div className={`container-descricao ${visibleArquivos ? 'visible' : ''}`}>
                        <p>Script criado para trabalho de extensão com Desenvolvimento Rápido de aplicações em Python.</p>
                        <p>App desktop que monitora todas as alterações feitas em determinada pasta de arquivos do windows.</p>
                        <p>Utiliza banco de dados postgrees para armazenar os logs obtidos pela biblioteca watchdog e tkinter para interface.</p>
                        <p>Confira o código-fonte e contribua para o projeto no GitHub:</p>
                        <a href="https://github.com/KarinaBarros/Monitoramento-de-arquivosos---" target="_blank">https://github.com/KarinaBarros/Monitoramento-de-arquivosos---</a>
                        <iframe width="560" height="315"
                            src="https://www.youtube.com/embed/qSvj8CpWJ2E?si=Ul6_nWpdYYiBuSYE"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}