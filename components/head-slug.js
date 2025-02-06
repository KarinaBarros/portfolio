import Head from "next/head";

export default function HeadSlug({title, description, keywords, slug, imagem, data}){
    return(
        <Head>
        {/* Meta Tags Padrão */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Karina Barros" />
        <meta name="keywords" content={keywords} />

        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/blog/${slug}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={data} />
        <meta property="article:author" content={`${process.env.NEXT_PUBLIC_URL}/sobre`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/blog/${slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_URL}/blog${imagem}`} />
        <meta property="og:image:alt" content="imagem sobre desenvolvimento web" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Blog Karina Barros" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${process.env.NEXT_PUBLIC_URL}/blog/${slug}`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_URL}/blog${imagem}`} />
    </Head>
    )
}