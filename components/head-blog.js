import Head from "next/head";

export default function HeadBlog(){
    return(
        <Head>
        {/* Meta Tags Padrão */}
        <title>Blog Karina Barros</title>
        <meta name="description" content='Aprenda sobre programação, desenvolvimento web, HTML, CSS, JavaScript e muito mais. Tutoriais, dicas para iniciantes e profissionais.' />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Karina Barros" />
        <meta name="keywords" content='Aprenda sobre programação, desenvolvimento web, HTML, CSS, JavaScript e muito mais. Tutoriais, dicas para iniciantes e profissionais.' />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/blog`} />
        <meta property="og:title" content='Blog Karina Barros' />
        <meta property="og:description" content='Aprenda sobre programação, desenvolvimento web, HTML, CSS, JavaScript e muito mais. Tutoriais, dicas para iniciantes e profissionais.'/>
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_URL}/avatar.png`} />
        <meta property="og:image:alt" content="imagem do avatar de karina" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Blog Karina Barros" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${process.env.NEXT_PUBLIC_URL}/blog`} />
        <meta name="twitter:title" content='Blog Karina Barros' />
        <meta name="twitter:description" content='Aprenda sobre programação, desenvolvimento web, HTML, CSS, JavaScript e muito mais. Tutoriais, dicas para iniciantes e profissionais.' />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_URL}/avatar.png`} />
    </Head>
    
    )
}