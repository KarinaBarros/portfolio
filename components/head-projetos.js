import Head from "next/head";

export default function HeadProjetos(){
    return(
        <Head>
        {/* Meta Tags Padrão */}
        <title>Projetos de Karina Barros</title>
        <meta name="description" content='Portfólio de Karina Barros, desenvolvedora full stack especializada em criar soluções web modernas e eficientes. Confira meus projetos e habilidades!' />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Karina Barros" />
        <meta name="keywords" content="desenvolvedora full stack, portfólio, Karina Barros, desenvolvimento web, projetos, programação, frontend, backend, portfolio desenvolvedor, desenvolvedor, programador, dev, portfolio dev, projetos karina barros" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/projetos`} />
        <meta property="og:title" content='Projetos de Karina Barros' />
        <meta property="og:description" content='Portfólio de Karina Barros, desenvolvedora full stack especializada em criar soluções web modernas e eficientes. Confira meus projetos e habilidades!' />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_URL}/avatar.png`} />
        <meta property="og:image:alt" content="imagem do avatar de karina" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Portfólio Karina Barros" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${process.env.NEXT_PUBLIC_URL}/projetos`} />
        <meta name="twitter:title" content='Projetos de Karina Barros' />
        <meta name="twitter:description" content='Portfólio de Karina Barros, desenvolvedora full stack especializada em criar soluções web modernas e eficientes. Confira meus projetos e habilidades!' />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_URL}/avatar.png`} />
    </Head>
    )
}